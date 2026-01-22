import { useState, useRef, useEffect } from 'react'
import { 
  Bell, 
  X, 
  MessageSquare, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Clock,
  Check,
  CheckCheck,
  Trash2,
  AtSign,
  FileText
} from 'lucide-react'
import { markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from '../firebase'

export default function NotificationsPanel({ notifications = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef(null)
  
  const unreadCount = notifications.filter(n => !n.read).length

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'comentario':
        return <MessageSquare className="w-4 h-4 text-blue-500" />
      case 'solicitar_reteste':
        return <RefreshCw className="w-4 h-4 text-orange-500" />
      case 'aprovado_reteste':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'reprovado_reteste':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'mencao':
        return <AtSign className="w-4 h-4 text-purple-500" />
      case 'novo_documento':
        return <FileText className="w-4 h-4 text-indigo-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'comentario':
        return 'border-l-blue-500'
      case 'solicitar_reteste':
        return 'border-l-orange-500'
      case 'aprovado_reteste':
        return 'border-l-green-500'
      case 'reprovado_reteste':
        return 'border-l-red-500'
      case 'mencao':
        return 'border-l-purple-500'
      case 'novo_documento':
        return 'border-l-indigo-500'
      default:
        return 'border-l-gray-500'
    }
  }

  const getNotificationLabel = (type) => {
    switch (type) {
      case 'comentario':
        return 'Novo Comentário'
      case 'solicitar_reteste':
        return 'Solicitação de Reteste'
      case 'aprovado_reteste':
        return 'Reteste Aprovado'
      case 'reprovado_reteste':
        return 'Reteste Reprovado'
      case 'mencao':
        return 'Você foi mencionado'
      case 'novo_documento':
        return 'Novo Teste Registrado'
      default:
        return 'Notificação'
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Agora'
    if (diffMins < 60) return `${diffMins}min atrás`
    if (diffHours < 24) return `${diffHours}h atrás`
    if (diffDays < 7) return `${diffDays}d atrás`
    return date.toLocaleDateString('pt-BR')
  }

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation()
    try {
      await markNotificationAsRead(id)
    } catch (error) {
      console.error('Erro ao marcar como lida:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead()
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error)
    }
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    try {
      await deleteNotification(id)
    } catch (error) {
      console.error('Erro ao deletar notificação:', error)
    }
  }

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Notificações</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
                >
                  <CheckCheck className="w-3 h-3" />
                  Marcar todas como lidas
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Nenhuma notificação</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.slice(0, 20).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 hover:bg-gray-50 transition-colors border-l-4 ${getNotificationColor(notification.type)} ${
                      !notification.read ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-500">
                            {getNotificationLabel(notification.type)}
                          </span>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.testTitle}
                        </p>
                        {notification.message && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(notification.createdAt)}
                          </span>
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <button
                                onClick={(e) => handleMarkAsRead(notification.id, e)}
                                className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-green-600"
                                title="Marcar como lida"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              onClick={(e) => handleDelete(notification.id, e)}
                              className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-red-600"
                              title="Excluir"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 20 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-center">
              <span className="text-xs text-gray-500">
                Mostrando 20 de {notifications.length} notificações
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
