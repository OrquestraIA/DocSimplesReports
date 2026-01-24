import { useState, useEffect } from 'react'
import { X, Sparkles, Bug, Zap, Gift } from 'lucide-react'
import { APP_VERSION, getCurrentChangelog, hasSeenVersion, markVersionAsSeen } from '../version'

export default function WhatsNewModal() {
  const [isOpen, setIsOpen] = useState(false)
  const changelog = getCurrentChangelog()

  useEffect(() => {
    // Verifica se o usuário já viu esta versão
    if (!hasSeenVersion(APP_VERSION)) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    markVersionAsSeen(APP_VERSION)
    setIsOpen(false)
  }

  const getChangeIcon = (type) => {
    switch (type) {
      case 'feature':
        return <Sparkles className="w-4 h-4 text-purple-500" />
      case 'improvement':
        return <Zap className="w-4 h-4 text-blue-500" />
      case 'bugfix':
        return <Bug className="w-4 h-4 text-red-500" />
      default:
        return <Gift className="w-4 h-4 text-green-500" />
    }
  }

  const getChangeLabel = (type) => {
    switch (type) {
      case 'feature':
        return 'Novo'
      case 'improvement':
        return 'Melhoria'
      case 'bugfix':
        return 'Correção'
      default:
        return 'Atualização'
    }
  }

  const getChangeBadgeColor = (type) => {
    switch (type) {
      case 'feature':
        return 'bg-purple-100 text-purple-700'
      case 'improvement':
        return 'bg-blue-100 text-blue-700'
      case 'bugfix':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-green-100 text-green-700'
    }
  }

  if (!isOpen || !changelog) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Novidades! 🎉</h2>
                <p className="text-primary-100 text-sm">Versão {changelog.version}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {changelog.title}
          </h3>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {changelog.changes.map((change, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="mt-0.5">
                  {getChangeIcon(change.type)}
                </div>
                <div className="flex-1">
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-1 ${getChangeBadgeColor(change.type)}`}>
                    {getChangeLabel(change.type)}
                  </span>
                  <p className="text-gray-700 text-sm">
                    {change.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={handleClose}
            className="w-full btn-primary py-3 text-center font-medium"
          >
            Entendi, vamos lá! 🚀
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            {changelog.date} • TestWise v{APP_VERSION}
          </p>
        </div>
      </div>
    </div>
  )
}
