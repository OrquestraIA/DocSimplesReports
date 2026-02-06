import { useState } from 'react'
import { Play, TestTube2 } from 'lucide-react'
import TestRunsPanel from './TestRunsPanel'

/**
 * Botão para abrir o painel de testes automatizados
 * Pode ser usado em requisitos, documentos de teste, ou standalone
 */
export default function TestAutomationButton({ 
  requirement = null, 
  githubToken = null,
  className = '',
  variant = 'default' // 'default', 'icon', 'small'
}) {
  const [showPanel, setShowPanel] = useState(false)

  const buttonClasses = {
    default: 'flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors',
    icon: 'p-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors',
    small: 'flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors'
  }

  return (
    <>
      <button
        onClick={() => setShowPanel(true)}
        className={className || buttonClasses[variant]}
        title="Testes Automatizados"
      >
        {variant === 'icon' ? (
          <TestTube2 className="w-4 h-4" />
        ) : (
          <>
            <Play className="w-4 h-4" />
            <span>Testes Automatizados</span>
          </>
        )}
      </button>

      {showPanel && (
        <TestRunsPanel
          onClose={() => setShowPanel(false)}
          githubToken={githubToken}
          requirement={requirement}
        />
      )}
    </>
  )
}
