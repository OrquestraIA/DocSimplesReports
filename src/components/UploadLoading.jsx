import { useEffect, useState } from 'react'

export default function UploadLoading({ message = 'Enviando...' }) {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Logos Container */}
      <div className="flex items-center gap-4 mb-4">
        {/* Logo OM30 */}
        <div className="relative">
          <img 
            src="/DocSimplesReports/logo.png" 
            alt="OM30" 
            className="h-10 w-auto animate-pulse"
          />
        </div>
        
        {/* Separador animado */}
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        
        {/* Logo Orquestra IA */}
        <div className="relative">
          <img 
            src="/DocSimplesReports/logo-orquestraia-transp.png" 
            alt="Orquestra IA" 
            className="h-10 w-auto animate-pulse"
            style={{ animationDelay: '250ms' }}
          />
        </div>
      </div>

      {/* Barra de progresso animada */}
      <div className="w-48 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
        <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full animate-loading-bar" />
      </div>

      {/* Mensagem */}
      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        {message}{dots}
      </p>

      {/* Estilo para animação da barra */}
      <style>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
