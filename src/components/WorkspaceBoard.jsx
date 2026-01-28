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
  Paperclip
} from 'lucide-react'
import { WORKSPACES, colorClasses } from './WorkspaceSidebar'
import TaskDetailModal from './TaskDetailModal'

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
  ]
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
      await onUpdateStatus(requirement.firebaseId, { [statusField]: newStatus })
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

function KanbanColumn({ list, requirements, workspace, onUpdateStatus, onOpenDetail }) {
  const colors = colorClasses[list.color]
  const ListIcon = list.icon
  const filteredReqs = requirements.filter(req => req[list.statusField] === list.statusValue)

  return (
    <div className="flex-shrink-0 w-80 bg-gray-50 dark:bg-slate-800/50 rounded-xl flex flex-col max-h-full">
      {/* Column Header */}
      <div className={`p-3 border-b ${colors.border} bg-white dark:bg-slate-800 rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${colors.bgLight}`}>
              <ListIcon className={`w-4 h-4 ${colors.text}`} />
            </div>
            <span className="font-medium text-gray-800 dark:text-white">{list.name}</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.bgLight} ${colors.text}`}>
            {filteredReqs.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredReqs.length === 0 ? (
          <div className="text-center py-8 text-gray-400 dark:text-gray-500">
            <Circle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhum item</p>
          </div>
        ) : (
          filteredReqs.map(req => (
            <RequirementCard
              key={req.firebaseId || req.id}
              requirement={req}
              onUpdateStatus={onUpdateStatus}
              statusField={list.statusField}
              workspace={workspace}
              onOpenDetail={onOpenDetail}
            />
          ))
        )}
      </div>
    </div>
  )
}

function ListView({ requirements, workspace, selectedList, onUpdateStatus, onOpenDetail }) {
  const list = workspace.lists.find(l => l.id === selectedList)
  if (!list) return null

  const filteredReqs = requirements.filter(req => req[list.statusField] === list.statusValue)
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
            <p className="text-sm text-gray-500 dark:text-gray-400">{filteredReqs.length} requisitos</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-700/50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Obrig.</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Módulo</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Descrição</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Responsável</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {filteredReqs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  Nenhum requisito nesta lista
                </td>
              </tr>
            ) : (
              filteredReqs.map(req => {
                const isObrigatorio = req.obrigatorio === 'SIM' || req.obrigatorio === 'Sim'
                const commentsCount = req.comments?.length || 0
                return (
                  <tr 
                    key={req.firebaseId || req.id} 
                    onClick={() => onOpenDetail(req)}
                    className={`hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer ${isObrigatorio ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-blue-600 dark:text-blue-400">{req.id}</span>
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
                      <span className="text-sm text-gray-600 dark:text-gray-300">{req.modulo || '-'}</span>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-sm text-gray-700 dark:text-gray-300 truncate" title={req.descricao}>
                        {req.descricao || '-'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{req.responsavel || '-'}</span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={req[list.statusField] || ''}
                        onChange={(e) => onUpdateStatus(req.firebaseId, { [list.statusField]: e.target.value })}
                        className="text-xs px-2 py-1 rounded border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                      >
                        {STATUS_OPTIONS[list.statusField]?.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                )
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
  selectedWorkspace, 
  selectedList,
  onUpdateRequirement,
  users = [],
  currentUser,
  onAddNotification,
  sprints = []
}) {
  const [viewMode, setViewMode] = useState('kanban') // 'kanban' ou 'list'
  const [searchTerm, setSearchTerm] = useState('')
  const [filterModule, setFilterModule] = useState('all')
  const [selectedRequirementId, setSelectedRequirementId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const workspace = WORKSPACES.find(w => w.id === selectedWorkspace)
  
  // Buscar o requirement atualizado da lista (para refletir mudanças em tempo real)
  const selectedRequirement = useMemo(() => {
    if (!selectedRequirementId) return null
    return requirements.find(r => r.firebaseId === selectedRequirementId) || null
  }, [requirements, selectedRequirementId])

  const handleOpenDetail = (requirement) => {
    setSelectedRequirementId(requirement.firebaseId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRequirementId(null)
  }
  
  // Módulos únicos
  const modules = useMemo(() => {
    const uniqueModules = [...new Set(requirements.map(r => r.modulo).filter(Boolean))]
    return uniqueModules.sort()
  }, [requirements])

  // Filtrar requisitos
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
                requirements={filteredRequirements}
                workspace={workspace}
                onUpdateStatus={onUpdateRequirement}
                onOpenDetail={handleOpenDetail}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <ListView
              requirements={filteredRequirements}
              workspace={workspace}
              selectedList={selectedList || workspace.lists[0]?.id}
              onUpdateStatus={onUpdateRequirement}
              onOpenDetail={handleOpenDetail}
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
    </div>
  )
}
