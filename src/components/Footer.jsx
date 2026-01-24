import { ExternalLink } from 'lucide-react'
import { APP_VERSION } from '../version'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white dark:bg-slate-800/95 border-t border-gray-200 dark:border-slate-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Powered by OM30 */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Powered by</span>
            <a 
              href="https://om30.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              OM30
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          {/* Direita - Copyright e Versão */}
          <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
            <span>TestWise v{APP_VERSION}</span>
            <span>•</span>
            <span>© {currentYear} OM30</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
