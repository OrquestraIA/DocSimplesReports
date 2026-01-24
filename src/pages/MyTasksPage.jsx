import { useState, useMemo } from 'react'
import { 
  CheckCircle, Clock, AlertTriangle, Bug, Lightbulb, FileText, 
  Filter, Search, Eye, Play, ChevronDown, ExternalLink, User
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import MediaViewer from '../components/MediaViewer'
import CommentsSection from '../components/CommentsSection'

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
  onUpdateDocumentStatus
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

// Modal de visualização de tarefa
function TaskViewModal({ task, sprints, users, currentUser, onClose, onUpdateStatus, onViewMedia, onAddNotification, onUpdateDocumentStatus }) {
  const typeStyle = TASK_TYPES[task.type] || TASK_TYPES.bug
  const statusStyle = TASK_STATUS[task.status] || TASK_STATUS.pending
  const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
  const TypeIcon = typeStyle.icon
  const screenshots = task.sourceData?.screenshots || []
  const sprint = sprints.find(s => s.id === task.sprintId)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
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
                  {task.sourceData?.jiraKey && (
                    <a 
                      href={task.sourceData.jiraUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {task.sourceData.jiraKey}
                    </a>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{task.title}</h2>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Selector */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">Atualizar Status</label>
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
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              <label className="text-xs font-medium text-gray-500 mb-1 block">Descrição</label>
              <div className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg text-sm max-h-64 overflow-y-auto">
                {task.description}
              </div>
            </div>
          )}

          {/* Evidences */}
          {screenshots.length > 0 && (
            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">
                📸 Evidências ({screenshots.length})
              </label>
              <div className="flex flex-wrap gap-3">
                {screenshots.map((ss, index) => (
                  <button
                    key={index}
                    onClick={() => onViewMedia(screenshots.map(s => ({ 
                      url: s.url, 
                      type: s.type || (s.url?.includes('.mp4') || s.url?.includes('.webm') || s.url?.includes('.mov') ? 'video' : 'image'), 
                      name: s.name 
                    })), index)}
                    className="relative group cursor-pointer"
                  >
                    {ss.type === 'video' || ss.url?.includes('.mp4') || ss.url?.includes('.webm') ? (
                      <div className="relative w-24 h-24">
                        <video src={ss.url} className="w-24 h-24 object-cover rounded-lg border" />
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    ) : (
                      <img src={ss.url} alt="" className="w-24 h-24 object-cover rounded-lg border" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {task.createdBy && <span>Criado por: {task.createdBy}</span>}
            {task.createdAt && <span>Em: {new Date(task.createdAt).toLocaleDateString('pt-BR')}</span>}
          </div>

          {/* Seção de Comentários Completa */}
          {task.sourceType === 'test_document' && task.sourceId && (
            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">
                💬 Interações e Comentários
              </label>
              <CommentsSection
                documentId={task.sourceId}
                comments={task.sourceData?.comments || []}
                status={task.sourceData?.status || 'pendente'}
                users={users}
                currentUser={currentUser}
                onAddNotification={onAddNotification}
                onUpdateStatus={onUpdateDocumentStatus}
                onCommentAdded={() => {}}
              />
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end">
          <button onClick={onClose} className="btn-primary">Fechar</button>
        </div>
      </div>
    </div>
  )
}
