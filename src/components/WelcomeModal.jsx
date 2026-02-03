import { useState, useEffect } from 'react'
import { 
  X, CheckCircle, Clock, AlertTriangle, Bug, Lightbulb, FileText,
  Play, ArrowRight, ListTodo, Sparkles
} from 'lucide-react'

const TASK_TYPES = {
  'bug': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Bug', icon: Bug },
  'business_rule': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', label: 'Regra de Negócio', icon: FileText },
  'improvement': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'Melhoria', icon: Lightbulb }
}

const TASK_STATUS = {
  'pending': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', label: 'Pendente', icon: Clock },
  'in_progress': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'Em Andamento', icon: Play },
  'in_review': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'Em Revisão', icon: AlertTriangle },
  'done': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Concluído', icon: CheckCircle }
}

const PRIORITY_COLORS = {
  'low': 'border-l-blue-400',
  'medium': 'border-l-yellow-400',
  'high': 'border-l-orange-400',
  'critical': 'border-l-red-500'
}

export default function WelcomeModal({ isOpen, onClose, currentUser, tasks = [], onNavigateToTask }) {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting('Bom dia')
    } else if (hour < 18) {
      setGreeting('Boa tarde')
    } else {
      setGreeting('Boa noite')
    }
  }, [])

  if (!isOpen) return null

  // Filtrar tarefas do usuário atual
  const userId = currentUser?.id || currentUser?.uid
  const myTasks = tasks.filter(t => t.assignee === userId && t.status !== 'done')
  
  // Ordenar por prioridade e status
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
  const statusOrder = { in_progress: 0, in_review: 1, pending: 2 }
  
  const sortedTasks = [...myTasks].sort((a, b) => {
    const statusDiff = (statusOrder[a.status] || 3) - (statusOrder[b.status] || 3)
    if (statusDiff !== 0) return statusDiff
    return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3)
  }).slice(0, 5)

  const userName = currentUser?.name || currentUser?.email?.split('@')[0] || 'Usuário'
  const firstName = userName.split(' ')[0]

  // Estatísticas
  const inProgress = myTasks.filter(t => t.status === 'in_progress').length
  const pending = myTasks.filter(t => t.status === 'pending').length
  const inReview = myTasks.filter(t => t.status === 'in_review').length

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Sparkles className="w-32 h-32 -mt-8 -mr-8" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4">
            {currentUser?.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt={userName}
                className="w-16 h-16 rounded-full border-2 border-white/50 object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full border-2 border-white/50 bg-white/20 flex items-center justify-center">
                <span className="text-2xl font-bold">{firstName[0].toUpperCase()}</span>
              </div>
            )}
            <div>
              <p className="text-white/80 text-sm">{greeting},</p>
              <h2 className="text-2xl font-bold">{firstName}! 👋</h2>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Estatísticas rápidas */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{inProgress}</div>
              <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Em andamento</div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{inReview}</div>
              <div className="text-xs text-yellow-600/70 dark:text-yellow-400/70">Em revisão</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">{pending}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Pendentes</div>
            </div>
          </div>

          {/* Lista de tarefas */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-blue-500" />
                Suas tarefas prioritárias
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {myTasks.length} tarefa{myTasks.length !== 1 ? 's' : ''} ativa{myTasks.length !== 1 ? 's' : ''}
              </span>
            </div>

            {sortedTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500 opacity-50" />
                <p className="font-medium">Nenhuma tarefa pendente!</p>
                <p className="text-sm">Você está em dia com suas atividades 🎉</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {sortedTasks.map(task => {
                  const typeStyle = TASK_TYPES[task.type] || TASK_TYPES.bug
                  const statusStyle = TASK_STATUS[task.status] || TASK_STATUS.pending
                  const TypeIcon = typeStyle.icon
                  const StatusIcon = statusStyle.icon
                  const priorityBorder = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium

                  return (
                    <button
                      key={task.id}
                      onClick={() => {
                        onClose()
                        if (onNavigateToTask) onNavigateToTask(task)
                      }}
                      className={`w-full text-left p-3 rounded-lg border-l-4 ${priorityBorder} bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}>
                              <TypeIcon className="w-3 h-3" />
                              {typeStyle.label}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusStyle.label}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                            {task.title}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0 mt-1" />
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Fechar
          </button>
          <button
            onClick={() => {
              onClose()
              window.location.href = '#/minhas-tarefas'
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Ver todas as tarefas
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
