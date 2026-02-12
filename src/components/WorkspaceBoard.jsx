import { useState, useMemo } from 'react'
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List as ListIcon,
  ChevronRight,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Circle,
  Play,
  Pause,
  MoreHorizontal,
  Eye,
  Edit3,
  ArrowRight,
  GripVertical,
  MessageSquare,
  Paperclip,
  Plus,
  Bug,
  Lightbulb,
  FileText,
  User,
  Image,
  ArrowUpRight,
  BarChart3,
  Trello,
  Target,
  Flame,
  Activity,
  Cpu,
  Settings2,
  CalendarCheck,
  Layers,
  PanelRightOpen,
  ClipboardList,
  Sparkles,
  X
} from 'lucide-react'
import { WORKSPACES, colorClasses } from './WorkspaceSidebar'
import TaskDetailModal from './TaskDetailModal'
import CreateTaskModal from './CreateTaskModal'
import TaskViewModal from './TaskViewModal'
import MediaViewer from './MediaViewer'

// Tipos de tarefas
const TASK_TYPES = {
  'bug': { bg: 'bg-red-100', text: 'text-red-700', label: 'Bug', icon: Bug },
  'business_rule': { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Regra de Negócio', icon: FileText },
  'improvement': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Melhoria', icon: Lightbulb }
}

// Status de tarefas
const TASK_STATUS = {
  'pending': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendente' },
  'in_progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em Andamento' },
  'in_review': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Em Revisão' },
  'done': { bg: 'bg-green-100', text: 'text-green-700', label: 'Concluído' }
}

// Status options para cada campo
const STATUS_OPTIONS = {
  statusHomolog: [
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Para_Teste_Homolog', label: 'Para Teste' },
    { value: 'Em Teste', label: 'Em Teste' },
    { value: 'Para_Reteste_Homolog', label: 'Para Reteste' },
    { value: 'Em-reteste-homolog', label: 'Em Reteste' },
    { value: 'Aprovado', label: 'Aprovado' },
    { value: 'Reprovado', label: 'Reprovado' },
    { value: 'Bloqueado', label: 'Bloqueado' },
  ],
  statusDev: [
    { value: '', label: 'Não definido' },
    { value: 'NAO_IMPLEMENTADO', label: 'Não Implementado' },
    { value: 'PARCIAL', label: 'Parcial' },
    { value: 'IMPLEMENTADO', label: 'Implementado' },
  ],
  statusQADev: [
    { value: '', label: 'Não definido' },
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Para_Teste_QA', label: 'Para Teste' },
    { value: 'Em Teste', label: 'Em Teste' },
    { value: 'Para_Reteste_QA', label: 'Para Reteste' },
    { value: 'Aprovado', label: 'Aprovado' },
    { value: 'Reprovado', label: 'Reprovado' },
    { value: 'Aguardando_Dev', label: 'Aguardando Dev' },
  ],
  status: [
    { value: 'pending', label: 'Pendente' },
    { value: 'in_progress', label: 'Em Andamento' },
    { value: 'in_review', label: 'Em Revisão' },
    { value: 'done', label: 'Concluído' },
  ]
}

const widgetAccentMap = {
  indigo: 'border-indigo-100 dark:border-indigo-800',
  blue: 'border-blue-100 dark:border-blue-800',
  green: 'border-green-100 dark:border-green-800',
  orange: 'border-orange-100 dark:border-orange-800',
  purple: 'border-purple-100 dark:border-purple-800'
}

