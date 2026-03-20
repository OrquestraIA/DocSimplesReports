import { useState, useMemo, useEffect, useRef } from 'react'
import { 
  Plus, Search, Filter, Calendar, Clock, CheckCircle, XCircle, 
  AlertTriangle, Bug, Lightbulb, FileText, ChevronDown, ChevronRight,
  Edit2, Trash2, User, Tag, MoreVertical, Play, Pause, Target,
  ArrowRight, Link2, Eye, Download, Image, Video, ExternalLink, Upload, Loader2,
  Smile, AtSign, Sparkles
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import MediaViewer from '../components/MediaViewer'
import CommentsSection from '../components/CommentsSection'
import UploadLoading from '../components/UploadLoading'
import { useToast } from '../components/Toast'
import ReactionPicker, { ReactionDisplay } from '../components/ReactionPicker'
import { renderTextWithMentions } from '../components/MentionInput'
import AIService from '../services/aiService' // Usando IA real

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
  requirements = [],
  onCreateSprint,
  onUpdateSprint,
  onDeleteSprint,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onImportFromTestDocument,
  onRequestRetest,
  onAddTaskComment,
  onToggleTaskReaction,
  onUploadTaskEvidence,
  onDeleteTaskEvidence,
  onAddNotification,
  onUpdateDocumentStatus,
  onUpdateRequirement,
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
  
  // Estados para IA
  const [showAIModal, setShowAIModal] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiTaskDescription, setAiTaskDescription] = useState('')
  const [aiTaskType, setAiTaskType] = useState('improvement')
  const [aiTaskPriority, setAiTaskPriority] = useState('medium')

  // Documentos de teste pendentes/reprovados que ainda não foram importados
  const pendingTestDocs = useMemo(() => {
    const importedSourceIds = tasks.filter(t => t.sourceType === 'test_document').map(t => t.sourceId)
    return testDocuments.filter(doc => 
      (doc.status === 'pendente' || doc.status === 'reprovado') &&
      !importedSourceIds.includes(doc.id)
    )
  }, [testDocuments, tasks])

  // Tarefas em triagem QA não aparecem em Sprints — ficam só no espaço QA
  const sprintEligibleTasks = useMemo(() => {
    return tasks.filter(t => !(t.sourceType === 'test_document' && t.workspace === 'qa' && t.status === 'pending'))
  }, [tasks])

  // Enriquecer tasks com sourceData atualizado dos testDocuments
  const enrichedTasks = useMemo(() => {
    return sprintEligibleTasks.map(task => {
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

  // Função para criar tarefa com IA
  const handleAIGenerateTask = async () => {
    if (!aiTaskDescription.trim()) {
      alert('Por favor, descreva a tarefa que deseja criar.')
      return
    }

    setAiGenerating(true)
    setLoading(true)

    try {
      // Gerar detalhes da tarefa com IA
      const aiResponse = await AIService.generateTaskDetails({
        description: aiTaskDescription,
        type: aiTaskType,
        priority: aiTaskPriority,
        existingTasks: tasks.slice(0, 5) // Contexto das últimas tarefas
      })

      // Criar tarefa com dados da IA
      await onCreateTask({
        title: aiResponse.title,
        description: aiResponse.description,
        type: aiTaskType,
        priority: aiTaskPriority,
        status: 'pending',
        assignee: currentUser?.id || null,
        createdBy: currentUser?.id || 'system',
        tags: aiResponse.tags || [],
        estimatedHours: aiResponse.estimatedHours || 4,
        sprintId: selectedSprint?.id || null
      })

      setShowAIModal(false)
      setAiTaskDescription('')
      setAiTaskType('improvement')
      setAiTaskPriority('medium')
      
      alert('Tarefa criada com sucesso usando IA!')
    } catch (error) {
      console.error('Erro ao criar tarefa com IA:', error)
      alert('Erro ao criar tarefa com IA. Tente novamente.')
    } finally {
      setAiGenerating(false)
      setLoading(false)
    }
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
      {loading && <LoadingSpinner />}
      
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
          <button onClick={() => setShowAIModal(true)} className="btn-secondary flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white">
            <Sparkles className="w-4 h-4" />
            Gerar com IA
          </button>
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
              if (editingTask && editingTask.id) {
                await onUpdateTask(editingTask.id, data)
              } else {
                await onCreateTask(data)
              }
              setShowTaskModal(false)
              setEditingTask(null)
            } catch (error) {
              console.error('Erro ao salvar tarefa:', error)
            } finally {
              setLoading(false)
            }
          }}
          onClose={() => {
            setShowTaskModal(false)
            setEditingTask(null)
          }}
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
          onToggleReaction={onToggleTaskReaction}
          onUploadEvidence={onUploadTaskEvidence}
          onDeleteEvidence={onDeleteTaskEvidence}
          onRequestRetest={onRequestRetest}
          onAddNotification={onAddNotification}
          onUpdateDocumentStatus={onUpdateDocumentStatus}
          onUpdateTask={onUpdateTask}
          requirements={requirements}
          testDocuments={testDocuments}
          onUpdateRequirement={onUpdateRequirement}
        />
      )}

      {/* AI Task Generation Modal */}
      <AITaskGenerationModal
        show={showAIModal}
        onClose={() => {
          setShowAIModal(false)
          setAiTaskDescription('')
          setAiTaskType('improvement')
          setAiTaskPriority('medium')
        }}
        onGenerate={handleAIGenerateTask}
        generating={aiGenerating}
        description={aiTaskDescription}
        setDescription={setAiTaskDescription}
        taskType={aiTaskType}
        setTaskType={setAiTaskType}
        priority={aiTaskPriority}
        setPriority={setAiTaskPriority}
      />

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
            {task.reviewStage === 'para_correcao' && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                ⚠️ Para Correção
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
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('bug')
  const [status, setStatus] = useState('pending')
  const [priority, setPriority] = useState('medium')
  const [sprintId, setSprintId] = useState('')
  const [assignee, setAssignee] = useState('')
  const [screenshots, setScreenshots] = useState([])
  const [attachments, setAttachments] = useState([])
  const [viewingMedia, setViewingMedia] = useState(null)

  // Atualizar estados quando a tarefa mudar
  useEffect(() => {
    if (task) {
      setTitle(task.title || '')
      setDescription(task.description || '')
      setType(task.type || 'bug')
      setStatus(task.status || 'pending')
      setPriority(task.priority || 'medium')
      setSprintId(task.sprintId || '')
      setAssignee(task.assignee || '')
      setScreenshots(task.screenshots || [])
      // Buscar attachments no campo direto ou em sourceData.evidences (fallback para tarefas antigas)
      setAttachments(task.attachments || task.sourceData?.evidences || [])
    } else {
      setTitle('')
      setDescription('')
      setType('bug')
      setStatus('pending')
      setPriority('medium')
      setSprintId('')
      setAssignee('')
      setScreenshots([])
      setAttachments([])
    }
  }, [task])

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
      assignee: assignee || null,
      screenshots,
      attachments
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

          {/* Evidências de Falha do Teste */}
          {attachments.length > 0 && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-xs font-medium text-red-700 mb-2">
                ❌ Evidências da Falha no Teste ({attachments.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {attachments.map((att, index) => (
                  <div key={index} className="relative group">
                    <button
                      type="button"
                      onClick={() => setViewingMedia({ media: attachments, index })}
                      className="block"
                    >
                      {att.type === 'video' ? (
                        <div className="relative w-16 h-16">
                          <video src={att.url} className="w-16 h-16 object-cover rounded border-2 border-red-300" />
                          <div className="absolute inset-0 bg-black/40 rounded flex items-center justify-center">
                            <Video className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      ) : (
                        <img src={att.url} alt="" className="w-16 h-16 object-cover rounded border-2 border-red-300" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <XCircle className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Screenshots */}
          {screenshots.length > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-medium text-blue-700 mb-2">
                📸 Evidências Adicionais ({screenshots.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {screenshots.map((ss, index) => (
                  <div key={index} className="relative group">
                    <button
                      type="button"
                      onClick={() => setViewingMedia({ media: screenshots, index })}
                      className="block"
                    >
                      {ss.type === 'video' ? (
                        <div className="relative w-16 h-16">
                          <video src={ss.url} className="w-16 h-16 object-cover rounded border border-blue-300" />
                          <div className="absolute inset-0 bg-black/40 rounded flex items-center justify-center">
                            <Video className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      ) : (
                        <img src={ss.url} alt="" className="w-16 h-16 object-cover rounded border border-blue-300" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setScreenshots(prev => prev.filter((_, i) => i !== index))}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <XCircle className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
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

// Modal para geração de tarefas com IA
function AITaskGenerationModal({ 
  show, 
  onClose, 
  onGenerate, 
  generating, 
  description, 
  setDescription,
  taskType,
  setTaskType,
  priority,
  setPriority
}) {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl my-8">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Criar Tarefa com IA</h2>
              <p className="text-sm text-gray-600">Descreva a tarefa e a IA criará detalhes automaticamente</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo da Tarefa
            </label>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
              className="input-field w-full"
            >
              <option value="improvement">Melhoria</option>
              <option value="bug">Bug</option>
              <option value="business_rule">Regra de Negócio</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridade
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="input-field w-full"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
              <option value="critical">Crítica</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição da Tarefa *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field w-full"
              rows={6}
              placeholder="Descreva detalhadamente o que precisa ser feito:

Exemplo: Preciso melhorar a performance da tela de relatórios que está demorando mais de 10 segundos para carregar quando há muitos filtros aplicados. O usuário consegue ver o loading mas a experiência não é boa."
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Seja específico para melhores resultados. A IA criará título, descrição detalhada e estimativas.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-medium text-purple-900 mb-2">O que a IA vai criar:</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Título claro e objetivo</li>
              <li>• Descrição detalhada com contexto</li>
              <li>• Tags relevantes automaticamente</li>
              <li>• Estimativa de horas sugerida</li>
              <li>• Critérios de aceitação</li>
            </ul>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn-secondary"
            disabled={generating}
          >
            Cancelar
          </button>
          <button
            onClick={onGenerate}
            disabled={generating || !description.trim()}
            className="btn-primary bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Criar Tarefa
              </>
            )}
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
function TaskViewModal({ task, users, onClose, onEdit, onViewMedia, onAddComment, onToggleReaction, onRequestRetest, onUploadEvidence, onDeleteEvidence, currentUser, onAddNotification, onUpdateDocumentStatus, onUpdateTask, requirements = [], testDocuments = [], onUpdateRequirement }) {
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [localSourceComments, setLocalSourceComments] = useState(task.sourceData?.comments || [])
  const [localDocumentStatus, setLocalDocumentStatus] = useState(task.sourceData?.status || 'pendente')
  const [localDevEvidences, setLocalDevEvidences] = useState(task.devEvidences || [])
  const [localComments, setLocalComments] = useState(task.comments || [])
  const [isDragging, setIsDragging] = useState(false)
  const [showMentions, setShowMentions] = useState(false)
  const [mentionFilter, setMentionFilter] = useState('')
  const [openReactionPicker, setOpenReactionPicker] = useState(null)
  const textareaRef = useRef(null)
  const toast = useToast()
  
  useEffect(() => {
    setLocalSourceComments(task.sourceData?.comments || [])
    setLocalDocumentStatus(task.sourceData?.status || 'pendente')
    setLocalDevEvidences(task.devEvidences || [])
    setLocalComments(task.comments || [])
  }, [task.sourceData?.comments, task.sourceData?.status, task.devEvidences, task.comments])
  
  // Handler para Ctrl+V (colar imagem)
  useEffect(() => {
    const handlePaste = async (e) => {
      if (!onUploadEvidence) return
      const items = e.clipboardData?.items
      if (!items) return
      
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault()
          const file = item.getAsFile()
          if (file) {
            setUploading(true)
            try {
              const newEvidence = await onUploadEvidence(task.id, file)
              if (newEvidence) {
                setLocalDevEvidences(prev => [...prev, newEvidence])
              }
              toast.success('Evidência anexada com sucesso!')
            } catch (error) {
              console.error('Erro ao colar imagem:', error)
              toast.error('Erro ao colar imagem. Tente novamente.')
            } finally {
              setUploading(false)
            }
          }
          break
        }
      }
    }
    
    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [task.id, onUploadEvidence])
  
  const typeStyle = TASK_TYPES[task.type] || TASK_TYPES.bug
  const statusStyle = TASK_STATUS[task.status] || TASK_STATUS.pending
  const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium
  const TypeIcon = typeStyle.icon
  
  const assigneeUser = users.find(u => u.id === task.assignee)
  const screenshots = task.screenshots || task.sourceData?.screenshots || []
  
  // Buscar attachments em múltiplos locais (fallback para tarefas antigas)
  let attachments = task.attachments || task.sourceData?.evidences || []
  
  // Se ainda não encontrou, tentar extrair de failedSteps
  if (attachments.length === 0 && task.sourceData?.failedSteps) {
    const evidencesFromSteps = []
    task.sourceData.failedSteps.forEach((step, index) => {
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
  
  const sourceData = task.sourceData || {}

  // Filtrar usuários para menções
  const filteredUsers = users.filter(u => 
    u.mentionName?.toLowerCase().includes(mentionFilter.toLowerCase()) ||
    u.name?.toLowerCase().includes(mentionFilter.toLowerCase()) ||
    u.email?.toLowerCase().includes(mentionFilter.toLowerCase())
  ).slice(0, 5)

  // Handler para mudança no textarea de comentário
  const handleCommentChange = (e) => {
    const text = e.target.value
    setNewComment(text)
    
    // Detectar @ para mostrar menções
    const lastAtIndex = text.lastIndexOf('@')
    if (lastAtIndex !== -1) {
      const textAfterAt = text.slice(lastAtIndex + 1)
      if (!textAfterAt.includes(' ')) {
        setMentionFilter(textAfterAt)
        setShowMentions(true)
      } else {
        setShowMentions(false)
      }
    } else {
      setShowMentions(false)
    }
  }

  // Inserir menção no texto
  const insertMention = (user) => {
    const lastAtIndex = newComment.lastIndexOf('@')
    const textBefore = newComment.slice(0, lastAtIndex)
    const mentionValue = user.mentionName || user.name?.replace(/\s+/g, '').toLowerCase() || user.email?.split('@')[0] || 'usuario'
    setNewComment(`${textBefore}@${mentionValue} `)
    setShowMentions(false)
    textareaRef.current?.focus()
  }

  // Handler para reações
  const handleReaction = async (commentIndex, reaction) => {
    if (!onToggleReaction || !currentUser) return
    try {
      await onToggleReaction(task.id, commentIndex, reaction, currentUser.id || currentUser.uid, currentUser.name || currentUser.email)
      // Atualizar estado local
      setLocalComments(prev => prev.map((c, idx) => {
        if (idx !== commentIndex) return c
        const reactions = c.reactions || []
        const existingIndex = reactions.findIndex(
          r => r.type === reaction.type && r.value === reaction.value && r.userId === (currentUser.id || currentUser.uid)
        )
        let newReactions
        if (existingIndex >= 0) {
          newReactions = reactions.filter((_, i) => i !== existingIndex)
        } else {
          newReactions = [...reactions, { 
            ...reaction, 
            userId: currentUser.id || currentUser.uid, 
            userName: currentUser.name || currentUser.email,
            createdAt: new Date().toISOString() 
          }]
        }
        return { ...c, reactions: newReactions }
      }))
    } catch (error) {
      console.error('Erro ao reagir:', error)
      toast.error('Erro ao adicionar reação.')
    }
    setOpenReactionPicker(null)
  }

  const handleAddComment = async () => {
    if (!newComment.trim() || !onAddComment) return
    setSubmitting(true)
    try {
      const newCommentData = {
        id: `comment_${Date.now()}`,
        text: newComment.trim(),
        author: currentUser?.name || currentUser?.email || 'Dev',
        authorId: currentUser?.id || currentUser?.uid,
        createdAt: new Date().toISOString(),
        reactions: []
      }
      await onAddComment(task.id, newCommentData)
      setLocalComments(prev => [...prev, newCommentData])
      setNewComment('')
      toast.success('Comentário adicionado!')
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error)
      toast.error('Erro ao adicionar comentário. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUploadEvidence = async (e) => {
    const files = Array.from(e.target.files || []).filter(f => {
      const isImage = f.type.startsWith('image/')
      const isVideo = f.type.startsWith('video/') || 
        f.name.endsWith('.mp4') || f.name.endsWith('.webm') || 
        f.name.endsWith('.mov') || f.name.endsWith('.avi')
      return isImage || isVideo
    })
    if (files.length === 0 || !onUploadEvidence) {
      if (e.target.files?.length > 0) {
        toast.warning('Formato de arquivo não suportado. Use imagens ou vídeos.')
      }
      return
    }
    
    setUploading(true)
    try {
      const newEvidences = []
      for (const file of files) {
        const newEvidence = await onUploadEvidence(task.id, file)
        if (newEvidence) {
          newEvidences.push(newEvidence)
        }
      }
      if (newEvidences.length > 0) {
        setLocalDevEvidences(prev => [...prev, ...newEvidences])
      }
      toast.success(`${files.length} evidência(s) anexada(s) com sucesso!`)
    } catch (error) {
      console.error('Erro ao enviar evidência:', error)
      toast.error('Erro ao enviar evidência. Tente novamente.')
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
      toast.success('Reteste solicitado com sucesso! O QA será notificado.')
      onClose()
    } catch (error) {
      console.error('Erro ao solicitar reteste:', error)
      toast.error('Erro ao solicitar reteste. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateStatus = async (newStatus, reviewStage = null) => {
    if (!onUpdateTask) return
    setSubmitting(true)
    try {
      const updates = { status: newStatus }
      if (reviewStage) {
        updates.reviewStage = reviewStage
        if (reviewStage === 'qa') updates.workspace = 'qa'
      } else updates.reviewStage = null
      await onUpdateTask(task.id, updates)

      if (onAddNotification) {
        const author = currentUser?.name || currentUser?.email || 'Usuário'
        if (newStatus === 'in_review' && reviewStage === 'qa') {
          await onAddNotification({
            type: 'nova_tarefa',
            message: `${author} enviou para revisão do QA: "${task.title}"`,
            author,
            authorEmail: currentUser?.email || null,
            targetRole: 'qa'
          })
        } else if (newStatus === 'in_review' && reviewStage === 'operacao') {
          await onAddNotification({
            type: 'aprovado_reteste',
            message: `QA aprovou e enviou para Operação: "${task.title}"`,
            author,
            authorEmail: currentUser?.email || null,
            targetRole: 'operacao'
          })
        } else if (newStatus === 'done') {
          const assigneeUser = users.find(u => u.id === task.assignee)
          if (assigneeUser) {
            await onAddNotification({
              type: 'aprovado_reteste',
              message: `Tarefa aprovada por ${author}: "${task.title}"`,
              author,
              authorEmail: currentUser?.email || null,
              targetUserId: assigneeUser.id,
              targetEmail: assigneeUser.email
            })
          }
        } else if (newStatus === 'in_progress') {
          const assigneeUser = users.find(u => u.id === task.assignee)
          if (assigneeUser) {
            await onAddNotification({
              type: 'reprovado_reteste',
              message: `Tarefa reprovada por ${author}: "${task.title}"`,
              author,
              authorEmail: currentUser?.email || null,
              targetUserId: assigneeUser.id,
              targetEmail: assigneeUser.email
            })
          }
        }
      }
      toast.success(
        reviewStage === 'qa' ? 'Enviado para o QA!' :
        reviewStage === 'operacao' ? 'Aprovado pelo QA — enviado para Operação!' :
        newStatus === 'done' ? 'Tarefa aprovada e encerrada!' :
        'Tarefa reprovada — devolvida ao desenvolvedor!'
      )
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast.error('Erro ao atualizar status. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const role = currentUser?.role?.toLowerCase()
  const isStandaloneTask = !task.sourceType || task.sourceType !== 'test_document'
  const isDev = role === 'desenvolvedor' || role === 'admin'
  const isQA = role === 'qa' || role === 'admin'
  const isOp = role === 'operacao' || role === 'admin'
  const showSendToQA = isStandaloneTask && isDev &&
    (task.status === 'pending' || task.status === 'in_progress')
  const showQAActions = isStandaloneTask && isQA &&
    task.status === 'in_review' && task.reviewStage === 'qa'
  const showOpActions = isStandaloneTask && isOp &&
    task.status === 'in_review' && task.reviewStage === 'operacao'
  const showRetestOpActions = isStandaloneTask && isOp &&
    (task.reviewStage === 'aguardando_reteste_op' || task.reviewStage === 'nao_pertinente')

  const handleReprovarReteste = async () => {
    if (!onUpdateTask) return
    setSubmitting(true)
    try {
      await onUpdateTask(task.id, { status: 'pending', workspace: 'qa', reviewStage: null })
      if (onAddNotification) {
        const author = currentUser?.name || currentUser?.email || 'Usuário'
        await onAddNotification({
          type: 'reprovado_reteste',
          message: `Operação reprovou reteste e devolveu para triagem do QA: "${task.title}"`,
          author, authorEmail: currentUser?.email || null, targetRole: 'qa'
        })
      }
      toast.success('Reteste reprovado — tarefa devolvida ao QA.')
      onClose()
    } catch (error) {
      toast.error('Erro ao reprovar reteste. Tente novamente.')
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

          {/* Passos para Reproduzir */}
          {task.steps && (
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">
                📋 Passos para Reproduzir
              </label>
              <div className="text-gray-700 whitespace-pre-wrap bg-amber-50 p-4 rounded-lg text-sm border border-amber-200">
                {task.steps}
              </div>
            </div>
          )}

          {/* Resultado Esperado e Atual */}
          {(task.expectedResult || task.actualResult) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {task.expectedResult && (
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    ✅ {task.type === 'bug' ? 'Resultado Esperado' : 'Comportamento Esperado'}
                  </label>
                  <div className="text-gray-700 whitespace-pre-wrap bg-green-50 p-3 rounded-lg text-sm border border-green-200">
                    {task.expectedResult}
                  </div>
                </div>
              )}
              {task.actualResult && (
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    ❌ {task.type === 'bug' ? 'Resultado Atual' : 'Comportamento Atual'}
                  </label>
                  <div className="text-gray-700 whitespace-pre-wrap bg-red-50 p-3 rounded-lg text-sm border border-red-200">
                    {task.actualResult}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Meta info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            {assigneeUser && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Responsável</label>
                <p className="text-gray-900 flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate">{assigneeUser.displayName || assigneeUser.name || assigneeUser.email}</span>
                </p>
              </div>
            )}
            {task.createdBy && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Criado por</label>
                <p className="text-gray-900 text-sm truncate">{task.createdBy}</p>
              </div>
            )}
            {task.createdAt && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Criado em</label>
                <p className="text-gray-900 flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  {new Date(task.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            )}
            {task.module && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Módulo</label>
                <p className="text-gray-900 text-sm truncate">{task.module}</p>
              </div>
            )}
          </div>

          {/* Evidências de Falha do Teste */}
          {attachments.length > 0 && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <label className="text-xs font-medium text-red-700 mb-2 block">
                ❌ Evidências da Falha no Teste ({attachments.length})
              </label>
              <p className="text-xs text-red-600 mb-3">
                Evidências capturadas durante a execução do teste que falhou
              </p>
              <div className="flex flex-wrap gap-3">
                {attachments.map((att, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => onViewMedia(attachments.map(a => ({ 
                        url: a.url, 
                        type: a.type || 'image', 
                        name: a.name || `Evidência ${index + 1}`
                      })), index)}
                      className="relative group cursor-pointer"
                    >
                      {att.type === 'video' || att.url?.includes('.mp4') || att.url?.includes('.webm') ? (
                        <div className="relative w-24 h-24">
                          <video src={att.url} className="w-24 h-24 object-cover rounded-lg border-2 border-red-300" />
                          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center hover:bg-black/50 transition-colors">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                          <span className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1 rounded">Vídeo</span>
                        </div>
                      ) : (
                        <img 
                          src={att.url} 
                          alt={att.name || `Evidência ${index + 1}`} 
                          className="w-24 h-24 object-cover rounded-lg border-2 border-red-300 hover:opacity-80 transition-opacity" 
                        />
                      )}
                    </button>
                    {att.stepAction && (
                      <div className="absolute -bottom-6 left-0 right-0 text-xs text-red-600 truncate text-center" title={att.stepAction}>
                        Passo {att.stepIndex + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Screenshots/Evidences */}
          {screenshots.length > 0 && (
            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">
                📸 Evidências Adicionais ({screenshots.length})
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
                onUpdateRequirementStatus={async ({ field, value }) => {
                  // Encontrar o documento de teste e atualizar o campo correto do requisito associado
                  const testDoc = testDocuments.find(d => d.id === task.sourceId)
                  if (testDoc?.requirement && onUpdateRequirement && requirements.length > 0) {
                    const relatedReq = requirements.find(r => r.id === testDoc.requirement)
                    if (relatedReq?.firebaseId) {
                      const terminalStatuses = ['Aprovado', 'Bloqueado']
                      if (field === 'statusHomolog' && terminalStatuses.includes(relatedReq.statusHomolog)) return
                      await onUpdateRequirement(relatedReq.firebaseId, { [field]: value })
                    }
                  }
                  if (field === 'statusHomolog' && value === 'Aprovado' && onUpdateTask) {
                    await onUpdateTask(task.id, { status: 'done' })
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
                💬 Comentários ({localComments.length})
              </label>
              
              {localComments.length > 0 && (
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {localComments.map((comment, index) => (
                    <div key={comment.id || index} className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{comment.author}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(comment.createdAt).toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {renderTextWithMentions(comment.text, users)}
                      </div>
                      
                      {/* Reações */}
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {comment.reactions?.length > 0 && (
                          <ReactionDisplay 
                            reactions={comment.reactions} 
                            currentUserId={currentUser?.id || currentUser?.uid}
                            onToggle={(reaction) => handleReaction(index, reaction)}
                          />
                        )}
                        
                        {/* Botão para adicionar reação */}
                        <div className="relative">
                          <button
                            onClick={() => setOpenReactionPicker(openReactionPicker === index ? null : index)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            title="Adicionar reação"
                          >
                            <Smile className="w-4 h-4" />
                          </button>
                          {openReactionPicker === index && (
                            <div className="absolute bottom-full left-0 mb-1 z-50">
                              <ReactionPicker 
                                onSelect={(reaction) => handleReaction(index, reaction)}
                                onClose={() => setOpenReactionPicker(null)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {onAddComment && task.status !== 'done' && (
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <textarea
                        ref={textareaRef}
                        value={newComment}
                        onChange={handleCommentChange}
                        placeholder="Adicionar comentário... Use @ para mencionar"
                        className="w-full input-field text-sm resize-none"
                        rows={2}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey && !showMentions) {
                            e.preventDefault()
                            handleAddComment()
                          }
                        }}
                      />
                      
                      {/* Lista de menções */}
                      {showMentions && filteredUsers.length > 0 && (
                        <div className="absolute bottom-full left-0 mb-1 w-full bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg shadow-lg max-h-40 overflow-y-auto z-50">
                          {filteredUsers.map(user => (
                            <button
                              key={user.id}
                              onClick={() => insertMention(user)}
                              className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                            >
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-900 dark:text-white">{user.name || user.email}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || submitting}
                      className="btn-secondary px-4 self-end"
                    >
                      {submitting ? '...' : 'Enviar'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Evidências da Correção (após comentários) */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={async (e) => {
              e.preventDefault()
              setIsDragging(false)
              if (!onUploadEvidence) return
              const files = Array.from(e.dataTransfer.files).filter(f => {
                const isImage = f.type.startsWith('image/')
                const isVideo = f.type.startsWith('video/') || 
                  f.name.endsWith('.mp4') || f.name.endsWith('.webm') || 
                  f.name.endsWith('.mov') || f.name.endsWith('.avi')
                return isImage || isVideo
              })
              if (files.length === 0) {
                toast.warning('Formato de arquivo não suportado. Use imagens ou vídeos.')
                return
              }
              setUploading(true)
              try {
                const newEvidences = []
                for (const file of files) {
                  const newEvidence = await onUploadEvidence(task.id, file)
                  if (newEvidence) {
                    newEvidences.push(newEvidence)
                  }
                }
                if (newEvidences.length > 0) {
                  setLocalDevEvidences(prev => [...prev, ...newEvidences])
                }
                toast.success(`${files.length} evidência(s) anexada(s) com sucesso!`)
              } catch (error) {
                console.error('Erro ao enviar evidência:', error)
                toast.error('Erro ao enviar evidência. Tente novamente.')
              } finally {
                setUploading(false)
              }
            }}
            className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
              isDragging 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <label className="text-xs font-medium text-gray-500 mb-2 block">
              🔧 Evidências da Correção ({localDevEvidences.length})
            </label>
            
            {localDevEvidences.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-3">
                {localDevEvidences.map((ev, index) => (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => onViewMedia(localDevEvidences.map(e => ({ 
                        url: e.url, 
                        type: e.type || 'image', 
                        name: e.name 
                      })), index)}
                      className="cursor-pointer"
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
                    {/* Botão de excluir */}
                    {onDeleteEvidence && (
                      <button
                        onClick={async (e) => {
                          e.stopPropagation()
                          if (!window.confirm('Deseja excluir esta evidência?')) return
                          try {
                            await onDeleteEvidence(task.id, index)
                            setLocalDevEvidences(prev => prev.filter((_, idx) => idx !== index))
                            toast.success('Evidência excluída com sucesso!')
                          } catch (error) {
                            console.error('Erro ao excluir evidência:', error)
                            toast.error('Erro ao excluir evidência.')
                          }
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                        title="Excluir evidência"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Upload de evidência com drag-and-drop */}
            {onUploadEvidence && (
              <div className="flex flex-col items-center gap-2">
                <input
                  type="file"
                  id="evidence-upload"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleUploadEvidence}
                  className="hidden"
                  disabled={uploading}
                />
                {uploading ? (
                  <UploadLoading message="Enviando evidência" />
                ) : (
                  <label
                    htmlFor="evidence-upload"
                    className="flex flex-col items-center gap-1 cursor-pointer text-center"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Arraste arquivos aqui ou <span className="text-blue-500 hover:underline">clique para selecionar</span>
                    </span>
                    <span className="text-xs text-gray-400">
                      Ctrl+V para colar print da área de transferência
                    </span>
                  </label>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <div className="flex gap-2">
            <button onClick={onEdit} className="btn-secondary flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
            {showSendToQA && (
              <button
                onClick={() => handleUpdateStatus('in_review', 'qa')}
                disabled={submitting}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                Enviar para QA
              </button>
            )}
            {showQAActions && (
              <>
                <button
                  onClick={() => handleUpdateStatus('in_review', 'operacao')}
                  disabled={submitting}
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
                >
                  Aprovar e Enviar para Operação
                </button>
                <button
                  onClick={() => handleUpdateStatus('in_progress', 'para_correcao')}
                  disabled={submitting}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  Reprovar (devolver ao Dev)
                </button>
              </>
            )}
            {showOpActions && (
              <>
                <button
                  onClick={() => handleUpdateStatus('done')}
                  disabled={submitting}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                >
                  Aprovar
                </button>
                <button
                  onClick={() => handleUpdateStatus('in_review', 'qa')}
                  disabled={submitting}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  Reprovar (devolver ao QA)
                </button>
              </>
            )}
            {showRetestOpActions && (
              <>
                <button
                  onClick={() => handleUpdateStatus('done')}
                  disabled={submitting}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                >
                  ✓ Aprovar Reteste → Concluir
                </button>
                <button
                  onClick={handleReprovarReteste}
                  disabled={submitting}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  Reprovar Reteste
                </button>
              </>
            )}
          </div>
          <button onClick={onClose} className="btn-primary">
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
