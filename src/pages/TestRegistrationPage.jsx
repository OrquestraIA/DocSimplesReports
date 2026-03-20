import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, Plus, Trash2, AlertCircle, CheckCircle, Upload, Image, X, Loader2, ExternalLink, Sparkles } from 'lucide-react'
import { uploadScreenshot } from '../firebase'
import { createJiraIssue } from '../jiraService'
import AIService from '../services/aiService' // Voltando para IA real

export default function TestRegistrationPage({ onSave }) {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [jiraIssue, setJiraIssue] = useState(null)
  const [savingToJira, setSavingToJira] = useState(false)
  const [jiraError, setJiraError] = useState(null)
  const [screenshots, setScreenshots] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  
  // Estados para IA
  const [showAIModal, setShowAIModal] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiTestDescription, setAiTestDescription] = useState('')
  const [aiTestType, setAiTestType] = useState('funcional')
  const [aiTestPriority, setAiTestPriority] = useState('media')
  
  const [formData, setFormData] = useState({
    title: '',
    requirement: '',
    requirementDescription: '',
    feature: '',
    module: '',
    testType: 'funcional',
    priority: 'media',
    status: 'pendente',
    tester: '',
    environment: '',
    documentTipo: 'requisito', // 'requisito' | 'jornada'
    category: '', // 'regra_negocio', 'bug', 'melhoria'
    errorType: '',
    improvement: '',
    improvementJustification: '',
    preconditions: '',
    steps: [{ action: '', expectedResult: '', actualResult: '', status: 'pendente' }],
    observations: '',
    evidences: '',
    elements: [{ name: '', selector: '', type: 'button' }],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Quando a categoria for 'melhoria', atualizar o status automaticamente para 'melhoria'
    if (name === 'category' && value === 'melhoria') {
      setFormData({ ...formData, [name]: value, status: 'melhoria' })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleStepChange = (index, field, value) => {
    const newSteps = [...formData.steps]
    newSteps[index][field] = value
    setFormData({ ...formData, steps: newSteps })
  }

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { action: '', expectedResult: '', actualResult: '', status: 'pendente' }]
    })
  }

  const removeStep = (index) => {
    if (formData.steps.length > 1) {
      const newSteps = formData.steps.filter((_, i) => i !== index)
      setFormData({ ...formData, steps: newSteps })
    }
  }

  const handleElementChange = (index, field, value) => {
    const newElements = [...formData.elements]
    newElements[index][field] = value
    setFormData({ ...formData, elements: newElements })
  }

  const addElement = () => {
    setFormData({
      ...formData,
      elements: [...formData.elements, { name: '', selector: '', type: 'button' }]
    })
  }

  const removeElement = (index) => {
    if (formData.elements.length > 1) {
      const newElements = formData.elements.filter((_, i) => i !== index)
      setFormData({ ...formData, elements: newElements })
    }
  }

  // Função para gerar documento de teste com IA
  const handleAIGenerateTestDocument = async () => {
    if (!aiTestDescription.trim()) {
      alert('Por favor, descreva o teste que deseja gerar.')
      return
    }

    setAiGenerating(true)

    try {
      // Gerar detalhes do documento com IA
      const aiResponse = await AIService.generateTestDocument({
        description: aiTestDescription,
        testType: aiTestType,
        priority: aiTestPriority
      })

      // Preencher formulário com dados da IA
      setFormData({
        title: aiResponse.title,
        requirement: aiResponse.requirement,
        requirementDescription: aiResponse.requirementDescription,
        feature: aiResponse.feature,
        module: aiResponse.module,
        testType: aiTestType,
        priority: aiTestPriority,
        status: 'pendente',
        tester: '',
        environment: aiResponse.environment,
        category: aiResponse.category,
        errorType: aiResponse.errorType || '',
        improvement: aiResponse.improvement || '',
        improvementJustification: aiResponse.improvementJustification || '',
        preconditions: aiResponse.preconditions,
        steps: aiResponse.steps,
        observations: aiResponse.observations,
        evidences: aiResponse.evidences,
        elements: aiResponse.elements
      })

      setShowAIModal(false)
      setAiTestDescription('')
      setAiTestType('funcional')
      setAiTestPriority('media')
      
      alert('Documento de teste gerado com sucesso pela IA! Revise os dados antes de salvar.')
    } catch (error) {
      console.error('Erro ao gerar documento com IA:', error)
      alert('Erro ao gerar documento com IA. Tente novamente.')
    } finally {
      setAiGenerating(false)
    }
  }

  // Helper para detectar se é vídeo (por mediaType ou extensão do arquivo)
  const isVideo = (media) => {
    if (media.mediaType === 'video') return true
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']
    const name = (media.name || media.url || '').toLowerCase()
    return videoExtensions.some(ext => name.includes(ext))
  }

  // Função para processar arquivos de mídia (imagens e vídeos)
  const processMediaFiles = async (files) => {
    const mediaFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    )
    if (mediaFiles.length === 0) return
    
    setUploading(true)
    setUploadError(null)
    
    try {
      const tempId = Date.now().toString()
      const uploadPromises = mediaFiles.map(file => uploadScreenshot(file, tempId))
      const uploadedFiles = await Promise.all(uploadPromises)
      
      // Adicionar tipo de mídia ao arquivo
      const filesWithType = uploadedFiles.map((file, idx) => ({
        ...file,
        mediaType: mediaFiles[idx].type.startsWith('video/') ? 'video' : 'image'
      }))
      
      setScreenshots(prev => [...prev, ...filesWithType])
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      setUploadError('Erro ao fazer upload. Verifique se o Firebase Storage está configurado.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    await processMediaFiles(files)
  }

  // Handlers para drag-and-drop
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    await processMediaFiles(e.dataTransfer.files)
  }

  // Handler para paste (Ctrl+V)
  const handlePaste = async (e) => {
    const items = e.clipboardData?.items
    if (!items) return
    
    const mediaFiles = []
    for (const item of items) {
      if (item.type.startsWith('image/') || item.type.startsWith('video/')) {
        const file = item.getAsFile()
        if (file) mediaFiles.push(file)
      }
    }
    
    if (mediaFiles.length > 0) {
      e.preventDefault()
      await processMediaFiles(mediaFiles)
    }
  }

  const removeScreenshot = (index) => {
    setScreenshots(screenshots.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSavingToJira(true)
    setJiraError(null)
    
    const dataWithScreenshots = {
      ...formData,
      screenshots: screenshots
    }
    
    try {
      // Criar issue no Jira
      const jiraResult = await createJiraIssue(dataWithScreenshots)
      setJiraIssue(jiraResult)
      
      // Salvar no Firebase com referência do Jira
      const dataWithJira = {
        ...dataWithScreenshots,
        jiraKey: jiraResult.key,
        jiraUrl: jiraResult.url
      }
      await onSave(dataWithJira)
      
      setShowSuccess(true)
      setTimeout(() => {
        navigate('/documentos')
      }, 2500)
    } catch (error) {
      console.error('Erro ao criar issue no Jira:', error)
      setJiraError(error.message)
      
      // Salvar no Firebase mesmo sem Jira
      await onSave(dataWithScreenshots)
      setShowSuccess(true)
      setTimeout(() => {
        navigate('/documentos')
      }, 2500)
    } finally {
      setSavingToJira(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Teste Registrado!</h2>
        {jiraIssue && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-medium flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Issue criada no Jira: 
              <a 
                href={jiraIssue.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {jiraIssue.key}
              </a>
            </p>
          </div>
        )}
        {jiraError && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800 text-sm">⚠️ Teste salvo, mas não foi possível criar issue no Jira</p>
          </div>
        )}
        <p className="text-gray-600 mt-2">Redirecionando para documentos...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Registrar Teste de Homologação</h1>
            <p className="text-gray-600 mt-1">Preencha os dados do teste realizado</p>
          </div>
          <button
            type="button"
            onClick={() => setShowAIModal(true)}
            className="btn-secondary flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white"
            disabled={aiGenerating}
          >
            {aiGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gerando...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Gerar com IA</span>
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título do Teste *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: Validar login com credenciais válidas"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requisito
              </label>
              <input
                type="text"
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: REQ-001"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição do Requisito
              </label>
              <textarea
                name="requirementDescription"
                value={formData.requirementDescription}
                onChange={handleChange}
                className="textarea-field"
                rows="2"
                placeholder="Descreva o requisito em detalhes..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feature/Funcionalidade *
              </label>
              <input
                type="text"
                name="feature"
                value={formData.feature}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: Autenticação"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Módulo
              </label>
              <input
                type="text"
                name="module"
                value={formData.module}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: Usuários"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Testador *
              </label>
              <input
                type="text"
                name="tester"
                value={formData.tester}
                onChange={handleChange}
                className="input-field"
                placeholder="Nome do testador"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Documento
              </label>
              <select
                name="documentTipo"
                value={formData.documentTipo}
                onChange={handleChange}
                className="input-field"
              >
                <option value="requisito">Teste de Requisito</option>
                <option value="jornada">Teste de Jornada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Teste
              </label>
              <select
                name="testType"
                value={formData.testType}
                onChange={handleChange}
                className="input-field"
              >
                <option value="funcional">Funcional</option>
                <option value="exploratorio">Exploratório</option>
                <option value="regressao">Regressão</option>
                <option value="integracao">Integração</option>
                <option value="usabilidade">Usabilidade</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="input-field"
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field"
              >
                <option value="pendente">Pendente</option>
                <option value="aprovado">Aprovado</option>
                <option value="reprovado">Reprovado</option>
                <option value="bloqueado">Bloqueado</option>
                <option value="melhoria">Melhoria</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ambiente
              </label>
              <input
                type="text"
                name="environment"
                value={formData.environment}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: Homologação, Staging"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Selecione a categoria...</option>
                <option value="regra_negocio">Regra de Negócio</option>
                <option value="bug">Bug</option>
                <option value="melhoria">Melhoria</option>
              </select>
            </div>
          </div>
        </div>

        {/* Detalhes adicionais baseado na categoria */}
        {formData.category === 'melhoria' && (
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalhes da Melhoria</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição da Melhoria *</label>
                <input
                  type="text"
                  name="improvement"
                  value={formData.improvement}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Descreva a melhoria sugerida..."
                  required={formData.category === 'melhoria'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Justificativa da Melhoria</label>
                <textarea
                  name="improvementJustification"
                  value={formData.improvementJustification}
                  onChange={handleChange}
                  className="textarea-field"
                  rows="3"
                  placeholder="Justifique por que essa melhoria é importante..."
                />
              </div>
            </div>
          </div>
        )}

        {formData.category === 'bug' && (
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalhes do Bug</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Erro</label>
              <select
                name="errorType"
                value={formData.errorType}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Selecione...</option>
                <option value="erro_500">Erro 500 (Servidor)</option>
                <option value="erro_400">Erro 400 (Requisição)</option>
                <option value="erro_404">Erro 404 (Não encontrado)</option>
                <option value="erro_interface">Erro de Interface</option>
                <option value="erro_funcional">Erro Funcional</option>
                <option value="erro_performance">Erro de Performance</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>
        )}

        {/* Pré-condições */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pré-condições</h2>
          <textarea
            name="preconditions"
            value={formData.preconditions}
            onChange={handleChange}
            className="textarea-field"
            rows="3"
            placeholder="Descreva as pré-condições necessárias para executar o teste..."
          />
        </div>

        {/* Passos do Teste */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Passos do Teste</h2>
            <button
              type="button"
              onClick={addStep}
              className="btn-secondary flex items-center space-x-1 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Passo</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.steps.map((step, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Passo {index + 1}</span>
                  {formData.steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Ação</label>
                    <input
                      type="text"
                      value={step.action}
                      onChange={(e) => handleStepChange(index, 'action', e.target.value)}
                      className="input-field"
                      placeholder="Descreva a ação executada"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Resultado Esperado</label>
                    <input
                      type="text"
                      value={step.expectedResult}
                      onChange={(e) => handleStepChange(index, 'expectedResult', e.target.value)}
                      className="input-field"
                      placeholder="O que deveria acontecer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Resultado Obtido</label>
                    <input
                      type="text"
                      value={step.actualResult}
                      onChange={(e) => handleStepChange(index, 'actualResult', e.target.value)}
                      className="input-field"
                      placeholder="O que realmente aconteceu"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Status do Passo</label>
                    <select
                      value={step.status}
                      onChange={(e) => handleStepChange(index, 'status', e.target.value)}
                      className="input-field"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="passou">Passou</option>
                      <option value="falhou">Falhou</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elementos da UI (para Playwright) */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Elementos da Interface</h2>
              <p className="text-sm text-gray-500">Registre os elementos interagidos para geração de selectors Playwright</p>
            </div>
            <button
              type="button"
              onClick={addElement}
              className="btn-secondary flex items-center space-x-1 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Elemento</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.elements.map((element, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={element.name}
                  onChange={(e) => handleElementChange(index, 'name', e.target.value)}
                  className="input-field flex-1"
                  placeholder="Nome do elemento (ex: Botão Login)"
                />
                <input
                  type="text"
                  value={element.selector}
                  onChange={(e) => handleElementChange(index, 'selector', e.target.value)}
                  className="input-field flex-1 font-mono text-sm"
                  placeholder="Selector (ex: #btn-login, .submit-btn)"
                />
                <select
                  value={element.type}
                  onChange={(e) => handleElementChange(index, 'type', e.target.value)}
                  className="input-field w-32"
                >
                  <option value="button">Botão</option>
                  <option value="input">Input</option>
                  <option value="link">Link</option>
                  <option value="select">Select</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="radio">Radio</option>
                  <option value="text">Texto</option>
                  <option value="other">Outro</option>
                </select>
                {formData.elements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeElement(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Screenshots/Prints/Vídeos */}
        <div className="card" onPaste={handlePaste}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Evidências (Imagens e Vídeos)</h2>
              <p className="text-sm text-gray-500">Adicione prints, screenshots ou vídeos de evidências do teste</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Upload Area com Drag-and-Drop */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                isDragging 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-300 hover:border-primary-500'
              }`}
            >
              <input
                type="file"
                id="screenshot-upload"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />
              <label 
                htmlFor="screenshot-upload" 
                className="cursor-pointer flex flex-col items-center"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-2" />
                    <span className="text-sm text-gray-600">Fazendo upload...</span>
                  </>
                ) : (
                  <>
                    <Upload className={`w-10 h-10 mb-2 ${isDragging ? 'text-primary-500' : 'text-gray-400'}`} />
                    <span className="text-sm font-medium text-gray-700">
                      Clique para selecionar ou arraste arquivos aqui
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Imagens e vídeos • Ctrl+V para colar da área de transferência
                    </span>
                  </>
                )}
              </label>
            </div>
            
            {uploadError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{uploadError}</p>
              </div>
            )}
            
            {/* Preview das mídias */}
            {screenshots.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {screenshots.map((media, index) => (
                  <div key={index} className="relative group">
                    {isVideo(media) ? (
                      <a href={media.url} target="_blank" rel="noopener noreferrer" className="block">
                        <video 
                          src={media.url}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-primary-500"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-medium">▶ Abrir vídeo</span>
                        </div>
                      </a>
                    ) : (
                      <a href={media.url} target="_blank" rel="noopener noreferrer">
                        <img 
                          src={media.url} 
                          alt={media.name}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-primary-500"
                        />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => removeScreenshot(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1 mt-1">
                      {isVideo(media) && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-1 rounded">Vídeo</span>
                      )}
                      <p className="text-xs text-gray-500 truncate">{media.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Observações e Evidências */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Observações</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
              <textarea
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                className="textarea-field"
                rows="3"
                placeholder="Observações adicionais sobre o teste..."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn-primary flex items-center space-x-2"
            disabled={savingToJira}
          >
            {savingToJira ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Salvando e criando issue no Jira...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Salvar Teste</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* AI Test Document Generation Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl my-8">
            <div className="p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Gerar Documento de Teste com IA</h2>
                  <p className="text-sm text-gray-600">Descreva o teste e a IA criará o documento completo</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Teste
                </label>
                <select
                  value={aiTestType}
                  onChange={(e) => setAiTestType(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="funcional">Funcional</option>
                  <option value="regressao">Regressão</option>
                  <option value="performance">Performance</option>
                  <option value="seguranca">Segurança</option>
                  <option value="usabilidade">Usabilidade</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioridade
                </label>
                <select
                  value={aiTestPriority}
                  onChange={(e) => setAiTestPriority(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição do Teste *
                </label>
                <textarea
                  value={aiTestDescription}
                  onChange={(e) => setAiTestDescription(e.target.value)}
                  className="input-field w-full"
                  rows={6}
                  placeholder="Descreva detalhadamente o que precisa ser testado:

Exemplo: Preciso testar a funcionalidade de login do sistema, validando o acesso com credenciais corretas, tratamento de erros para senhas incorretas, recuperação de senha e login com redes sociais. O teste deve cobrir também validação de campos obrigatórios e tentativas de acesso com usuários bloqueados."
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Seja específico para melhores resultados. A IA criará um documento completo com todos os campos.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-medium text-purple-900 mb-2">O que a IA vai gerar:</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Título e requisito associado</li>
                  <li>• Funcionalidade e módulo</li>
                  <li>• Pré-condições detalhadas</li>
                  <li>• Passos de teste completos</li>
                  <li>• Resultados esperados e observações</li>
                  <li>• Ambiente e elementos de teste</li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAIModal(false)
                  setAiTestDescription('')
                  setAiTestType('funcional')
                  setAiTestPriority('media')
                }}
                className="btn-secondary"
                disabled={aiGenerating}
              >
                Cancelar
              </button>
              <button
                onClick={handleAIGenerateTestDocument}
                disabled={aiGenerating || !aiTestDescription.trim()}
                className="btn-primary bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
              >
                {aiGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Gerar Documento
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