function WidgetCard({ title, description, icon: Icon, accent = 'indigo', children, footer }) {
  return (
    <div className={`bg-white dark:bg-slate-800 border rounded-2xl p-4 flex flex-col gap-4 shadow-sm ${widgetAccentMap[accent] || 'border-gray-200 dark:border-slate-700'}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            {Icon && (
              <div className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
                <Icon className="w-4 h-4" />
              </div>
            )}
            <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
          </div>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="flex-1">{children}</div>
      {footer && (
        <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-slate-700 pt-2">
          {footer}
        </div>
      )}
    </div>
  )
}

function TaskMiniList({ items = [], emptyMessage = 'Nenhuma tarefa' }) {
  if (!items.length) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">{emptyMessage}</p>
  }

  return (
    <div className="space-y-2">
      {items.map(task => (
        <div key={task.id} className="flex items-center justify-between p-2 rounded-xl border border-gray-100 dark:border-slate-700">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
              {task.taskCode || task.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{task.title}</p>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
            {TASK_STATUS[task.status]?.label || '—'}
          </span>
        </div>
      ))}
    </div>
  )
}

function DocumentMiniList({ items = [], emptyMessage = 'Nenhum documento' }) {
  if (!items.length) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">{emptyMessage}</p>
  }

  return (
    <div className="space-y-2">
      {items.map(doc => (
        <div key={doc.id} className="flex items-center justify-between p-2 rounded-xl border border-gray-100 dark:border-slate-700">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
              {doc.title || doc.feature || 'Documento'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{doc.requirement || doc.module || 'Sem requisito'}</p>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300 font-medium capitalize">
            {doc.status?.replace('_', ' ') || '—'}
          </span>
        </div>
      ))}
    </div>
  )
}

function StatBadge({ label, value, trend }) {
  return (
    <div className="p-3 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xl font-semibold text-gray-800 dark:text-white">{value}</span>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-medium ${trend > 0 ? 'text-emerald-500' : 'text-gray-400'}`}>
            <ArrowUpRight className="w-3 h-3" />
            {trend > 0 ? `+${trend}%` : 'OK'}
          </span>
        )}
      </div>
    </div>
  )
}

