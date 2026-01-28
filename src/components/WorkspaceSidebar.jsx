import { useState } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  Users, 
  Code2, 
  TestTube2, 
  Briefcase,
  LayoutGrid,
  List,
  Plus,
  Settings,
  Circle,
  CheckCircle2,
  Clock,
  AlertCircle,
  RotateCcw,
  Pause,
  Play
} from 'lucide-react'

// Configuração dos espaços de trabalho
const WORKSPACES = [
  {
    id: 'operacao',
    name: 'Operação',
    icon: Briefcase,
    color: 'indigo',
    description: 'Homologação e validação',
    lists: [
      { id: 'para_teste_homolog', name: 'Para Teste', statusField: 'statusHomolog', statusValue: 'Para_Teste_Homolog', icon: Clock, color: 'cyan' },
      { id: 'em_teste_homolog', name: 'Em Teste', statusField: 'statusHomolog', statusValue: 'Em Teste', icon: Play, color: 'blue' },
      { id: 'para_reteste_homolog', name: 'Para Reteste', statusField: 'statusHomolog', statusValue: 'Para_Reteste_Homolog', icon: RotateCcw, color: 'purple' },
      { id: 'em_reteste_homolog', name: 'Em Reteste', statusField: 'statusHomolog', statusValue: 'Em-reteste-homolog', icon: RotateCcw, color: 'orange' },
      { id: 'aprovado_homolog', name: 'Aprovados', statusField: 'statusHomolog', statusValue: 'Aprovado', icon: CheckCircle2, color: 'green' },
      { id: 'reprovado_homolog', name: 'Reprovados', statusField: 'statusHomolog', statusValue: 'Reprovado', icon: AlertCircle, color: 'red' },
      { id: 'bloqueado_homolog', name: 'Bloqueados', statusField: 'statusHomolog', statusValue: 'Bloqueado', icon: Pause, color: 'gray' },
    ]
  },
  {
    id: 'devs',
    name: 'Desenvolvimento',
    icon: Code2,
    color: 'blue',
    description: 'Tarefas de desenvolvimento',
    lists: [
      { id: 'nao_implementado', name: 'Para Desenvolver', statusField: 'statusDev', statusValue: 'NAO_IMPLEMENTADO', icon: Circle, color: 'gray' },
      { id: 'parcial', name: 'Em Desenvolvimento', statusField: 'statusDev', statusValue: 'PARCIAL', icon: Play, color: 'orange' },
      { id: 'implementado', name: 'Implementado', statusField: 'statusDev', statusValue: 'IMPLEMENTADO', icon: CheckCircle2, color: 'green' },
    ]
  },
  {
    id: 'qa',
    name: 'QA',
    icon: TestTube2,
    color: 'green',
    description: 'Testes e qualidade',
    lists: [
      { id: 'para_teste_qa', name: 'Para Teste', statusField: 'statusQADev', statusValue: 'Para_Teste_QA', icon: Clock, color: 'cyan' },
      { id: 'em_teste_qa', name: 'Em Teste', statusField: 'statusQADev', statusValue: 'Em Teste', icon: Play, color: 'blue' },
      { id: 'para_reteste_qa', name: 'Para Reteste', statusField: 'statusQADev', statusValue: 'Para_Reteste_QA', icon: RotateCcw, color: 'purple' },
      { id: 'aprovado_qa', name: 'Aprovados', statusField: 'statusQADev', statusValue: 'Aprovado', icon: CheckCircle2, color: 'green' },
      { id: 'reprovado_qa', name: 'Reprovados', statusField: 'statusQADev', statusValue: 'Reprovado', icon: AlertCircle, color: 'red' },
      { id: 'pendente_qa', name: 'Pendentes', statusField: 'statusQADev', statusValue: 'Pendente', icon: Circle, color: 'yellow' },
    ]
  }
]

const colorClasses = {
  indigo: {
    bg: 'bg-indigo-500',
    bgLight: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-800',
    hover: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
  },
  blue: {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
  },
  green: {
    bg: 'bg-green-500',
    bgLight: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    hover: 'hover:bg-green-50 dark:hover:bg-green-900/20'
  },
  cyan: {
    bg: 'bg-cyan-500',
    bgLight: 'bg-cyan-100 dark:bg-cyan-900/30',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-200 dark:border-cyan-800',
    hover: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/20'
  },
  purple: {
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
  },
  orange: {
    bg: 'bg-orange-500',
    bgLight: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    hover: 'hover:bg-orange-50 dark:hover:bg-orange-900/20'
  },
  red: {
    bg: 'bg-red-500',
    bgLight: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    hover: 'hover:bg-red-50 dark:hover:bg-red-900/20'
  },
  yellow: {
    bg: 'bg-yellow-500',
    bgLight: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-600 dark:text-yellow-400',
    border: 'border-yellow-200 dark:border-yellow-800',
    hover: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
  },
  gray: {
    bg: 'bg-gray-500',
    bgLight: 'bg-gray-100 dark:bg-gray-800/50',
    text: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
    hover: 'hover:bg-gray-50 dark:hover:bg-gray-800/30'
  }
}

