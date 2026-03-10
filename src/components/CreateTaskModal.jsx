import { useState, useEffect, useRef } from 'react'
import { 
  X, 
  Save, 
  Upload, 
  Image, 
  Video,
  Trash2, 
  Loader2, 
  Bug, 
  Lightbulb, 
  FileText,
  AlertTriangle,
  User,
  Flag
} from 'lucide-react'
import { uploadScreenshot } from '../firebase'
import UploadLoading from './UploadLoading'
import MediaViewer from './MediaViewer'

const TASK_TYPES = [
  { value: 'bug', label: 'Bug', icon: Bug, color: 'red', description: 'Erro encontrado durante os testes' },
  { value: 'improvement', label: 'Melhoria', icon: Lightbulb, color: 'cyan', description: 'Sugestão de melhoria' },
  { value: 'business_rule', label: 'Regra de Negócio', icon: FileText, color: 'purple', description: 'Ajuste em regra de negócio' },
]

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Baixa', color: 'blue' },
  { value: 'medium', label: 'Média', color: 'yellow' },
  { value: 'high', label: 'Alta', color: 'orange' },
  { value: 'critical', label: 'Crítica', color: 'red' },
]

export default function CreateTaskModal({ 
  isOpen, 
  onClose, 
  onSave, 
  users = [],
  currentUser,
  workspace,
  relatedRequirement = null,
  editingTask = null
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'bug',
    priority: 'medium',
    assignee: '',
    steps: '',
    expectedResult: '',
    actualResult: '',
  })
  const [media, setMedia] = useState([])
  const [attachments, setAttachments] = useState([])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [viewingMedia, setViewingMedia] = useState(null)
  const fileInputRef = useRef(null)

  // Carregar dados da tarefa ao editar
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        type: editingTask.type || 'bug',
        priority: editingTask.priority || 'medium',
        assignee: editingTask.assignee || '',
        steps: editingTask.steps || '',
        expectedResult: editingTask.expectedResult || '',
        actualResult: editingTask.actualResult || '',
      })
      setMedia(editingTask.screenshots || [])
      // Buscar attachments no campo direto ou em sourceData.evidences (fallback para tarefas antigas)
      setAttachments(editingTask.attachments || editingTask.sourceData?.evidences || [])
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'bug',
        priority: 'medium',
        assignee: '',
        steps: '',
        expectedResult: '',
        actualResult: '',
      })
      setMedia([])
      setAttachments([])
    }
  }, [editingTask])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const tempId = `task_${Date.now()}`
      const uploadedFiles = []

      for (const file of Array.from(files)) {
        const isVideoFile = file.type.startsWith('video/')
        const uploaded = await uploadScreenshot(file, tempId)
        uploadedFiles.push({
          url: uploaded.url,
          name: file.name,
          type: isVideoFile ? 'video' : 'image',
          uploadedAt: new Date().toISOString()
        })
      }
      setMedia(prev => [...prev, ...uploadedFiles])
    } catch (error) {
      console.error('Erro no upload:', error)
      alert('Erro ao fazer upload do arquivo. Tente novamente.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const removeMedia = (index) => {
    setMedia(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('Por favor, informe o título da tarefa.')
      return
    }

    setSaving(true)
    try {
      const taskData = {
        ...formData,
        screenshots: media,
        attachments: attachments,
      }

      // Se estiver editando, apenas atualizar os campos modificáveis
      if (editingTask) {
        await onSave(editingTask.id, taskData)
      } else {
        // Se for nova tarefa, incluir campos de criação
        const creatorRole = currentUser?.role?.toLowerCase()
        taskData.workspace = creatorRole === 'operacao' ? 'qa'
          : creatorRole === 'qa' ? 'devs'
          : workspace?.id || 'general'
        taskData.relatedRequirementId = relatedRequirement?.firebaseId || null
        taskData.relatedRequirementCode = relatedRequirement?.id || null
        taskData.createdBy = currentUser?.name || currentUser?.email || 'Anônimo'
        taskData.createdByUid = currentUser?.uid || currentUser?.id
        taskData.createdAt = new Date().toISOString()
        taskData.status = 'pending'
        taskData.comments = []
        await onSave(taskData)
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        type: 'bug',
        priority: 'medium',
        assignee: '',
        steps: '',
        expectedResult: '',
        actualResult: '',
      })
      setMedia([])
      setAttachments([])
      onClose()
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error)
      alert('Erro ao salvar tarefa. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const selectedType = TASK_TYPES.find(t => t.value === formData.type)
  const TypeIcon = selectedType?.icon || Bug

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-${selectedType?.color || 'gray'}-100 dark:bg-${selectedType?.color || 'gray'}-900/30`}>
              <TypeIcon className={`w-6 h-6 text-${selectedType?.color || 'gray'}-600`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {workspace?.name || 'Espaço de Trabalho'}
                {relatedRequirement && ` • Requisito ${relatedRequirement.id}`}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Tipo de Tarefa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tipo de Tarefa *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {TASK_TYPES.map(type => {
                const Icon = type.icon
                const isSelected = formData.type === type.value
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected 
                        ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20` 
                        : 'border-gray-200 dark:border-slate-600 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${isSelected ? `text-${type.color}-600` : 'text-gray-400'}`} />
                    <p className={`font-medium ${isSelected ? `text-${type.color}-700 dark:text-${type.color}-400` : 'text-gray-700 dark:text-gray-300'}`}>
                      {type.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{type.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Descreva brevemente o problema ou melhoria"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Prioridade e Responsável */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Flag className="w-4 h-4 inline mr-1" />
                Prioridade
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {PRIORITY_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Responsável
              </label>
              <select
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione...</option>
                {users.map(user => (
                  <option key={user.id || user.uid} value={user.id || user.uid}>
                    {user.name || user.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descrição Detalhada
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva o problema ou melhoria em detalhes..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Passos para Reproduzir (para todos os tipos de tarefa) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Passos para Reproduzir {formData.type === 'bug' ? 'o Erro' : 'o Cenário'}
            </label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              placeholder={formData.type === 'bug' 
                ? "1. Acesse a tela X\n2. Clique no botão Y\n3. Observe o erro Z"
                : "1. Acesse a tela X\n2. Execute a ação Y\n3. Observe o comportamento Z"
              }
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formData.type === 'bug' ? 'Resultado Esperado' : 'Comportamento Esperado'}
              </label>
              <textarea
                name="expectedResult"
                value={formData.expectedResult}
                onChange={handleChange}
                placeholder="O que deveria acontecer..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formData.type === 'bug' ? 'Resultado Atual' : 'Comportamento Atual'}
              </label>
              <textarea
                name="actualResult"
                value={formData.actualResult}
                onChange={handleChange}
                placeholder="O que está acontecendo..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Evidências de Falha do Teste (somente leitura editável) */}
          {attachments.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-2">
                ❌ Evidências da Falha no Teste ({attachments.length})
              </label>
              <p className="text-xs text-red-600 dark:text-red-400 mb-3">
                Evidências capturadas durante a execução do teste que falhou
              </p>
              <div className="flex flex-wrap gap-3">
                {attachments.map((att, index) => (
                  <div key={index} className="relative group">
                    <button
                      type="button"
                      onClick={() => setViewingMedia({ media: attachments, index })}
                      className="block focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
                      title={att.stepAction ? `Passo ${att.stepIndex + 1}: ${att.stepAction}` : 'Clique para visualizar'}
                    >
                      {att.type === 'video' || att.url?.includes('.mp4') || att.url?.includes('.webm') ? (
                        <div className="relative w-24 h-24">
                          <video src={att.url} className="w-24 h-24 object-cover rounded-lg border-2 border-red-300 dark:border-red-700" />
                          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center hover:bg-black/50 transition-colors">
                            <Video className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={att.url} 
                          alt={att.name || `Evidência ${index + 1}`} 
                          className="w-24 h-24 object-cover rounded-lg border-2 border-red-300 dark:border-red-700 hover:opacity-90 transition-opacity" 
                        />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      title="Remover evidência"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {att.stepAction && (
                      <div className="absolute -bottom-6 left-0 right-0 text-xs text-red-600 dark:text-red-400 truncate text-center" title={att.stepAction}>
                        Passo {att.stepIndex + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload de Evidências */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Evidências Adicionais (Prints/Vídeos)
            </label>
            
            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-slate-600 hover:border-gray-400'
              }`}
            >
              {uploading ? (
                <UploadLoading message="Enviando evidência" />
              ) : (
                <>
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Arraste arquivos aqui ou{' '}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:underline"
                    >
                      clique para selecionar
                    </button>
                  </p>
                  <p className="text-xs text-gray-500">Imagens e vídeos (PNG, JPG, MP4, WebM)</p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>

            {/* Preview de Mídia */}
            {media.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {media.map((item, index) => (
                  <div key={index} className="relative group">
                    <button
                      type="button"
                      onClick={() => setViewingMedia({ media, index })}
                      className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      title="Clique para visualizar"
                    >
                      {item.type === 'video' ? (
                        <div className="relative w-24 h-24">
                          <video src={item.url} className="w-24 h-24 object-cover rounded-lg border" />
                          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center hover:bg-black/50 transition-colors">
                            <Video className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={item.url} 
                          alt="" 
                          className="w-24 h-24 object-cover rounded-lg border hover:opacity-90 transition-opacity" 
                        />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-3 shrink-0 bg-gray-50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !formData.title.trim()}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {editingTask ? 'Salvar Alterações' : 'Criar Tarefa'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Media Viewer */}
      {viewingMedia && (
        <MediaViewer
          media={viewingMedia.media}
          initialIndex={viewingMedia.index}
          onClose={() => setViewingMedia(null)}
        />
      )}
    </div>
  )
}
