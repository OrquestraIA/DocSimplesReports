import { Heart } from 'lucide-react'
import { APP_VERSION } from '../version'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white dark:bg-slate-800/95 border-t border-gray-200 dark:border-slate-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
          <span>Feito com</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          <span>por</span>
          <a 
            href="https://github.com/OrquestraIA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img 
              src="/DocSimplesReports/logo-orquestraia-transp.png" 
              alt="OrquestraIA" 
              className="h-5 w-auto"
            />
          </a>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <span className="text-xs">TestWise v{APP_VERSION}</span>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <span className="text-xs">© {currentYear} OM30</span>
        </div>
      </div>
    </footer>
  )
}