export default function WorkspaceSidebar({ 
  isOpen, 
  onToggle, 
  requirements = [],
  selectedWorkspace,
  onSelectWorkspace,
  selectedList,
  onSelectList
}) {
  const [expandedWorkspaces, setExpandedWorkspaces] = useState(['operacao', 'devs', 'qa'])

  const toggleWorkspace = (workspaceId) => {
    setExpandedWorkspaces(prev => 
      prev.includes(workspaceId) 
        ? prev.filter(id => id !== workspaceId)
        : [...prev, workspaceId]
    )
  }

  // Contar itens por lista
  const getListCount = (list) => {
    return requirements.filter(req => req[list.statusField] === list.statusValue).length
  }

  // Contar total de itens por workspace
  const getWorkspaceCount = (workspace) => {
    return workspace.lists.reduce((total, list) => total + getListCount(list), 0)
  }

  if (!isOpen) {
    // Sidebar colapsada - apenas ícones
    return (
      <div className="w-16 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col items-center py-4 transition-all duration-300">
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 mb-4"
          title="Expandir menu"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col gap-2">
          {WORKSPACES.map(workspace => {
            const Icon = workspace.icon
            const colors = colorClasses[workspace.color]
            const isSelected = selectedWorkspace === workspace.id
            const count = getWorkspaceCount(workspace)
            
            return (
              <button
                key={workspace.id}
                onClick={() => onSelectWorkspace(workspace.id)}
                className={`relative p-3 rounded-xl transition-all duration-200 ${
                  isSelected 
                    ? `${colors.bgLight} ${colors.text}` 
                    : `text-gray-500 dark:text-gray-400 ${colors.hover}`
                }`}
                title={`${workspace.name} (${count})`}
              >
                <Icon className="w-5 h-5" />
                {count > 0 && (
                  <span className={`absolute -top-1 -right-1 w-5 h-5 ${colors.bg} text-white text-xs font-bold rounded-full flex items-center justify-center`}>
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="w-72 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="font-semibold text-gray-800 dark:text-white">Espaços</span>
        </div>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400"
          title="Recolher menu"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Workspaces List */}
      <div className="flex-1 overflow-y-auto py-2">
        {WORKSPACES.map(workspace => {
          const Icon = workspace.icon
          const colors = colorClasses[workspace.color]
          const isExpanded = expandedWorkspaces.includes(workspace.id)
          const isSelected = selectedWorkspace === workspace.id
          const workspaceCount = getWorkspaceCount(workspace)

          return (
            <div key={workspace.id} className="mb-1">
              {/* Workspace Header */}
              <div
                className={`mx-2 rounded-lg transition-all duration-200 ${
                  isSelected ? colors.bgLight : ''
                }`}
              >
                <button
                  onClick={() => {
                    onSelectWorkspace(workspace.id)
                    toggleWorkspace(workspace.id)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isSelected 
                      ? colors.text 
                      : `text-gray-700 dark:text-gray-300 ${colors.hover}`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${colors.bgLight}`}>
                      <Icon className={`w-4 h-4 ${colors.text}`} />
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-sm">{workspace.name}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{workspace.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {workspaceCount > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.bgLight} ${colors.text}`}>
                        {workspaceCount}
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>
              </div>

              {/* Lists */}
              {isExpanded && (
                <div className="mt-1 ml-4 mr-2 space-y-0.5">
                  {workspace.lists.map(list => {
                    const ListIcon = list.icon
                    const listColors = colorClasses[list.color]
                    const count = getListCount(list)
                    const isListSelected = selectedWorkspace === workspace.id && selectedList === list.id

                    return (
                      <button
                        key={list.id}
                        onClick={() => {
                          onSelectWorkspace(workspace.id)
                          onSelectList(list.id)
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          isListSelected
                            ? `${listColors.bgLight} ${listColors.text} font-medium`
                            : `text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700/50`
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <ListIcon className={`w-3.5 h-3.5 ${isListSelected ? listColors.text : 'text-gray-400'}`} />
                          <span>{list.name}</span>
                        </div>
                        {count > 0 && (
                          <span className={`px-1.5 py-0.5 rounded text-xs ${
                            isListSelected 
                              ? `${listColors.bg} text-white` 
                              : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
                          }`}>
                            {count}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 dark:border-slate-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {requirements.length} requisitos no total
        </div>
      </div>
    </div>
  )
}

export { WORKSPACES, colorClasses }