function RequirementCard({ requirement, onUpdateStatus, statusField, workspace, onOpenDetail }) {
  const [showActions, setShowActions] = useState(false)
  const [isChangingStatus, setIsChangingStatus] = useState(false)
  
  const colors = colorClasses[workspace.color]
  const isObrigatorio = requirement.obrigatorio === 'SIM' || requirement.obrigatorio === 'Sim'
  const commentsCount = requirement.comments?.length || 0
  const evidencesCount = requirement.evidences?.length || 0

  const handleStatusChange = async (e, newStatus) => {
    e.stopPropagation()
    setIsChangingStatus(true)
    try {
      const updateData = { [statusField]: newStatus }
      
      // Se o status mudar para Aprovado, salvar a data de aprovação
      if (statusField === 'statusHomolog' && newStatus === 'Aprovado' && !requirement.dataAprovacaoHomolog) {
        updateData.dataAprovacaoHomolog = new Date().toISOString()
      }
      // Se mudar de Aprovado para outro status, limpar a data
      if (statusField === 'statusHomolog' && newStatus !== 'Aprovado' && requirement.dataAprovacaoHomolog) {
        updateData.dataAprovacaoHomolog = null
      }
      
      await onUpdateStatus(requirement.firebaseId, updateData)
    } finally {
      setIsChangingStatus(false)
      setShowActions(false)
    }
  }

  const handleCardClick = (e) => {
    if (showActions) {
      setShowActions(false)
      return
    }
    onOpenDetail(requirement)
  }

  return (
    <div 
      onClick={handleCardClick}
      className={`bg-white dark:bg-slate-700 rounded-lg border ${
        isObrigatorio 
          ? 'border-red-200 dark:border-red-800 shadow-red-100 dark:shadow-red-900/20' 
          : 'border-gray-200 dark:border-slate-600'
      } shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer`}
    >
      <div className="p-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded shrink-0">
              {requirement.id}
            </span>
            {isObrigatorio && (
              <span className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-1.5 py-0.5 rounded shrink-0">
                Obrigatório
              </span>
            )}
          </div>
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowActions(!showActions) }}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            
            {showActions && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-600 py-1 z-20 min-w-[180px]">
                <div className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-700">
                  Mover para
                </div>
                {STATUS_OPTIONS[statusField]?.map(option => (
                  <button
                    key={option.value}
                    onClick={(e) => handleStatusChange(e, option.value)}
                    disabled={isChangingStatus || requirement[statusField] === option.value}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2 ${
                      requirement[statusField] === option.value 
                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <ArrowRight className="w-3 h-3" />
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Módulo */}
        {requirement.modulo && (
          <span className="inline-block text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-600 px-2 py-0.5 rounded mb-2">
            {requirement.modulo}
          </span>
        )}

        {/* Descrição */}
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2" title={requirement.descricao}>
          {requirement.descricao || 'Sem descrição'}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-600">
          <div className="flex items-center gap-3">
            {requirement.versaoDev && (
              <span className="text-xs text-gray-500 dark:text-gray-400" title="Versão Dev">
                v{requirement.versaoDev}
              </span>
            )}
            {requirement.versaoHomolog && (
              <span className="text-xs text-indigo-500 dark:text-indigo-400" title="Versão Homolog">
                H:{requirement.versaoHomolog}
              </span>
            )}
            {/* Indicadores de comentários e evidências */}
            {commentsCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-gray-400" title={`${commentsCount} comentário(s)`}>
                <MessageSquare className="w-3 h-3" />
                {commentsCount}
              </span>
            )}
            {evidencesCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-gray-400" title={`${evidencesCount} evidência(s)`}>
                <Paperclip className="w-3 h-3" />
                {evidencesCount}
              </span>
            )}
          </div>
          {requirement.responsavel && (
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[80px]" title={requirement.responsavel}>
              {requirement.responsavel}
            </span>
          )}
        </div>

        {/* Observação */}
        {requirement.observacao && (
          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-slate-600">
            <p className="text-xs text-gray-500 dark:text-gray-400 italic line-clamp-1" title={requirement.observacao}>
              {requirement.observacao}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Card para Tarefas (bugs, melhorias, regras de negócio)
function TaskCard({ task, onUpdateStatus, workspace, onOpenDetail, users = [] }) {
  const [showActions, setShowActions] = useState(false)
  const [isChangingStatus, setIsChangingStatus] = useState(false)
  
  const typeStyle = TASK_TYPES[task.type] || TASK_TYPES.bug
  const statusStyle = TASK_STATUS[task.status] || TASK_STATUS.pending
  const TypeIcon = typeStyle.icon
  const commentsCount = task.comments?.length || 0
  const evidencesCount = (task.screenshots?.length || 0) + (task.devEvidences?.length || 0)
  const assignee = users.find(u => u.id === task.assignee)

  const handleStatusChange = async (e, newStatus) => {
    e.stopPropagation()
    setIsChangingStatus(true)
    try {
      await onUpdateStatus(task.id, { status: newStatus })
    } finally {
      setIsChangingStatus(false)
      setShowActions(false)
    }
  }

  const handleCardClick = (e) => {
    if (showActions) {
      setShowActions(false)
      return
    }
    onOpenDetail(task, 'task')
  }

  return (
    <div 
      onClick={handleCardClick}
      className={`bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer`}
    >
      <div className="p-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`p-1 rounded ${typeStyle.bg}`}>
              <TypeIcon className={`w-3 h-3 ${typeStyle.text}`} />
            </div>
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${typeStyle.bg} ${typeStyle.text}`}>
              {typeStyle.label}
            </span>
          </div>
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowActions(!showActions) }}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            
            {showActions && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-600 py-1 z-20 min-w-[150px]">
                <div className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-700">
                  Mover para
                </div>
                {STATUS_OPTIONS.status?.map(option => (
                  <button
                    key={option.value}
                    onClick={(e) => handleStatusChange(e, option.value)}
                    disabled={isChangingStatus || task.status === option.value}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2 ${
                      task.status === option.value 
                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <ArrowRight className="w-3 h-3" />
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Título */}
        <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2 mb-2">
          {task.title}
        </p>

        {/* Descrição */}
        {task.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
            {task.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-600">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-1.5 py-0.5 rounded ${statusStyle.bg} ${statusStyle.text}`}>
              {statusStyle.label}
            </span>
            {commentsCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <MessageSquare className="w-3 h-3" />
                {commentsCount}
              </span>
            )}
            {evidencesCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Image className="w-3 h-3" />
                {evidencesCount}
              </span>
            )}
          </div>
          {assignee && (
            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400" title={assignee.name || assignee.email}>
              <User className="w-3 h-3" />
              <span className="truncate max-w-[60px]">{assignee.name?.split(' ')[0] || assignee.email?.split('@')[0]}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// Card para Documentos de Teste
function TestDocCard({ doc, onUpdateStatus, workspace, onOpenDetail }) {
  const [showActions, setShowActions] = useState(false)
  const [isChangingStatus, setIsChangingStatus] = useState(false)
  
  const commentsCount = doc.comments?.length || 0
  const screenshotsCount = doc.screenshots?.length || 0

  const getStatusStyle = (status) => {
    switch(status) {
      case 'aprovado': return { bg: 'bg-green-100', text: 'text-green-700', label: 'Aprovado' }
      case 'reprovado': return { bg: 'bg-red-100', text: 'text-red-700', label: 'Reprovado' }
      case 'em_reteste': 
      case 'em-reteste': return { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Em Reteste' }
      case 'melhoria': return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Melhoria' }
      default: return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendente' }
    }
  }

  const statusStyle = getStatusStyle(doc.status)

  const handleCardClick = (e) => {
    if (showActions) {
      setShowActions(false)
      return
    }
    onOpenDetail(doc, 'testDocument')
  }

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer"
    >
      <div className="p-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${statusStyle.bg} ${statusStyle.text}`}>
              {statusStyle.label}
            </span>
          </div>
        </div>

        {/* Título/Feature */}
        <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2 mb-1">
          {doc.title || doc.feature || 'Documento de Teste'}
        </p>

        {/* Requisito */}
        {doc.requirement && (
          <span className="inline-block text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded mb-2">
            {doc.requirement}
          </span>
        )}

        {/* Módulo */}
        {doc.module && (
          <span className="inline-block text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-600 px-2 py-0.5 rounded ml-1 mb-2">
            {doc.module}
          </span>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-600">
          <div className="flex items-center gap-2">
            {commentsCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <MessageSquare className="w-3 h-3" />
                {commentsCount}
              </span>
            )}
            {screenshotsCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Image className="w-3 h-3" />
                {screenshotsCount}
              </span>
            )}
          </div>
          {doc.tester && (
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[80px]" title={doc.tester}>
              {doc.tester}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function KanbanColumn({ list, items, workspace, onUpdateStatus, onOpenDetail, users = [] }) {
  const colors = colorClasses[list.color]
  const ColumnIcon = list.icon

  // Renderizar o card correto baseado no tipo da lista
  const renderCard = (item) => {
    if (list.type === 'tasks') {
      return (
        <TaskCard
          key={item.id}
          task={item}
          onUpdateStatus={onUpdateStatus}
          workspace={workspace}
          onOpenDetail={onOpenDetail}
          users={users}
        />
      )
    } else if (list.type === 'testDocuments') {
      return (
        <TestDocCard
          key={item.id}
          doc={item}
          onUpdateStatus={onUpdateStatus}
          workspace={workspace}
          onOpenDetail={onOpenDetail}
        />
      )
    } else {
      // requirements (default)
      return (
        <RequirementCard
          key={item.firebaseId || item.id}
          requirement={item}
          onUpdateStatus={onUpdateStatus}
          statusField={list.statusField}
          workspace={workspace}
          onOpenDetail={(req) => onOpenDetail(req, 'requirement')}
        />
      )
    }
  }

  return (
    <div className="flex-shrink-0 w-80 bg-gray-50 dark:bg-slate-800/50 rounded-xl flex flex-col max-h-full">
      {/* Column Header */}
      <div className={`p-3 border-b ${colors.border} bg-white dark:bg-slate-800 rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${colors.bgLight}`}>
              <ColumnIcon className={`w-4 h-4 ${colors.text}`} />
            </div>
            <span className="font-medium text-gray-800 dark:text-white">{list.name}</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.bgLight} ${colors.text}`}>
            {items.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-400 dark:text-gray-500">
            <Circle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhum item</p>
          </div>
        ) : (
          items.map(item => renderCard(item))
        )}
      </div>
    </div>
  )
}

function ListView({ requirements, tasks, testDocuments, workspace, selectedList, onUpdateStatus, onOpenDetail, users }) {
  const list = workspace.lists.find(l => l.id === selectedList)
  if (!list) return null

  // Filtrar itens baseado no tipo da lista
  const filteredItems = useMemo(() => {
    if (list.type === 'tasks') {
      return tasks.filter(task => task[list.statusField] === list.statusValue)
    } else if (list.type === 'testDocuments') {
      if (list.statusValues) {
        return testDocuments.filter(doc => list.statusValues.includes(doc[list.statusField]))
      }
      return testDocuments.filter(doc => doc[list.statusField] === list.statusValue)
    } else {
      return requirements.filter(req => req[list.statusField] === list.statusValue)
    }
  }, [list, tasks, testDocuments, requirements])

  const handleStatusChange = async (item, newStatus) => {
    const updateData = { [list.statusField]: newStatus }
    
    // Se o status mudar para Aprovado, salvar a data de aprovação (apenas para requirements)
    if (list.type === 'requirements' && list.statusField === 'statusHomolog' && newStatus === 'Aprovado' && !item.dataAprovacaoHomolog) {
      updateData.dataAprovacaoHomolog = new Date().toISOString()
    }
    // Se mudar de Aprovado para outro status, limpar a data
    if (list.type === 'requirements' && list.statusField === 'statusHomolog' && newStatus !== 'Aprovado' && item.dataAprovacaoHomolog) {
      updateData.dataAprovacaoHomolog = null
    }
    
    const itemId = list.type === 'requirements' ? item.firebaseId : item.id
    await onUpdateStatus(itemId, updateData)
  }
  const colors = colorClasses[list.color]
  const ListIcon = list.icon

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className={`p-4 border-b ${colors.border} flex items-center justify-between shrink-0`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colors.bgLight}`}>
            <ListIcon className={`w-5 h-5 ${colors.text}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">{list.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredItems.length} {list.type === 'tasks' ? 'tarefas' : list.type === 'testDocuments' ? 'documentos' : 'requisitos'}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-700/50 sticky top-0 z-10">
            <tr>
              {list.type === 'tasks' ? (
                <>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Título</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Descrição</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Responsável</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Status</th>
                </>
              ) : (
                <>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Obrig.</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Módulo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Descrição</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Responsável</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={list.type === 'tasks' ? 5 : 6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  Nenhum item nesta lista
                </td>
              </tr>
            ) : (
              filteredItems.map(item => {
                if (list.type === 'tasks') {
                  const typeStyle = TASK_TYPES[item.type] || TASK_TYPES.bug
                  const assignee = users.find(u => u.id === item.assignee)
                  const commentsCount = item.comments?.length || 0
                  return (
                    <tr 
                      key={item.id} 
                      onClick={() => onOpenDetail(item, 'task')}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer"
                    >
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${typeStyle.bg} ${typeStyle.text}`}>
                          {typeStyle.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-800 dark:text-white">{item.title}</span>
                          {commentsCount > 0 && (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <MessageSquare className="w-3 h-3" />
                              {commentsCount}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate" title={item.description}>
                          {item.description || '-'}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {assignee ? (assignee.name || assignee.email) : '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={item[list.statusField] || ''}
                          onChange={(e) => handleStatusChange(item, e.target.value)}
                          className="text-xs px-2 py-1 rounded border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                        >
                          {STATUS_OPTIONS[list.statusField]?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  )
                } else {
                  const isObrigatorio = item.obrigatorio === 'SIM' || item.obrigatorio === 'Sim'
                  const commentsCount = item.comments?.length || 0
                  return (
                    <tr 
                      key={item.firebaseId || item.id} 
                      onClick={() => onOpenDetail(item, 'requirement')}
                      className={`hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer ${isObrigatorio ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-blue-600 dark:text-blue-400">{item.id}</span>
                          {commentsCount > 0 && (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <MessageSquare className="w-3 h-3" />
                              {commentsCount}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {isObrigatorio ? (
                          <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs font-medium">SIM</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{item.modulo || '-'}</span>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <p className="text-sm text-gray-700 dark:text-gray-300 truncate" title={item.descricao}>
                          {item.descricao || '-'}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{item.responsavel || '-'}</span>
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={item[list.statusField] || ''}
                          onChange={(e) => handleStatusChange(item, e.target.value)}
                          className="text-xs px-2 py-1 rounded border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                        >
                          {STATUS_OPTIONS[list.statusField]?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  )
                }
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function WorkspaceBoard({ 
  requirements = [], 
  tasks = [],
  testDocuments = [],
  selectedWorkspace, 
  selectedList,
  onUpdateRequirement,
  onUpdateTask,
  onDeleteTask,
  onUpdateTestDocument,
  users = [],
  currentUser,
  onAddNotification,
  sprints = [],
  onCreateTask,
  onAddTaskComment,
  onToggleTaskReaction,
  onUploadTaskEvidence,
  onDeleteTaskEvidence,
  onRequestRetest,
  onUpdateDocumentStatus
}) {
  const [viewMode, setViewMode] = useState('kanban') // 'kanban' ou 'list'
  const [searchTerm, setSearchTerm] = useState('')
  const [filterModule, setFilterModule] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItemType, setSelectedItemType] = useState(null) // 'requirement', 'task', 'testDocument'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false)
  const [viewingTask, setViewingTask] = useState(null)
  const [viewingMedia, setViewingMedia] = useState(null)

  const workspace = WORKSPACES.find(w => w.id === selectedWorkspace)
  
  // Buscar o item atualizado da lista (para refletir mudanças em tempo real)
  const selectedRequirement = useMemo(() => {
    if (!selectedItem || selectedItemType !== 'requirement') return null
    return requirements.find(r => r.firebaseId === selectedItem.firebaseId) || null
  }, [requirements, selectedItem, selectedItemType])

  const handleOpenDetail = (item, type = 'requirement') => {
    setSelectedItem(item)
    setSelectedItemType(type)
    if (type === 'requirement') {
      setIsModalOpen(true)
    } else if (type === 'task') {
      // Para tarefas, abrir modal de visualização
      setViewingTask(item)
    } else if (type === 'testDocument') {
      // Para documentos de teste, abrir na página de documentos
      window.open(`#/documentos?id=${item.id}`, '_blank')
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
    setSelectedItemType(null)
  }
  
  // Módulos únicos
  const modules = useMemo(() => {
    const uniqueModules = [...new Set(requirements.map(r => r.modulo).filter(Boolean))]
    return uniqueModules.sort()
  }, [requirements])

  // Função para obter itens filtrados para uma lista específica
  const getItemsForList = (list) => {
    if (list.type === 'tasks') {
      return tasks.filter(task => {
        const matchesStatus = task[list.statusField] === list.statusValue
        const matchesSearch = !searchTerm || 
          task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesStatus && matchesSearch
      })
    } else if (list.type === 'testDocuments') {
      return testDocuments.filter(doc => {
        const matchesStatus = list.statusValues 
          ? list.statusValues.includes(doc[list.statusField])
          : doc[list.statusField] === list.statusValue
        const matchesSearch = !searchTerm || 
          doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.feature?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.requirement?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesStatus && matchesSearch
      })
    } else {
      // requirements (default)
      return requirements.filter(req => {
        const matchesStatus = req[list.statusField] === list.statusValue
        const matchesSearch = !searchTerm ||
          req.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.modulo?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesModule = filterModule === 'all' || req.modulo === filterModule
        return matchesStatus && matchesSearch && matchesModule
      })
    }
  }

  // Filtrar requisitos (para ListView que ainda usa isso)
  const filteredRequirements = useMemo(() => {
    return requirements.filter(req => {
      const matchesSearch = 
        !searchTerm ||
        req.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.modulo?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesModule = filterModule === 'all' || req.modulo === filterModule
      return matchesSearch && matchesModule
    })
  }, [requirements, searchTerm, filterModule])

  // Handler para atualizar status baseado no tipo
  const handleUpdateStatus = (itemId, updates, type) => {
    if (type === 'tasks' || updates.status) {
      return onUpdateTask?.(itemId, updates)
    } else if (type === 'testDocuments') {
      return onUpdateTestDocument?.(itemId, updates)
    } else {
      return onUpdateRequirement?.(itemId, updates)
    }
  }

  if (!workspace) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <LayoutGrid className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">Selecione um espaço de trabalho</h3>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Escolha um espaço no menu lateral para visualizar as tarefas</p>
        </div>
      </div>
    )
  }

  const colors = colorClasses[workspace.color]
  const Icon = workspace.icon

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${colors.bgLight}`}>
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">{workspace.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{workspace.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Botão Nova Tarefa - disponível em todos os espaços */}
            {onCreateTask && (
              <button
                onClick={() => setIsCreateTaskModalOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${colors.bg} text-white hover:opacity-90 transition-opacity`}
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Nova Tarefa</span>
              </button>
            )}

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'kanban' 
                    ? 'bg-white dark:bg-slate-600 text-gray-800 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Visualização Kanban"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-slate-600 text-gray-800 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Visualização em Lista"
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar requisitos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white text-sm"
          >
            <option value="all">Todos os módulos</option>
            {modules.map(mod => (
              <option key={mod} value={mod}>{mod}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden p-4 flex flex-col">
        {viewMode === 'kanban' ? (
          <div className="flex gap-4 overflow-x-auto h-full pb-4 flex-1">
            {workspace.lists.map(list => (
              <KanbanColumn
                key={list.id}
                list={list}
                items={getItemsForList(list)}
                workspace={workspace}
                onUpdateStatus={(id, updates) => handleUpdateStatus(id, updates, list.type)}
                onOpenDetail={handleOpenDetail}
                users={users}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <ListView
              requirements={filteredRequirements}
              tasks={tasks}
              testDocuments={testDocuments}
              workspace={workspace}
              selectedList={selectedList || workspace.lists[0]?.id}
              onUpdateStatus={(id, updates) => handleUpdateStatus(id, updates, workspace.lists.find(l => l.id === selectedList)?.type)}
              onOpenDetail={handleOpenDetail}
              users={users}
            />
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        requirement={selectedRequirement}
        workspace={selectedWorkspace}
        users={users}
        currentUser={currentUser}
        onUpdateRequirement={onUpdateRequirement}
        onAddNotification={onAddNotification}
        sprints={sprints}
      />

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onSave={onCreateTask}
        users={users}
        currentUser={currentUser}
        workspace={workspace}
      />

      {/* Task View Modal */}
      {viewingTask && (
        <TaskViewModal
          task={viewingTask}
          users={users}
          currentUser={currentUser}
          onClose={() => setViewingTask(null)}
          onEdit={() => { /* TODO: implementar edição */ }}
          onViewMedia={(media, index) => setViewingMedia({ media, index })}
          onAddComment={onAddTaskComment}
          onToggleReaction={onToggleTaskReaction}
          onUploadEvidence={onUploadTaskEvidence}
          onDeleteEvidence={onDeleteTaskEvidence}
          onRequestRetest={onRequestRetest}
          onAddNotification={onAddNotification}
          onUpdateDocumentStatus={onUpdateDocumentStatus}
          requirements={requirements}
          testDocuments={testDocuments}
          onUpdateRequirement={onUpdateRequirement}
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
