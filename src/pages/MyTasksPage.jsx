import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle, Clock, AlertTriangle, Bug, Lightbulb, FileText,
  Filter, Search, Eye, Play, ChevronDown, ExternalLink, User,
  Send, Image, Video, Loader2, X, Upload, MessageSquare, Paperclip, Smile,
  UserCheck, ArrowLeft
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import MediaViewer from '../components/MediaViewer'
import CommentsSection from '../components/CommentsSection'
import UploadLoading from '../components/UploadLoading'
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
  testDocuments = [],
  onUpdateTask,
  onAddNotification,
  onUpdateDocumentStatus,
  onAddTaskComment,
  onToggleTaskReaction
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')
  const navigate = useNavigate()
  const [viewingMedia, setViewingMedia] = useState(null)
  const [loading, setLoading] = useState(false)

  // Enriquecer tasks com dados atualizados do documento de teste, quando existir
  const enrichedTasks = useMemo(() => {
    if (!testDocuments || testDocuments.length === 0) return tasks
    return tasks.map(task => {
      if (task.sourceType === 'test_document' && task.sourceId) {
        const testDoc = testDocuments.find(doc => doc.id === task.sourceId)
        if (testDoc) {
          return {
            ...task,
            sourceData: {
              ...task.sourceData,
              comments: testDoc.comments || [],
              status: testDoc.status,
              screenshots: testDoc.screenshots || [],
              evidences: testDoc.evidences || task.sourceData?.evidences || [],
              failedSteps: testDoc.failedSteps || task.sourceData?.failedSteps || []
            }
          }
        }
      }
      return task
    })
  }, [tasks, testDocuments])

  // Filtrar tarefas atribuídas ao usuário atual
  const myTasks = useMemo(() => {
    if (!currentUser) return []
    const userId = currentUser.id || currentUser.uid
    const role = currentUser.role?.toLowerCase()
    // QA também vê tarefas em triagem (workspace qa, sourceType test_document, pending)
    if (role === 'qa' || role === 'admin') {
      return enrichedTasks.filter(t =>
        t.assignee === userId ||
        (t.workspace === 'qa' && t.sourceType === 'test_document' && t.status === 'pending')
      )
    }
    return enrichedTasks.filter(t => t.assignee === userId)
  }, [enrichedTasks, currentUser])

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

  const handleNavigateToTask = (task) => {
    navigate('/espacos?taskId=' + task.id)
  }

  const handleUpdateStatus = async (taskId, newStatus) => {
    setLoading(true)
    try {
      const updates = { status: newStatus }
      if (newStatus === 'in_review') updates.workspace = 'qa'
      await onUpdateTask(taskId, updates)
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
              onView={handleNavigateToTask}
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
              onView={handleNavigateToTask}
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
              onView={handleNavigateToTask}
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
              onView={handleNavigateToTask}
              onUpdateStatus={handleUpdateStatus}
              collapsed
            />
          )}
        </div>
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
  const hasEvidences = (task.screenshots?.length || 0) > 0 ||
    (task.sourceData?.screenshots?.length || 0) > 0 ||
    (task.attachments?.length || 0) > 0 ||
    (task.sourceData?.evidences?.length || 0) > 0 ||
    (task.devEvidences?.length || task.sourceData?.devEvidences?.length || 0) > 0

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
                📎 Evidências
              </span>
            )}
            {task.reviewStage === 'para_correcao' && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                ⚠️ Para Correção
              </span>
            )}
            {task.reviewStage === 'aguardando_reteste_op' && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                🔄 Aguardando Reteste
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
function TaskViewModal({ task, sprints, users, currentUser, testDocuments = [], onClose, onUpdateStatus, onViewMedia, onAddNotification, onUpdateDocumentStatus, onAddComment, onToggleReaction, onUpdateTask }) {
  const [activeTab, setActiveTab] = useState('detalhes')
  const [newComment, setNewComment] = useState('')
  const [commentMedia, setCommentMedia] = useState([])
  const [uploading, setUploading] = useState(false)
  const [sending, setSending] = useState(false)
  const [qaAction, setQaAction] = useState(null) // 'distribuir' | 'devolver' | null
  const [selectedDev, setSelectedDev] = useState('')
  const [devolveReason, setDevolveReason] = useState('')
  const [showMentions, setShowMentions] = useState(false)
  const [mentionFilter, setMentionFilter] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [localComments, setLocalComments] = useState(task.comments || [])
  const [openReactionPicker, setOpenReactionPicker] = useState(null)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)

  // DEBUG: expor última tarefa visualizada para inspeção no console
  if (typeof window !== 'undefined') {
    window.__lastTask = task
    // eslint-disable-next-line no-console
    console.log('[MyTasksPage] TaskViewModal task:', task)
  }

  // Sincronizar comentários locais quando a tarefa mudar
  useEffect(() => {
    setLocalComments(task.comments || [])
  }, [task.comments])

  // Handler para Ctrl+V (colar imagem)
  useEffect(() => {
    const handlePaste = async (e) => {
      const items = e.clipboardData?.items
      if (!items) return
      
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault()
          const file = item.getAsFile()
          if (file) {
            await handleFilesUpload([file])
          }
          break
        }
      }
    }
    
    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [])

  // Função centralizada para upload de arquivos
  const handleFilesUpload = async (files) => {
    if (files.length === 0) return

    setUploading(true)
    try {
      const tempId = `task_${task.id}_${Date.now()}`
      const uploadedFiles = []
      
      for (const file of files) {
        const isVideoFile = file.type.startsWith('video/') || 
          file.name.endsWith('.mp4') || file.name.endsWith('.webm') || 
          file.name.endsWith('.mov') || file.name.endsWith('.avi')
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
    }
  }

  // Handler para drag-and-drop
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files).filter(f => 
      f.type.startsWith('image/') || f.type.startsWith('video/') ||
      f.name.endsWith('.mp4') || f.name.endsWith('.webm') || 
      f.name.endsWith('.mov') || f.name.endsWith('.avi')
    )
    
    if (files.length > 0) {
      await handleFilesUpload(files)
    }
  }

  const typeStyle = TASK_TYPES[task.type] || TASK_TYPES.bug
  const statusStyle = TASK_STATUS[task.status] || TASK_STATUS.pending
  const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
  const TypeIcon = typeStyle.icon
  const findTestDoc = () => {
    if (task.sourceType === 'test_document' && task.sourceId && testDocuments.length > 0) {
      return testDocuments.find(doc => doc.id === task.sourceId)
    }
    return null
  }

  const latestTestDoc = findTestDoc()
  const sourceData = {
    ...task.sourceData,
    screenshots: task.sourceData?.screenshots || latestTestDoc?.screenshots || [],
    evidences: task.sourceData?.evidences || latestTestDoc?.evidences || [],
    failedSteps: task.sourceData?.failedSteps || latestTestDoc?.failedSteps || []
  }

  const pickMediaList = (...lists) => {
    for (const list of lists) {
      if (Array.isArray(list) && list.length > 0) {
        return list
      }
    }
    return lists.find(list => Array.isArray(list)) || []
  }

  const screenshots = pickMediaList(task.screenshots, sourceData.screenshots)

  let attachments = pickMediaList(task.attachments, sourceData.evidences)
  if (attachments.length === 0 && sourceData.failedSteps) {
    const evidencesFromSteps = []
    sourceData.failedSteps.forEach((step, index) => {
      if (step.evidences && step.evidences.length > 0) {
        step.evidences.forEach(evidence => {
          evidencesFromSteps.push({
            ...evidence,
            stepIndex: index,
            stepAction: step.action
          })
        })
      }
    })
    attachments = evidencesFromSteps
  }

  const devEvidences = pickMediaList(task.devEvidences, sourceData.devEvidences)

  const inferMediaType = (item) => {
    if (item?.type) return item.type
    if (item?.mediaType) return item.mediaType
    const url = item?.url || ''
    const videoRegex = /\.(mp4|webm|mov|avi)$/i
    return videoRegex.test(url) ? 'video' : 'image'
  }

  const buildMediaItems = (items, prefix = 'Evidência') =>
    items.map((item, index) => ({
      url: item.url,
      type: inferMediaType(item),
      name: item.name || `${prefix} ${index + 1}`,
      stepIndex: typeof item.stepIndex === 'number' ? item.stepIndex : undefined,
      stepAction: item.stepAction
    }))

  const screenshotsMedia = buildMediaItems(screenshots, 'Evidência')
  const attachmentsMedia = buildMediaItems(attachments, 'Falha')
  const devEvidencesMedia = buildMediaItems(devEvidences, 'Evidência do Dev')
  const totalEvidenceCount = screenshots.length + attachments.length + devEvidences.length
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
    await handleFilesUpload(files)
    e.target.value = ''
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
        // Atualizar estado local imediatamente
        setLocalComments(prev => [...prev, comment])
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

  // Handler para reações
  const handleReaction = async (commentIndex, emoji) => {
    if (!onToggleReaction || !currentUser) return
    const userId = currentUser.id || currentUser.uid
    const userName = currentUser.name || currentUser.email
    
    try {
      await onToggleReaction(task.id, commentIndex, { type: 'emoji', value: emoji }, userId, userName)
      // Atualizar estado local
      setLocalComments(prev => prev.map((c, idx) => {
        if (idx !== commentIndex) return c
        const reactions = c.reactions || {}
        const users = reactions[emoji] || []
        const userIndex = users.indexOf(userId)
        
        let newUsers
        if (userIndex >= 0) {
          newUsers = users.filter(u => u !== userId)
        } else {
          newUsers = [...users, userId]
        }
        
        const newReactions = { ...reactions }
        if (newUsers.length === 0) {
          delete newReactions[emoji]
        } else {
          newReactions[emoji] = newUsers
        }
        
        return { ...c, reactions: newReactions }
      }))
    } catch (error) {
      console.error('Erro ao reagir:', error)
    }
    setOpenReactionPicker(null)
  }

  const handleDistribuirDev = async () => {
    if (!selectedDev || !onUpdateTask) return
    const dev = users.find(u => u.id === selectedDev)
    setSending(true)
    try {
      await onUpdateTask(task.id, { workspace: 'devs', assignee: selectedDev, status: 'pending' })
      if (onAddComment) {
        await onAddComment(task.id, {
          text: `QA distribuiu tarefa para ${dev?.name || dev?.email || 'Dev'}.`,
          type: 'distribuido_qa',
          author: currentUser?.name || currentUser?.email,
          authorId: currentUser?.id || currentUser?.uid,
          authorEmail: currentUser?.email || null,
          createdAt: new Date().toISOString()
        })
      }
      onClose()
    } catch (e) {
      console.error('Erro ao distribuir:', e)
      alert('Erro ao distribuir tarefa.')
    } finally {
      setSending(false)
    }
  }

  const handleDevolverOperacao = async () => {
    if (!devolveReason.trim() || !onUpdateTask) return
    setSending(true)
    try {
      await onUpdateTask(task.id, { workspace: 'operacao', reviewStage: 'aguardando_reteste_op', status: 'in_review' })
      if (onAddComment) {
        await onAddComment(task.id, {
          text: `QA devolveu para Operação para reteste: ${devolveReason.trim()}`,
          type: 'devolvido_operacao',
          author: currentUser?.name || currentUser?.email,
          authorId: currentUser?.id || currentUser?.uid,
          authorEmail: currentUser?.email || null,
          createdAt: new Date().toISOString()
        })
      }
      if (onAddNotification) {
        await onAddNotification({
          type: 'nova_tarefa',
          message: `QA devolveu para reteste da Operação: "${task.title}"`,
          author: currentUser?.name || currentUser?.email,
          authorEmail: currentUser?.email || null,
          targetRole: 'operacao'
        })
      }
      onClose()
    } catch (e) {
      console.error('Erro ao devolver:', e)
      alert('Erro ao devolver tarefa.')
    } finally {
      setSending(false)
    }
  }

  const handleUpdateStatus = async (newStatus, reviewStage = null) => {
    if (!onUpdateTask) return
    setSending(true)
    try {
      const updates = { status: newStatus }
      updates.reviewStage = reviewStage || null
      // Atualizar workspace automaticamente conforme destino
      if (newStatus === 'in_review' && reviewStage === 'qa') updates.workspace = 'qa'
      else if (newStatus === 'in_review' && reviewStage === 'operacao') updates.workspace = 'operacao'
      await onUpdateTask(task.id, updates)
      if (onAddNotification) {
        const author = currentUser?.name || currentUser?.email || 'Usuário'
        if (newStatus === 'in_review' && reviewStage === 'qa') {
          // Diferenciar: Op reprovando reteste vs Dev enviando para QA
          if (task.reviewStage === 'operacao') {
            await onAddNotification({
              type: 'reprovado_reteste',
              message: `Operação reprovou e devolveu para o QA: "${task.title}"`,
              author, authorEmail: currentUser?.email || null, targetRole: 'qa'
            })
          } else {
            await onAddNotification({
              type: 'nova_tarefa',
              message: `${author} enviou para revisão do QA: "${task.title}"`,
              author, authorEmail: currentUser?.email || null, targetRole: 'qa'
            })
          }
        } else if (newStatus === 'in_review' && reviewStage === 'operacao') {
          await onAddNotification({
            type: 'aprovado_reteste',
            message: `QA aprovou e enviou para Operação: "${task.title}"`,
            author, authorEmail: currentUser?.email || null, targetRole: 'operacao'
          })
        } else if (newStatus === 'done') {
          const assigneeUser = users.find(u => u.id === task.assignee)
          if (assigneeUser) {
            await onAddNotification({
              type: 'aprovado_reteste',
              message: `Reteste aprovado por ${author}: "${task.title}"`,
              author, authorEmail: currentUser?.email || null,
              targetUserId: assigneeUser.id, targetEmail: assigneeUser.email
            })
          }
        }
      }
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar status. Tente novamente.')
    } finally {
      setSending(false)
    }
  }

  const handleReprovarReteste = async () => {
    if (!onUpdateTask) return
    setSending(true)
    try {
      // Reprovar reteste devolve para triagem do QA
      await onUpdateTask(task.id, { status: 'pending', workspace: 'qa', reviewStage: null })
      if (onAddNotification) {
        const author = currentUser?.name || currentUser?.email || 'Usuário'
        await onAddNotification({
          type: 'reprovado_reteste',
          message: `Operação reprovou reteste e devolveu para triagem do QA: "${task.title}"`,
          author, authorEmail: currentUser?.email || null, targetRole: 'qa'
        })
      }
      onClose()
    } catch (error) {
      console.error('Erro ao reprovar reteste:', error)
      alert('Erro ao reprovar reteste. Tente novamente.')
    } finally {
      setSending(false)
    }
  }

  const role = currentUser?.role?.toLowerCase()
  const isStandaloneTask = !task.sourceType || task.sourceType !== 'test_document'
  const isDev = role === 'desenvolvedor' || role === 'admin'
  const isQA = role === 'qa' || role === 'admin'
  const isOp = role === 'operacao' || role === 'admin'
  const showSendToQA = isStandaloneTask && isDev &&
    task.workspace !== 'qa' &&
    (task.status === 'pending' || task.status === 'in_progress')
  const showQAActions = isStandaloneTask && isQA &&
    task.status === 'in_review' && task.reviewStage === 'qa'
  const showOpActions = isStandaloneTask && isOp &&
    task.status === 'in_review' && task.reviewStage === 'operacao'
  const showRetestOpActions = isStandaloneTask && isOp &&
    (task.reviewStage === 'aguardando_reteste_op' || task.reviewStage === 'nao_pertinente')
  const showQATriageActions = isQA &&
    task.workspace === 'qa' &&
    task.status === 'pending'
  const devUsers = (users || []).filter(u => u.role === 'desenvolvedor')

  const tabs = [
    { id: 'detalhes', label: 'Detalhes' },
    { id: 'comentarios', label: `Comentários (${localComments.length})` },
    { id: 'evidencias', label: `Evidências QA (${screenshots.length + attachments.length})` },
    { id: 'dev', label: `Evidências Dev (${devEvidences.length})` },
  ]

  const renderMediaGrid = (mediaList, accent = 'blue') => {
    const accentBg = accent === 'red' ? 'bg-red-600' : accent === 'purple' ? 'bg-purple-600' : 'bg-blue-600'
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaList.map((media, index) => (
          <button
            key={`${media.url}-${index}`}
            onClick={() => onViewMedia(mediaList, index)}
            className="relative group cursor-pointer aspect-video bg-gray-100 dark:bg-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            {media.type === 'video' ? (
              <>
                <video
                  src={media.url}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                  loop
                  preload="metadata"
                  poster={media.thumbnail || undefined}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="w-10 h-10 text-white" />
                </div>
              </>
            ) : (
              <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white">
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${accentBg}`}>
                {media.stepAction ? `Passo ${media.stepIndex + 1}` : media.name}
              </div>
              {media.stepAction && (
                <div className="mt-2 px-2 py-1 rounded-md bg-black/70 line-clamp-2 text-[11px]">
                  {media.stepAction}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    )
  }

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
                {localComments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhum comentário ainda</p>
                    <p className="text-sm">Seja o primeiro a comentar!</p>
                  </div>
                ) : (
                  localComments.map((comment, commentIndex) => (
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
                      
                      {/* Reações */}
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        {comment.reactions && Object.entries(comment.reactions).map(([emoji, users]) => (
                          users.length > 0 && (
                            <button
                              key={emoji}
                              onClick={() => handleReaction(commentIndex, emoji)}
                              className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                                users.includes(currentUser?.uid || currentUser?.id)
                                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                  : 'bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300'
                              }`}
                            >
                              <span>{emoji}</span>
                              <span>{users.length}</span>
                            </button>
                          )
                        ))}
                        <div className="relative">
                          <button
                            onClick={() => setOpenReactionPicker(openReactionPicker === commentIndex ? null : commentIndex)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-400"
                          >
                            <Smile className="w-4 h-4" />
                          </button>
                          {openReactionPicker === commentIndex && (
                            <div className="absolute bottom-full left-0 mb-1 z-10">
                              <div className="bg-white dark:bg-slate-700 rounded-lg shadow-xl border border-gray-200 dark:border-slate-600 p-2 flex gap-1">
                                {['👍', '👎', '❤️', '🎉', '😄', '🤔', '👀', '🚀'].map(emoji => (
                                  <button
                                    key={emoji}
                                    onClick={() => handleReaction(commentIndex, emoji)}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-slate-600 rounded text-lg"
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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

                {/* Área de drag-and-drop */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`mt-3 p-4 border-2 border-dashed rounded-lg transition-colors ${
                    isDragging 
                      ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50'
                  }`}
                >
                  {/* Upload Loading */}
                  {uploading ? (
                    <UploadLoading message="Enviando evidência" />
                  ) : (
                    <>
                      {/* Preview de mídia */}
                      {commentMedia.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {commentMedia.map((m, idx) => (
                            <div key={idx} className="relative group">
                              <button
                                onClick={() => onViewMedia(commentMedia, idx)}
                                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                              >
                                {m.type === 'video' ? (
                                  <div className="relative w-20 h-16">
                                    <video src={m.url} className="w-20 h-16 object-cover rounded-lg border" />
                                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                                      <Play className="w-5 h-5 text-white" />
                                    </div>
                                  </div>
                                ) : (
                                  <img src={m.url} alt="" className="w-20 h-16 object-cover rounded-lg border hover:opacity-90" />
                                )}
                              </button>
                              <button
                                onClick={() => removeMedia(idx)}
                                className="absolute -top-2 -right-2 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        <p>Arraste arquivos aqui ou clique para selecionar</p>
                        <p className="text-xs mt-1">Ctrl+V para colar print da área de transferência</p>
                      </div>
                    </>
                  )}
                </div>

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
            <div className="space-y-6">
              {screenshotsMedia.length === 0 && attachmentsMedia.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma evidência anexada por QA</p>
                </div>
              ) : (
                <>
                  {screenshotsMedia.length > 0 && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                        📸 Capturas do Teste ({screenshotsMedia.length})
                      </label>
                      {renderMediaGrid(screenshotsMedia)}
                    </div>
                  )}

                  {attachmentsMedia.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <label className="text-xs font-medium text-red-700 dark:text-red-400 mb-2 block">
                        ❌ Evidências da Falha ({attachmentsMedia.length})
                      </label>
                      <p className="text-xs text-red-600 dark:text-red-300 mb-3">
                        Evidências que indicam em qual passo do teste ocorreu a falha.
                      </p>
                      {renderMediaGrid(attachmentsMedia, 'red')}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'dev' && (
            <div>
              {devEvidencesMedia.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma evidência enviada pelo time de desenvolvimento</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Evidências anexadas pelo desenvolvedor para comprovar correções ou reproduzir o comportamento.
                  </p>
                  {renderMediaGrid(devEvidencesMedia, 'purple')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Painel de triagem QA */}
        {showQATriageActions && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-700 bg-amber-50 dark:bg-amber-900/20 space-y-3">
            {qaAction === null && (
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm text-amber-700 dark:text-amber-400 font-medium self-center mr-2">Triagem QA:</span>
                <button onClick={() => setQaAction('distribuir')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <UserCheck className="w-4 h-4" /> Distribuir para Dev
                </button>
                <button onClick={() => setQaAction('devolver')} className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm">
                  <ArrowLeft className="w-4 h-4" /> Devolver para Operação
                </button>
              </div>
            )}
            {qaAction === 'distribuir' && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Selecione o desenvolvedor responsável:</span>
                <div className="flex gap-2 flex-wrap">
                  <select value={selectedDev} onChange={e => setSelectedDev(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm text-gray-900 dark:text-white">
                    <option value="">Selecione um dev...</option>
                    {devUsers.map(u => <option key={u.id} value={u.id}>{u.name || u.email}</option>)}
                  </select>
                  <button onClick={handleDistribuirDev} disabled={!selectedDev || sending} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm">{sending ? 'Enviando...' : 'Confirmar'}</button>
                  <button onClick={() => setQaAction(null)} className="px-4 py-2 bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Cancelar</button>
                </div>
              </div>
            )}
            {qaAction === 'devolver' && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Motivo da devolução (obrigatório):</span>
                <textarea value={devolveReason} onChange={e => setDevolveReason(e.target.value)} placeholder="Descreva por que esta tarefa não é pertinente..." className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm text-gray-900 dark:text-white resize-none" rows={2} />
                <div className="flex gap-2">
                  <button onClick={handleDevolverOperacao} disabled={!devolveReason.trim() || sending} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 text-sm">{sending ? 'Enviando...' : 'Confirmar Devolução'}</button>
                  <button onClick={() => setQaAction(null)} className="px-4 py-2 bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Cancelar</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 flex justify-between items-center shrink-0">
          <div className="flex gap-2">
            {showSendToQA && (
              <button
                onClick={() => handleUpdateStatus('in_review', 'qa')}
                disabled={sending}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 text-sm"
              >
                Enviar para QA
              </button>
            )}
            {showQAActions && (
              <>
                <button
                  onClick={() => handleUpdateStatus('in_review', 'operacao')}
                  disabled={sending}
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 text-sm"
                >
                  Aprovar e Enviar para Operação
                </button>
                <button
                  onClick={() => handleUpdateStatus('in_progress', 'para_correcao')}
                  disabled={sending}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 text-sm"
                >
                  Reprovar (devolver ao Dev)
                </button>
              </>
            )}
            {showOpActions && (
              <>
                <button
                  onClick={() => handleUpdateStatus('done')}
                  disabled={sending}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 text-sm"
                >
                  Aprovar
                </button>
                <button
                  onClick={() => handleUpdateStatus('in_review', 'qa')}
                  disabled={sending}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 text-sm"
                >
                  Reprovar (devolver ao QA)
                </button>
              </>
            )}
            {showRetestOpActions && (
              <>
                <button
                  onClick={() => handleUpdateStatus('done')}
                  disabled={sending}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
                >
                  ✓ Aprovar Reteste → Concluir
                </button>
                <button
                  onClick={handleReprovarReteste}
                  disabled={sending}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 text-sm"
                >
                  Reprovar Reteste
                </button>
              </>
            )}
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
