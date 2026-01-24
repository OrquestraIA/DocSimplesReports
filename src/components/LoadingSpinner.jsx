export default function LoadingSpinner({ message = 'Carregando...' }) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 animate-fade-in">
        <div className="relative">
          <div className="w-20 h-20 rounded-xl flex items-center justify-center animate-pulse">
            <img 
              src="/DocSimplesReports/logo.png" 
              alt="Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-400 rounded-full animate-ping" />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">TestWise</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
