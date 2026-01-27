import { useState, useMemo, useEffect } from 'react'
import { 
  Plus, Search, Filter, Calendar, Clock, CheckCircle, XCircle, 
  AlertTriangle, Bug, Lightbulb, FileText, ChevronDown, ChevronRight,
  Edit2, Trash2, User, Tag, MoreVertical, Play, Pause, Target,
  ArrowRight, Link2, Eye, Download, Image, Video, ExternalLink, Upload
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
  'pending': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Pendente' },
  'in_progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em Andamento' },
  'in_review': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Em Revisão' },
  'done': { bg: 'bg-green-100', text: 'text-green-700', label: 'Concluído' }
}

const PRIORITY_COLORS = {
  'low': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Baixa' },
  'medium': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Média' },
  'high': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Alta' },
  'critical': { bg: 'bg-red-100', text: 'text-red-700', label: 'Crítica' }
}

const SPRINT_STATUS = {
  'planning': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Planejamento' },
  'active': { bg: 'bg-green-100', text: 'text-green-700', label: 'Ativa' },
  'completed': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Concluída' }
}

export default function SprintsPage({
  sprints = [],
  tasks = [],
  users = [],
  testDocuments = [],
  onCreateSprint,
  onUpdateSprint,
  onDeleteSprint,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onImportFromTestDocument,
  onRequestRetest,
  onAddTaskComment,
  onUploadTaskEvidence,
  onAddNotification,
  onUpdateDocumentStatus,
  currentUser
}) {
  const [activeTab, setActiveTab] = useState('backlog') // 'backlog', 'sprints', 'board'
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  const [showSprintModal, setShowSprintModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingSprint, setEditingSprint] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [selectedSprint, setSelectedSprint] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [viewingTask, setViewingTask] = useState(null)
  const [viewingMedia, setViewingMedia] = useState(null)

  // Documentos de teste pendentes/reprovados que ainda não foram importados
  const pendingTestDocs = useMemo(() => {
    const importedSourceIds = tasks.filter(t => t.sourceType === 'test_document').map(t => t.sourceId)
    return testDocuments.filter(doc => 
      (doc.status === 'pendente' || doc.status === 'reprovado') &&
      !importedSourceIds.includes(doc.id)
    )
  }, [testDocuments, tasks])

  // Enriquecer tasks com sourceData atualizado dos testDocuments
  const enrichedTasks = useMemo(() => {
    return tasks.map(task => {
      if (task.sourceType === 'test_document' && task.sourceId) {
        const testDoc = testDocuments.find(d => d.id === task.sourceId)
        if (testDoc) {
          return {
            ...task,
            sourceData: {
              ...task.sourceData,
              comments: testDoc.comments || [],
              status: testDoc.status,
              screenshots: testDoc.screenshots || []
            }
          }
        }
      }
      return task
    })
  }, [tasks, testDocuments])

  // Tarefas do backlog (sem sprint)
  const backlogTasks = useMemo(() => {
    return enrichedTasks.filter(t => !t.sprintId)
  }, [enrichedTasks])

  // Tarefas filtradas
  const filteredTasks = useMemo(() => {
    let filtered = activeTab === 'backlog' ? backlogTasks : 
                   selectedSprint ? enrichedTasks.filter(t => t.sprintId === selectedSprint.id) : enrichedTasks
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(t => 
        t.title?.toLowerCase().includes(term) ||
        t.description?.toLowerCase().includes(term)
      )
    }
    if (filterType) filtered = filtered.filter(t => t.type === filterType)
    if (filterStatus) filtered = filtered.filter(t => t.status === filterStatus)
    if (filterPriority) filtered = filtered.filter(t => t.priority === filterPriority)
    
    return filtered
  }, [enrichedTasks, backlogTasks, activeTab, selectedSprint, searchTerm, filterType, filterStatus, filterPriority])

  // Estatísticas - mostrar apenas tarefas relevantes para a aba/sprint atual
  const stats = useMemo(() => {
    let targetTasks = []
    
    if (activeTab === 'backlog') {
      // Na aba backlog, mostrar apenas tarefas sem sprint
      targetTasks = backlogTasks
    } else if (selectedSprint) {
      // Na aba sprints com sprint selecionada, mostrar tarefas da sprint
      targetTasks = enrichedTasks.filter(t => t.sprintId === selectedSprint.id)
    } else {
      // Na aba sprints sem sprint selecionada, mostrar tarefas que estão em alguma sprint
      targetTasks = enrichedTasks.filter(t => t.sprintId)
    }
    
    return {
      total: targetTasks.length,
      bugs: targetTasks.filter(t => t.type === 'bug').length,
      businessRules: targetTasks.filter(t => t.type === 'business_rule').length,
      improvements: targetTasks.filter(t => t.type === 'improvement').length,
      pending: targetTasks.filter(t => t.status === 'pending').length,
      inProgress: targetTasks.filter(t => t.status === 'in_progress').length,
      done: targetTasks.filter(t => t.status === 'done').length
    }
  }, [enrichedTasks, backlogTasks, activeTab, selectedSprint])

  // Sprint ativa
  const activeSprint = useMemo(() => {
    return sprints.find(s => s.status === 'active')
  }, [sprints])

  const handleCreateSprint = () => {
    setEditingSprint(null)
    setShowSprintModal(true)
  }

  const handleEditSprint = (sprint) => {
    setEditingSprint(sprint)
    setShowSprintModal(true)
  }

  const handleCreateTask = () => {
    setEditingTask(null)
    setShowTaskModal(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskModal(true)
  }

  const handleMoveToSprint = async (taskId, sprintId) => {
    try {
      await onUpdateTask(taskId, { sprintId })
    } catch (error) {
      console.error('Erro ao mover tarefa:', error)
    }
  }

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await onUpdateTask(taskId, { status: newStatus })
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
    }
  }

  const handleRequestRetest = async (task) => {
    if (!task.sourceId || task.sourceType !== 'test_document') {
      alert('Esta tarefa não está vinculada a um documento de teste.')
      return
    }
    
    if (!window.confirm('Deseja solicitar reteste para esta tarefa? O documento de teste será atualizado para "Em Reteste".')) {
      return
    }

    setLoading(true)
    try {
      await onRequestRetest(task)
      alert('Reteste solicitado com sucesso! O QA será notificado.')
    } catch (error) {
      console.error('Erro ao solicitar reteste:', error)
      alert('Erro ao solicitar reteste. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilterType('')
    setFilterStatus('')
    setFilterPriority('')
  }

  const hasFilters = searchTerm || filterType || filterStatus || filterPriority

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Sprints</h1>
          <p className="text-gray-600">Gerencie tarefas de correção e melhorias</p>
        </div>
        <div className="flex gap-2">
          {pendingTestDocs.length > 0 && (
            <button onClick={() => setShowImportModal(true)} className="btn-secondary flex items-center gap-2 bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100">
              <Download className="w-4 h-4" />
              Importar Testes ({pendingTestDocs.length})
            </button>
          )}
          <button onClick={handleCreateTask} className="btn-secondary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </button>
          <button onClick={handleCreateSprint} className="btn-primary flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Nova Sprint
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => { setActiveTab('backlog'); setSelectedSprint(null) }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'backlog' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Backlog ({backlogTasks.length})
        </button>
        <button
          onClick={() => setActiveTab('sprints')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'sprints' 
              ? 'border-primary-500 text-primary-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Sprints ({sprints.length})
        </button>
        {activeSprint && (
          <button
            onClick={() => { setActiveTab('board'); setSelectedSprint(activeSprint) }}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'board' 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Sprint Ativa
            </span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Bug className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.bugs}</p>
              <p className="text-xs text-gray-500">Bugs</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{stats.businessRules}</p>
              <p className="text-xs text-gray-500">Regras</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.improvements}</p>
              <p className="text-xs text-gray-500">Melhorias</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
              <p className="text-xs text-gray-500">Pendentes</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Play className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              <p className="text-xs text-gray-500">Em Andamento</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.done}</p>
              <p className="text-xs text-gray-500">Concluídos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'sprints' ? (
        <SprintsList 
          sprints={sprints}
          tasks={tasks}
          onEdit={handleEditSprint}
          onDelete={onDeleteSprint}
          onSelect={(sprint) => { setSelectedSprint(sprint); setActiveTab('backlog') }}
        />
      ) : activeTab === 'board' && selectedSprint ? (
        <KanbanBoard
          sprint={selectedSprint}
          tasks={tasks.filter(t => t.sprintId === selectedSprint.id)}
          onUpdateStatus={handleUpdateTaskStatus}
          onEditTask={handleEditTask}
        />
      ) : (
        <>
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
                  className="input-field w-full pl-10"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input-field"
              >
                <option value="">Todos os Tipos</option>
                {Object.entries(TASK_TYPES).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field"
              >
                <option value="">Todos os Status</option>
                {Object.entries(TASK_STATUS).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="input-field"
              >
                <option value="">Todas as Prioridades</option>
                {Object.entries(PRIORITY_COLORS).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
              {hasFilters && (
                <button onClick={clearFilters} className="btn-secondary whitespace-nowrap">
                  Limpar Filtros
                </button>
              )}
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="card p-12 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma tarefa encontrada</h3>
                <p className="text-gray-500 mb-4">
                  {hasFilters ? 'Tente ajustar os filtros' : 'Crie uma nova tarefa para começar'}
                </p>
                {!hasFilters && (
                  <button onClick={handleCreateTask} className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Tarefa
                  </button>
                )}
              </div>
            ) : (
              filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  sprints={sprints}
                  users={users}
                  onView={() => setViewingTask(task)}
                  onEdit={() => handleEditTask(task)}
                  onDelete={() => onDeleteTask(task.id)}
                  onMoveToSprint={handleMoveToSprint}
                  onUpdateStatus={handleUpdateTaskStatus}
                  onRequestRetest={handleRequestRetest}
                />
              ))
            )}
          </div>
        </>
      )}

      {/* Sprint Modal */}
      {showSprintModal && (
        <SprintModal
          sprint={editingSprint}
          onSave={async (data) => {
            setLoading(true)
            try {
              if (editingSprint) {
                await onUpdateSprint(editingSprint.id, data)
              } else {
                await onCreateSprint(data)
              }
              setShowSprintModal(false)
            } catch (error) {
              console.error('Erro ao salvar sprint:', error)
            } finally {
              setLoading(false)
            }
          }}
          onClose={() => setShowSprintModal(false)}
          loading={loading}
        />
      )}

      {/* Task Modal */}
      {showTaskModal && (
        <TaskModal
          task={editingTask}
          sprints={sprints}
          users={users}
          onSave={async (data) => {
            setLoading(true)
            try {
              if (editingTask) {
                await onUpdateTask(editingTask.id, data)
              } else {
                await onCreateTask(data)
              }
              setShowTaskModal(false)
            } catch (error) {
              console.error('Erro ao salvar tarefa:', error)
            } finally {
              setLoading(false)
            }
          }}
          onClose={() => setShowTaskModal(false)}
          loading={loading}
        />
      )}

      {/* Import Test Documents Modal */}
      {showImportModal && (
        <ImportTestDocsModal
          testDocs={pendingTestDocs}
          users={users}
          onImport={async (doc, taskType, assigneeId) => {
            setLoading(true)
            try {
              await onImportFromTestDocument(doc, taskType, assigneeId)
            } catch (error) {
              console.error('Erro ao importar documento:', error)
            } finally {
              setLoading(false)
            }
          }}
          onClose={() => setShowImportModal(false)}
          loading={loading}
        />
      )}

      {/* Task View Modal */}
      {viewingTask && (
        <TaskViewModal
          task={viewingTask}
          users={users}
          currentUser={currentUser}
          onClose={() => setViewingTask(null)}
          onEdit={() => { setEditingTask(viewingTask); setShowTaskModal(true); setViewingTask(null) }}
          onViewMedia={(media, index) => setViewingMedia({ media, index })}
          onAddComment={onAddTaskComment}
          onUploadEvidence={onUploadTaskEvidence}
          onRequestRetest={onRequestRetest}
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

// Componente de Card de Tarefa
function TaskCard({ task, sprints, users, onView, onEdit, onDelete, onMoveToSprint, onUpdateStatus, onRequestRetest }) {
  const [showMenu, setShowMenu] = useState(false)
  const typeStyle = TASK_TYPES[task.type] || TASK_TYPES.bug
  const statusStyle = TASK_STATUS[task.status] || TASK_STATUS.pending
  const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
  const TypeIcon = typeStyle.icon
  const assigneeUser = users?.find(u => u.id === task.assignee)
  const hasEvidences = task.sourceData?.screenshots?.length > 0

  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${typeStyle.bg}`}>
          <TypeIcon className={`w-5 h-5 ${typeStyle.text}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="cursor-pointer" onClick={onView}>
              <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">{task.title}</h3>
              {task.description && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={onView} className="p-1 hover:bg-gray-100 rounded" title="Visualizar">
                <Eye className="w-5 h-5 text-gray-400" />
              </button>
              <div className="relative">
                <button onClick={() => setShowMenu(!showMenu)} className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border py-1 z-10 min-w-[160px]">
                    <button
                      onClick={() => { onEdit(); setShowMenu(false) }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </button>
                    {sprints.length > 0 && (
                      <div className="border-t my-1">
                        <p className="px-4 py-1 text-xs text-gray-500">Mover para Sprint</p>
                        {sprints.filter(s => s.status !== 'completed').map(sprint => (
                          <button
                            key={sprint.id}
                            onClick={() => { onMoveToSprint(task.id, sprint.id); setShowMenu(false) }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                          >
                            <ArrowRight className="w-4 h-4" />
                            {sprint.name}
                          </button>
                        ))}
                        {task.sprintId && (
                          <button
                            onClick={() => { onMoveToSprint(task.id, null); setShowMenu(false) }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-orange-600"
                          >
                            <ArrowRight className="w-4 h-4" />
                            Voltar ao Backlog
                          </button>
                        )}
                      </div>
                    )}
                    {task.sourceType === 'test_document' && task.status !== 'done' && (
                      <>
                        <div className="border-t my-1"></div>
                        <button
                          onClick={() => { onRequestRetest(task); setShowMenu(false) }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-green-50 text-green-600 flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Solicitar Reteste
                        </button>
                      </>
                    )}
                    <div className="border-t my-1"></div>
                    <button
                      onClick={() => { 
                        if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
                          onDelete()
                        }
                        setShowMenu(false) 
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}>
              {typeStyle.label}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
              {priorityStyle.label}
            </span>
            <select
              value={task.status}
              onChange={(e) => onUpdateStatus(task.id, e.target.value)}
              className={`px-2 py-0.5 rounded-full text-xs font-medium border-0 cursor-pointer ${statusStyle.bg} ${statusStyle.text}`}
            >
              {Object.entries(TASK_STATUS).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
            {task.sourceType && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                <Link2 className="w-3 h-3" />
                {task.sourceType === 'test_document' ? 'Registro de Teste' : 'Caso de Teste'}
              </span>
            )}
            {hasEvidences && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600 flex items-center gap-1">
                <Image className="w-3 h-3" />
                {task.sourceData.screenshots.length} evidência(s)
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            {assigneeUser && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {assigneeUser.displayName || assigneeUser.name || assigneeUser.email}
              </span>
            )}
            {!assigneeUser && task.assignee && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {task.assignee}
              </span>
            )}
            {task.createdAt && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(task.createdAt).toLocaleDateString('pt-BR')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Lista de Sprints
function SprintsList({ sprints, tasks, onEdit, onDelete, onSelect }) {
  if (sprints.length === 0) {
    return (
      <div className="card p-12 text-center">
        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma sprint criada</h3>
        <p className="text-gray-500">Crie uma sprint para organizar suas tarefas</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sprints.map(sprint => {
        const sprintTasks = tasks.filter(t => t.sprintId === sprint.id)
        const doneTasks = sprintTasks.filter(t => t.status === 'done').length
        const progress = sprintTasks.length > 0 ? Math.round((doneTasks / sprintTasks.length) * 100) : 0
        const statusStyle = SPRINT_STATUS[sprint.status] || SPRINT_STATUS.planning

        return (
          <div key={sprint.id} className="card p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                  {statusStyle.label}
                </span>
                <h3 className="font-medium text-gray-900 mt-2">{sprint.name}</h3>
              </div>
              <div className="flex gap-1">
                <button onClick={() => onEdit(sprint)} className="p-1 hover:bg-gray-100 rounded">
                  <Edit2 className="w-4 h-4 text-gray-400" />
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm('Tem certeza que deseja excluir esta sprint?')) {
                      onDelete(sprint.id)
                    }
                  }} 
                  className="p-1 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            {sprint.goal && (
              <p className="text-sm text-gray-500 mb-3">{sprint.goal}</p>
            )}

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Calendar className="w-4 h-4" />
              {sprint.startDate && new Date(sprint.startDate).toLocaleDateString('pt-BR')}
              {sprint.endDate && ` - ${new Date(sprint.endDate).toLocaleDateString('pt-BR')}`}
            </div>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">{doneTasks} de {sprintTasks.length} tarefas</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button 
              onClick={() => onSelect(sprint)}
              className="w-full btn-secondary text-sm"
            >
              Ver Tarefas ({sprintTasks.length})
            </button>
          </div>
        )
      })}
    </div>
  )
}

// Kanban Board
function KanbanBoard({ sprint, tasks, onUpdateStatus, onEditTask }) {
  const columns = [
    { id: 'pending', label: 'Pendente', color: 'gray' },
    { id: 'in_progress', label: 'Em Andamento', color: 'blue' },
    { id: 'in_review', label: 'Em Revisão', color: 'yellow' },
    { id: 'done', label: 'Concluído', color: 'green' }
  ]

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">{sprint.name}</h2>
        {sprint.goal && <p className="text-gray-500">{sprint.goal}</p>}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {columns.map(column => {
          const columnTasks = tasks.filter(t => t.status === column.id)
          return (
            <div key={column.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-700">{column.label}</h3>
                <span className="text-sm text-gray-500">{columnTasks.length}</span>
              </div>
              <div className="space-y-2">
                {columnTasks.map(task => {
                  const typeStyle = TASK_TYPES[task.type] || TASK_TYPES.bug
                  const TypeIcon = typeStyle.icon
                  return (
                    <div 
                      key={task.id} 
                      className="bg-white p-3 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => onEditTask(task)}
                    >
                      <div className="flex items-start gap-2">
                        <TypeIcon className={`w-4 h-4 ${typeStyle.text} flex-shrink-0 mt-0.5`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                          {task.assignee && (
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {task.assignee.name || task.assignee}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Modal de Sprint
function SprintModal({ sprint, onSave, onClose, loading }) {
  const [name, setName] = useState(sprint?.name || '')
  const [goal, setGoal] = useState(sprint?.goal || '')
  const [startDate, setStartDate] = useState(sprint?.startDate || '')
  const [endDate, setEndDate] = useState(sprint?.endDate || '')
  const [status, setStatus] = useState(sprint?.status || 'planning')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name, goal, startDate, endDate, status })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {sprint ? 'Editar Sprint' : 'Nova Sprint'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field w-full"
              placeholder="Ex: Sprint 1 - Janeiro"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="input-field w-full"
              rows={2}
              placeholder="Descreva o objetivo desta sprint..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Início</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Fim</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-field w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input-field w-full"
            >
              {Object.entries(SPRINT_STATUS).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>
        </form>
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading || !name.trim()}
            className="btn-primary"
          >
            {loading ? 'Salvando...' : sprint ? 'Salvar' : 'Criar Sprint'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Modal de Tarefa
function TaskModal({ task, sprints, users, onSave, onClose, loading }) {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [type, setType] = useState(task?.type || 'bug')
  const [status, setStatus] = useState(task?.status || 'pending')
  const [priority, setPriority] = useState(task?.priority || 'medium')
  const [sprintId, setSprintId] = useState(task?.sprintId || '')
  const [assignee, setAssignee] = useState(task?.assignee || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSave({ 
      title, 
      description, 
      type, 
      status, 
      priority, 
      sprintId: sprintId || null,
      assignee: assignee || null
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {task ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field w-full"
              placeholder="Descreva a tarefa..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field w-full"
              rows={3}
              placeholder="Detalhes da tarefa..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-field w-full"
              >
                {Object.entries(TASK_TYPES).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="input-field w-full"
              >
                {Object.entries(PRIORITY_COLORS).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="input-field w-full"
              >
                {Object.entries(TASK_STATUS).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sprint</label>
              <select
                value={sprintId}
                onChange={(e) => setSprintId(e.target.value)}
                className="input-field w-full"
              >
                <option value="">Backlog (sem sprint)</option>
                {sprints.filter(s => s.status !== 'completed').map(sprint => (
                  <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
                ))}
              </select>
            </div>
          </div>
          {users.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="input-field w-full"
              >
                <option value="">Não atribuído</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.displayName || user.name || user.email}</option>
                ))}
              </select>
            </div>
          )}

          {/* Source info (read-only) */}
          {task?.sourceType && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 mb-1">Origem</p>
              <p className="text-sm text-gray-700">
                {task.sourceType === 'test_document' ? 'Registro de Teste' : 'Execução de Caso de Teste'}
              </p>
              {task.sourceData?.funcionalidade && (
                <p className="text-xs text-gray-500 mt-1">
                  Funcionalidade: {task.sourceData.funcionalidade}
                </p>
              )}
            </div>
          )}
        </form>
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading || !title.trim()}
            className="btn-primary"
          >
            {loading ? 'Salvando...' : task ? 'Salvar' : 'Criar Tarefa'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Modal para importar documentos de teste
function ImportTestDocsModal({ testDocs, users, onImport, onClose, loading }) {
  const [selectedDocs, setSelectedDocs] = useState([])
  const [assignees, setAssignees] = useState({})
  const [taskTypes, setTaskTypes] = useState({})

  const toggleDoc = (docId) => {
    setSelectedDocs(prev => 
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    )
  }

  const selectAll = () => {
    if (selectedDocs.length === testDocs.length) {
      setSelectedDocs([])
    } else {
      setSelectedDocs(testDocs.map(d => d.id))
    }
  }

  const handleImport = async () => {
    for (const docId of selectedDocs) {
      const doc = testDocs.find(d => d.id === docId)
      if (doc) {
        const taskType = taskTypes[docId] || (doc.category === 'regra_negocio' ? 'business_rule' : doc.category === 'melhoria' ? 'improvement' : 'bug')
        const assigneeId = assignees[docId] || null
        await onImport(doc, taskType, assigneeId)
      }
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full shadow-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Importar Documentos de Teste</h2>
          <p className="text-gray-500 text-sm mt-1">
            Selecione os documentos pendentes/reprovados para criar tarefas no backlog
          </p>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          {/* Select All */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDocs.length === testDocs.length && testDocs.length > 0}
                onChange={selectAll}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Selecionar todos ({testDocs.length})
              </span>
            </label>
            <span className="text-sm text-gray-500">
              {selectedDocs.length} selecionado(s)
            </span>
          </div>

          {/* Documents List */}
          <div className="space-y-3">
            {testDocs.map(doc => {
              const isSelected = selectedDocs.includes(doc.id)
              const hasScreenshots = doc.screenshots?.length > 0
              
              return (
                <div 
                  key={doc.id} 
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleDoc(doc.id)}
                      className="w-4 h-4 mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.title || doc.feature || 'Sem título'}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {doc.module && <span className="mr-2">Módulo: {doc.module}</span>}
                            {doc.tester && <span>Testador: {doc.tester}</span>}
                          </p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          doc.status === 'reprovado' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {doc.status === 'reprovado' ? 'Reprovado' : 'Pendente'}
                        </span>
                      </div>
                      
                      {doc.observations && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{doc.observations}</p>
                      )}

                      {/* Screenshots preview */}
                      {hasScreenshots && (
                        <div className="flex items-center gap-2 mt-2">
                          <Image className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">{doc.screenshots.length} evidência(s)</span>
                          <div className="flex gap-1">
                            {doc.screenshots.slice(0, 3).map((ss, i) => (
                              <img key={i} src={ss.url} alt="" className="w-8 h-8 object-cover rounded" />
                            ))}
                            {doc.screenshots.length > 3 && (
                              <span className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                +{doc.screenshots.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Options when selected */}
                      {isSelected && (
                        <div className="flex gap-4 mt-3 pt-3 border-t border-primary-200">
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Tipo de Tarefa</label>
                            <select
                              value={taskTypes[doc.id] || (doc.category === 'regra_negocio' ? 'business_rule' : doc.category === 'melhoria' ? 'improvement' : 'bug')}
                              onChange={(e) => setTaskTypes(prev => ({ ...prev, [doc.id]: e.target.value }))}
                              className="input-field w-full text-sm py-1"
                            >
                              <option value="bug">Bug</option>
                              <option value="business_rule">Regra de Negócio</option>
                              <option value="improvement">Melhoria</option>
                            </select>
                          </div>
                          {users.length > 0 && (
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-gray-600 mb-1">Atribuir para</label>
                              <select
                                value={assignees[doc.id] || ''}
                                onChange={(e) => setAssignees(prev => ({ ...prev, [doc.id]: e.target.value }))}
                                className="input-field w-full text-sm py-1"
                              >
                                <option value="">Não atribuído</option>
                                {users.map(user => (
                                  <option key={user.id} value={user.id}>{user.name || user.email}</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-between">
          <button onClick={onClose} className="btn-secondary">
            Cancelar
          </button>
          <button 
            onClick={handleImport}
            disabled={loading || selectedDocs.length === 0}
            className="btn-primary flex items-center gap-2"
          >
            {loading ? (
              <>Importando...</>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Importar {selectedDocs.length} Tarefa(s)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Modal para visualizar detalhes da tarefa
function TaskViewModal({ task, users, onClose, onEdit, onViewMedia, onAddComment, onRequestRetest, onUploadEvidence, currentUser, onAddNotification, onUpdateDocumentStatus }) {
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [localSourceComments, setLocalSourceComments] = useState(task.sourceData?.comments || [])
  const [localDocumentStatus, setLocalDocumentStatus] = useState(task.sourceData?.status || 'pendente')
  
  useEffect(() => {
    setLocalSourceComments(task.sourceData?.comments || [])
    setLocalDocumentStatus(task.sourceData?.status || 'pendente')
  }, [task.sourceData?.comments, task.sourceData?.status])
  
  const typeStyle = TASK_TYPES[task.type] || TASK_TYPES.bug
  const statusStyle = TASK_STATUS[task.status] || TASK_STATUS.pending
  const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
  const TypeIcon = typeStyle.icon
  
  const assigneeUser = users.find(u => u.id === task.assignee)
  const screenshots = task.sourceData?.screenshots || []
  const devEvidences = task.devEvidences || []
  const comments = task.comments || []
  const sourceData = task.sourceData || {}

  const handleAddComment = async () => {
    if (!newComment.trim() || !onAddComment) return
    setSubmitting(true)
    try {
      await onAddComment(task.id, {
        text: newComment.trim(),
        author: currentUser?.name || currentUser?.email || 'Dev',
        authorId: currentUser?.id || currentUser?.uid,
        createdAt: new Date().toISOString()
      })
      setNewComment('')
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error)
      alert('Erro ao adicionar comentário')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUploadEvidence = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !onUploadEvidence) return
    
    setUploading(true)
    try {
      await onUploadEvidence(task.id, file)
    } catch (error) {
      console.error('Erro ao enviar evidência:', error)
      alert('Erro ao enviar evidência')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleRequestRetest = async () => {
    if (!onRequestRetest) return
    if (!window.confirm('Deseja solicitar reteste? O QA será notificado para validar a correção.')) return
    
    setSubmitting(true)
    try {
      await onRequestRetest(task)
      alert('Reteste solicitado com sucesso!')
      onClose()
    } catch (error) {
      console.error('Erro ao solicitar reteste:', error)
      alert('Erro ao solicitar reteste')
    } finally {
      setSubmitting(false)
    }
  }

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
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}>
                    {typeStyle.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
                    {priorityStyle.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                    {statusStyle.label}
                  </span>
                  {sourceData.jiraKey && (
                    <a 
                      href={sourceData.jiraUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {sourceData.jiraKey}
                    </a>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{task.title}</h2>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <XCircle className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          {task.description && (
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Descrição Completa</label>
              <div className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg text-sm">
                {task.description}
              </div>
            </div>
          )}

          {/* Meta info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {assigneeUser && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Responsável</label>
                <p className="text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  {assigneeUser.displayName || assigneeUser.name || assigneeUser.email}
                </p>
              </div>
            )}
            {task.createdBy && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Criado por</label>
                <p className="text-gray-900">{task.createdBy}</p>
              </div>
            )}
            {task.createdAt && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Criado em</label>
                <p className="text-gray-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {new Date(task.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            )}
          </div>

          {/* Screenshots/Evidences */}
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
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center hover:bg-black/50 transition-colors">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                        <span className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">Vídeo</span>
                      </div>
                    ) : (
                      <img 
                        src={ss.url} 
                        alt={ss.name || `Evidência ${index + 1}`} 
                        className="w-24 h-24 object-cover rounded-lg border hover:opacity-80 transition-opacity" 
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Evidências do Dev */}
          {devEvidences.length > 0 && (
            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">
                🔧 Evidências da Correção ({devEvidences.length})
              </label>
              <div className="flex flex-wrap gap-3">
                {devEvidences.map((ev, index) => (
                  <button
                    key={index}
                    onClick={() => onViewMedia(devEvidences.map(e => ({ 
                      url: e.url, 
                      type: e.type || 'image', 
                      name: e.name 
                    })), index)}
                    className="relative group cursor-pointer"
                  >
                    {ev.type === 'video' ? (
                      <div className="relative w-24 h-24">
                        <video src={ev.url} className="w-24 h-24 object-cover rounded-lg border" />
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={ev.url} 
                        alt={ev.name || `Evidência ${index + 1}`} 
                        className="w-24 h-24 object-cover rounded-lg border hover:opacity-80 transition-opacity" 
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Seção de Comentários Completa */}
          {task.sourceType === 'test_document' && task.sourceId && (
            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">
                💬 Interações e Comentários
              </label>
              <CommentsSection
                documentId={task.sourceId}
                comments={localSourceComments}
                status={localDocumentStatus}
                users={users}
                currentUser={currentUser}
                onAddNotification={onAddNotification}
                onUpdateStatus={async (newStatus) => {
                  if (onUpdateDocumentStatus) {
                    await onUpdateDocumentStatus(task.sourceId, newStatus)
                    setLocalDocumentStatus(newStatus)
                  }
                }}
                onCommentAdded={(comment) => {
                  setLocalSourceComments(prev => [...prev, comment])
                }}
                onCommentEdited={(commentId, updatedData) => {
                  setLocalSourceComments(prev => prev.map(c => 
                    c.id === commentId ? { ...c, ...updatedData } : c
                  ))
                }}
                onReactionToggled={(commentId, reaction, userId, userName) => {
                  setLocalSourceComments(prev => prev.map(c => {
                    if (c.id !== commentId) return c
                    const reactions = c.reactions || []
                    const existingIndex = reactions.findIndex(
                      r => r.type === reaction.type && r.value === reaction.value && r.userId === userId
                    )
                    let newReactions
                    if (existingIndex >= 0) {
                      newReactions = reactions.filter((_, idx) => idx !== existingIndex)
                    } else {
                      newReactions = [...reactions, { ...reaction, userId, userName, createdAt: new Date().toISOString() }]
                    }
                    return { ...c, reactions: newReactions }
                  }))
                }}
              />
            </div>
          )}

          {/* Comentários simples para tarefas sem documento de teste */}
          {(!task.sourceType || task.sourceType !== 'test_document') && (
            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">
                💬 Comentários ({comments.length})
              </label>
              
              {comments.length > 0 && (
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {comments.map((comment, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {onAddComment && task.status !== 'done' && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Adicionar comentário..."
                    className="flex-1 input-field text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || submitting}
                    className="btn-secondary px-4"
                  >
                    {submitting ? '...' : 'Enviar'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-between">
          <button onClick={onEdit} className="btn-secondary flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Editar
          </button>
          <button onClick={onClose} className="btn-primary">
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
