import { useState, useMemo, useRef } from 'react'
import { 
  CheckCircle, Clock, AlertTriangle, Bug, Lightbulb, FileText, 
  Filter, Search, Eye, Play, ChevronDown, ExternalLink, User,
  Send, Image, Video, Loader2, X, Upload, MessageSquare, Paperclip
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import MediaViewer from '../components/MediaViewer'
import CommentsSection from '../components/CommentsSection'
import { uploadScreenshot } from '../firebase'

const TASK_TYPES = {
  'bug': { bg: 'bg-red-100', text: 'text-red-700', label: 'Bug', icon: Bug },
  'business_rule': { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Regra de Negócio', icon: FileText },
  'improvement': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Melhoria', icon: Lightbulb }
}

const TASK_STATUS = {
  'pending': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Pendente', icon: Clock },
  'in_progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em Andamento', icon: Play },
  'in_review': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Em Revisão', icon: AlertTriangle },
  'done': { bg: 'bg-green-100', text: 'text-green-700', label: 'Concluído', icon: CheckCircle }
}

const PRIORITY_COLORS = {
  'low': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Baixa' },
  'medium': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Média' },
  'high': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Alta' },
  'critical': { bg: 'bg-red-100', text: 'text-red-700', label: 'Crítica' }
}

export default function MyTasksPage({ 
  tasks = [], 
  sprints = [],
  users = [],
  currentUser,
  onUpdateTask,
  onAddNotification,
  onUpdateDocumentStatus,
  onAddTaskComment
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')
  const [viewingTask, setViewingTask] = useState(null)
  const [viewingMedia, setViewingMedia] = useState(null)
  const [loading, setLoading] = useState(false)

  // Filtrar tarefas atribuídas ao usuário atual
  const myTasks = useMemo(() => {
    if (!currentUser) return []
    // Verificar por id ou uid (Firebase Auth usa uid)
    const userId = currentUser.id || currentUser.uid
    return tasks.filter(t => t.assignee === userId)
  }, [tasks, currentUser])

  // Aplicar filtros
  const filteredTasks = useMemo(() => {
    let filtered = myTasks

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(t => 
        t.title?.toLowerCase().includes(term) ||
        t.description?.toLowerCase().includes(term)
      )
    }
    if (filterStatus) filtered = filtered.filter(t => t.status === filterStatus)
    if (filterType) filtered = filtered.filter(t => t.type === filterType)

    return filtered
  }, [myTasks, searchTerm, filterStatus, filterType])

  // Agrupar por status
  const tasksByStatus = useMemo(() => {
    return {
      pending: filteredTasks.filter(t => t.status === 'pending'),
      in_progress: filteredTasks.filter(t => t.status === 'in_progress'),
      in_review: filteredTasks.filter(t => t.status === 'in_review'),
      done: filteredTasks.filter(t => t.status === 'done')
    }
  }, [filteredTasks])

  // Estatísticas
  const stats = useMemo(() => ({
    total: myTasks.length,
    pending: myTasks.filter(t => t.status === 'pending').length,
    inProgress: myTasks.filter(t => t.status === 'in_progress').length,
    inReview: myTasks.filter(t => t.status === 'in_review').length,
    done: myTasks.filter(t => t.status === 'done').length
  }), [myTasks])

  const handleUpdateStatus = async (taskId, newStatus) => {
    setLoading(true)
    try {
      await onUpdateTask(taskId, { status: newStatus })
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="p-8 text-center">
        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Faça login para ver suas tarefas</h2>
        <p className="text-gray-500">Você precisa estar logado para acessar suas tarefas.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minhas Tarefas</h1>
          <p className="text-gray-500">Gerencie as tarefas atribuídas a você</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="card p-4 text-center border-l-4 border-gray-400">
          <div className="text-2xl font-bold text-gray-700">{stats.pending}</div>
          <div className="text-sm text-gray-500">Pendentes</div>
        </div>
        <div className="card p-4 text-center border-l-4 border-blue-500">
          <div className="text-2xl font-bold text-blue-700">{stats.inProgress}</div>
          <div className="text-sm text-gray-500">Em Andamento</div>
        </div>
        <div className="card p-4 text-center border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-700">{stats.inReview}</div>
          <div className="text-sm text-gray-500">Em Revisão</div>
        </div>
        <div className="card p-4 text-center border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-700">{stats.done}</div>
          <div className="text-sm text-gray-500">Concluídas</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar tarefas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input"
          >
            <option value="">Todos os Status</option>
            {Object.entries(TASK_STATUS).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input"
          >
            <option value="">Todos os Tipos</option>
            {Object.entries(TASK_TYPES).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tasks List */}
      {loading && <LoadingSpinner />}

      {myTasks.length === 0 ? (
        <div className="card p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma tarefa atribuída</h3>
          <p className="text-gray-500">Você não tem tarefas pendentes no momento.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Pendentes */}
          {tasksByStatus.pending.length > 0 && (
            <TaskSection 
              title="Pendentes" 
              tasks={tasksByStatus.pending}
              sprints={sprints}
              statusStyle={TASK_STATUS.pending}
              onView={setViewingTask}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {/* Em Andamento */}
          {tasksByStatus.in_progress.length > 0 && (
            <TaskSection 
              title="Em Andamento" 
              tasks={tasksByStatus.in_progress}
              sprints={sprints}
              statusStyle={TASK_STATUS.in_progress}
              onView={setViewingTask}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {/* Em Revisão */}
          {tasksByStatus.in_review.length > 0 && (
            <TaskSection 
              title="Em Revisão" 
              tasks={tasksByStatus.in_review}
              sprints={sprints}
              statusStyle={TASK_STATUS.in_review}
              onView={setViewingTask}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {/* Concluídas */}
          {tasksByStatus.done.length > 0 && (
            <TaskSection 
              title="Concluídas" 
              tasks={tasksByStatus.done}
              sprints={sprints}
              statusStyle={TASK_STATUS.done}
              onView={setViewingTask}
              onUpdateStatus={handleUpdateStatus}
              collapsed
            />
          )}
        </div>
      )}

      {/* Task View Modal */}
      {viewingTask && (
        <TaskViewModal
          task={viewingTask}
          sprints={sprints}
          users={users}
          currentUser={currentUser}
          onClose={() => setViewingTask(null)}
          onUpdateStatus={handleUpdateStatus}
          onViewMedia={(media, index) => setViewingMedia({ media, index })}
          onAddNotification={onAddNotification}
          onUpdateDocumentStatus={onUpdateDocumentStatus}
          onAddComment={onAddTaskComment}
        />
      )}

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

// Seção de tarefas agrupadas por status
function TaskSection({ title, tasks, sprints, statusStyle, onView, onUpdateStatus, collapsed = false }) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed)
  const StatusIcon = statusStyle.icon

  return (
    <div className="card overflow-hidden">
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <StatusIcon className={`w-5 h-5 ${statusStyle.text}`} />
          <span className="font-semibold text-gray-900">{title}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
            {tasks.length}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
      </button>

      {!isCollapsed && (
        <div className="divide-y">
          {tasks.map(task => (
            <TaskRow 
              key={task.id} 
              task={task} 
              sprints={sprints}
              onView={() => onView(task)}
              onUpdateStatus={onUpdateStatus}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Linha de tarefa
function TaskRow({ task, sprints, onView, onUpdateStatus }) {
  const typeStyle = TASK_TYPES[task.type] || TASK_TYPES.bug
  const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
  const TypeIcon = typeStyle.icon
  const sprint = sprints.find(s => s.id === task.sprintId)
  const hasEvidences = task.sourceData?.screenshots?.length > 0

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${typeStyle.bg}`}>
          <TypeIcon className={`w-5 h-5 ${typeStyle.text}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="cursor-pointer" onClick={onView}>
              <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{task.description.split('\n')[0]}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onView} className="p-1 hover:bg-gray-100 rounded" title="Visualizar">
                <Eye className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}>
              {typeStyle.label}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
              {priorityStyle.label}
            </span>
            {sprint && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                {sprint.name}
              </span>
            )}
            {hasEvidences && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                📸 {task.sourceData.screenshots.length}
              </span>
            )}
            <select
              value={task.status}
              onChange={(e) => onUpdateStatus(task.id, e.target.value)}
              className="px-2 py-0.5 rounded-full text-xs font-medium border cursor-pointer bg-white"
            >
              {Object.entries(TASK_STATUS).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

// Modal de visualização de tarefa com interação completa
function TaskViewModal({ task, sprints, users, currentUser, onClose, onUpdateStatus, onViewMedia, onAddNotification, onUpdateDocumentStatus, onAddComment, onUpdateTask }) {
  const [activeTab, setActiveTab] = useState('detalhes')
  const [newComment, setNewComment] = useState('')
  const [commentMedia, setCommentMedia] = useState([])
  const [uploading, setUploading] = useState(false)
  const [sending, setSending] = useState(false)
  const [showMentions, setShowMentions] = useState(false)
  const [mentionFilter, setMentionFilter] = useState('')
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)

  const typeStyle = TASK_TYPES[task.type] || TASK_TYPES.bug
  const statusStyle = TASK_STATUS[task.status] || TASK_STATUS.pending
  const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
  const TypeIcon = typeStyle.icon
  const screenshots = task.screenshots || task.sourceData?.screenshots || []
  const comments = task.comments || []
  const sprint = sprints.find(s => s.id === task.sprintId)

  // Filtrar usuários para menções
  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(mentionFilter.toLowerCase()) ||
    u.email?.toLowerCase().includes(mentionFilter.toLowerCase())
  ).slice(0, 5)

  // Detectar @ no texto
  const handleCommentChange = (e) => {
    const text = e.target.value
    setNewComment(text)
    
    const cursorPos = e.target.selectionStart
    const textBeforeCursor = text.slice(0, cursorPos)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')
    
    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.slice(lastAtIndex + 1)
      if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
        setMentionFilter(textAfterAt)
        setShowMentions(true)
        return
      }
    }
    setShowMentions(false)
    setMentionFilter('')
  }

  // Inserir menção
  const insertMention = (user) => {
    const cursorPos = textareaRef.current?.selectionStart || newComment.length
    const textBeforeCursor = newComment.slice(0, cursorPos)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')
    
    if (lastAtIndex !== -1) {
      const beforeAt = newComment.slice(0, lastAtIndex)
      const afterCursor = newComment.slice(cursorPos)
      const mentionName = user.name || user.email.split('@')[0]
      setNewComment(`${beforeAt}@${mentionName} ${afterCursor}`)
    }
    setShowMentions(false)
    setMentionFilter('')
    textareaRef.current?.focus()
  }

  // Upload de arquivos
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploading(true)
    try {
      const tempId = `task_${task.id}_${Date.now()}`
      const uploadedFiles = []
      
      for (const file of files) {
        const isVideoFile = file.type.startsWith('video/')
        const uploaded = await uploadScreenshot(file, tempId)
        uploadedFiles.push({
          url: uploaded.url,
          name: file.name,
          type: isVideoFile ? 'video' : 'image',
          uploadedAt: new Date().toISOString()
        })
      }
      setCommentMedia(prev => [...prev, ...uploadedFiles])
    } catch (error) {
      console.error('Erro no upload:', error)
      alert('Erro ao fazer upload do arquivo. Tente novamente.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  // Enviar comentário
  const handleSendComment = async () => {
    if (!newComment.trim() && commentMedia.length === 0) return

    setSending(true)
    try {
      const comment = {
        id: `comment_${Date.now()}`,
        text: newComment.trim(),
        media: commentMedia,
        author: currentUser?.name || currentUser?.email || 'Anônimo',
        authorId: currentUser?.uid || currentUser?.id,
        createdAt: new Date().toISOString()
      }

      if (onAddComment) {
        await onAddComment(task.id, comment)
      }

      setNewComment('')
      setCommentMedia([])
    } catch (error) {
      console.error('Erro ao enviar comentário:', error)
      alert('Erro ao enviar comentário. Tente novamente.')
    } finally {
      setSending(false)
    }
  }

  const removeMedia = (index) => {
    setCommentMedia(prev => prev.filter((_, i) => i !== index))
  }

  const tabs = [
    { id: 'detalhes', label: 'Detalhes' },
    { id: 'comentarios', label: `Comentários (${comments.length})` },
    { id: 'evidencias', label: `Evidências (${screenshots.length})` },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b dark:border-slate-700 shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${typeStyle.bg}`}>
                <TypeIcon className={`w-6 h-6 ${typeStyle.text}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}>
                    {typeStyle.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
                    {priorityStyle.label}
                  </span>
                  {sprint && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                      {sprint.name}
                    </span>
                  )}
                  {task.relatedRequirementCode && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      Req: {task.relatedRequirementCode}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{task.title}</h2>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 border-b dark:border-slate-700 -mb-6 pb-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-800 text-blue-600 border-t border-x dark:border-slate-700 -mb-px'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'detalhes' && (
            <div className="space-y-6">
              {/* Status Selector */}
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">Atualizar Status</label>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(TASK_STATUS).map(([key, val]) => {
                    const Icon = val.icon
                    const isActive = task.status === key
                    return (
                      <button
                        key={key}
                        onClick={() => onUpdateStatus(task.id, key)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          isActive 
                            ? `${val.bg} ${val.text} ring-2 ring-offset-2 ring-current` 
                            : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {val.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Description */}
              {task.description && (
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Descrição</label>
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-gray-50 dark:bg-slate-700 p-4 rounded-lg text-sm max-h-64 overflow-y-auto">
                    {task.description}
                  </div>
                </div>
              )}

              {/* Passos para reproduzir (bugs) */}
              {task.steps && (
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Passos para Reproduzir</label>
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-gray-50 dark:bg-slate-700 p-4 rounded-lg text-sm">
                    {task.steps}
                  </div>
                </div>
              )}

              {/* Resultado esperado vs atual */}
              {(task.expectedResult || task.actualResult) && (
                <div className="grid grid-cols-2 gap-4">
                  {task.expectedResult && (
                    <div>
                      <label className="text-xs font-medium text-green-600 mb-1 block">Resultado Esperado</label>
                      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-sm border border-green-200 dark:border-green-800">
                        {task.expectedResult}
                      </div>
                    </div>
                  )}
                  {task.actualResult && (
                    <div>
                      <label className="text-xs font-medium text-red-600 mb-1 block">Resultado Atual</label>
                      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-sm border border-red-200 dark:border-red-800">
                        {task.actualResult}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t dark:border-slate-700">
                {task.createdBy && <span>Criado por: <strong>{task.createdBy}</strong></span>}
                {task.createdAt && <span>Em: {new Date(task.createdAt).toLocaleDateString('pt-BR')}</span>}
                {task.workspace && <span>Espaço: {task.workspace}</span>}
              </div>
            </div>
          )}

          {activeTab === 'comentarios' && (
            <div className="space-y-4">
              {/* Lista de comentários */}
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhum comentário ainda</p>
                    <p className="text-sm">Seja o primeiro a comentar!</p>
                  </div>
                ) : (
                  comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {(comment.author || 'A')[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{comment.author}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.createdAt).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">{comment.text}</p>
                      {comment.media?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {comment.media.map((m, idx) => (
                            <button
                              key={idx}
                              onClick={() => onViewMedia(comment.media, idx)}
                              className="relative"
                            >
                              {m.type === 'video' ? (
                                <div className="relative w-20 h-20">
                                  <video src={m.url} className="w-20 h-20 object-cover rounded-lg border" />
                                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                                    <Play className="w-6 h-6 text-white" />
                                  </div>
                                </div>
                              ) : (
                                <img src={m.url} alt="" className="w-20 h-20 object-cover rounded-lg border" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Input de novo comentário */}
              <div className="border-t dark:border-slate-700 pt-4">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Digite seu comentário... Use @ para mencionar alguém"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  {/* Dropdown de menções */}
                  {showMentions && filteredUsers.length > 0 && (
                    <div className="absolute bottom-full left-0 mb-1 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-600 py-1 z-50 max-h-48 overflow-y-auto">
                      <div className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-700">
                        Mencionar usuário
                      </div>
                      {filteredUsers.map(user => (
                        <button
                          key={user.id || user.email}
                          onClick={() => insertMention(user)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
                        >
                          <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              {(user.name || user.email)[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                              {user.name || user.email.split('@')[0]}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {user.email}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Preview de mídia */}
                {commentMedia.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {commentMedia.map((m, idx) => (
                      <div key={idx} className="relative group">
                        {m.type === 'video' ? (
                          <div className="relative w-16 h-16">
                            <video src={m.url} className="w-16 h-16 object-cover rounded-lg border" />
                            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                              <Video className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        ) : (
                          <img src={m.url} alt="" className="w-16 h-16 object-cover rounded-lg border" />
                        )}
                        <button
                          onClick={() => removeMedia(idx)}
                          className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Botões de ação */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      title="Anexar imagem ou vídeo"
                    >
                      {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
                    </button>
                  </div>
                  <button
                    onClick={handleSendComment}
                    disabled={sending || (!newComment.trim() && commentMedia.length === 0)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evidencias' && (
            <div>
              {screenshots.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma evidência anexada</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {screenshots.map((ss, index) => (
                    <button
                      key={index}
                      onClick={() => onViewMedia(screenshots.map(s => ({ 
                        url: s.url, 
                        type: s.type || (s.url?.includes('.mp4') || s.url?.includes('.webm') || s.url?.includes('.mov') ? 'video' : 'image'), 
                        name: s.name 
                      })), index)}
                      className="relative group cursor-pointer aspect-video bg-gray-100 dark:bg-slate-700 rounded-lg overflow-hidden"
                    >
                      {ss.type === 'video' || ss.url?.includes('.mp4') || ss.url?.includes('.webm') ? (
                        <>
                          <video src={ss.url} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-10 h-10 text-white" />
                          </div>
                        </>
                      ) : (
                        <img src={ss.url} alt="" className="w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 flex justify-end shrink-0">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
