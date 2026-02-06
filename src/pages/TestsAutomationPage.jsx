import { useState, useEffect } from 'react'
import { Settings, ExternalLink, AlertCircle } from 'lucide-react'
import TestRunsPanel from '../components/TestRunsPanel'

export default function TestsAutomationPage() {
  const [githubToken, setGithubToken] = useState(null)
  const [showTokenConfig, setShowTokenConfig] = useState(false)
  const [tokenInput, setTokenInput] = useState('')

  // Carregar token do localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('githubToken') || import.meta.env.VITE_GITHUB_TOKEN
    setGithubToken(savedToken)
  }, [])

  const handleSaveToken = () => {
    if (!tokenInput.trim()) {
      alert('Por favor, insira um token válido')
      return
    }
    
    localStorage.setItem('githubToken', tokenInput.trim())
    setGithubToken(tokenInput.trim())
    setShowTokenConfig(false)
    setTokenInput('')
  }

  const handleRemoveToken = () => {
    if (confirm('Deseja remover o token do GitHub? Você precisará configurá-lo novamente.')) {
      localStorage.removeItem('githubToken')
      setGithubToken(null)
      setShowTokenConfig(true)
    }
  }

  if (!githubToken) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Testes Automatizados
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Configure seu GitHub Personal Access Token para começar
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-medium mb-1">Configuração Necessária</p>
                  <p>
                    Para executar testes automatizados, você precisa de um GitHub Personal Access Token 
                    com permissões <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">repo</code> e <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">workflow</code>.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">⚠️ Runner Necessário</p>
                  <p>
                    O <strong>runner do GitHub Actions deve estar ativo</strong> para executar os testes. 
                    Os testes rodam via web usando a baseURL dos ambientes (homologação/produção).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub Personal Access Token
              </label>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                O token será armazenado localmente no seu navegador
              </p>
            </div>

            <button
              onClick={handleSaveToken}
              disabled={!tokenInput.trim()}
              className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              Salvar Token
            </button>

            <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Ainda não tem um token?
              </p>
              <a
                href="https://github.com/settings/tokens/new?scopes=repo,workflow&description=TestWise%20Automation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Criar Token no GitHub
              </a>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Sobre os Testes Automatizados
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Executar testes Playwright do repositório OrquestraIA/TestsDoc-Simples</li>
              <li>• Monitorar status das execuções em tempo real</li>
              <li>• Visualizar relatórios HTML publicados no GitHub Pages</li>
              <li>• Executar testes específicos ou suíte completa</li>
              <li>• Escolher ambiente (Homologação ou Produção)</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Testes Automatizados
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Playwright - OrquestraIA/TestsDoc-Simples
          </p>
        </div>
        <button
          onClick={() => setShowTokenConfig(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          title="Configurações"
        >
          <Settings className="w-4 h-4" />
          Configurar Token
        </button>
      </div>

      <div className="h-full">
        <TestRunsPanel
          githubToken={githubToken}
          onClose={() => {}}
          isEmbedded={true}
        />
      </div>

      {/* Modal de Configuração */}
      {showTokenConfig && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Configurar Token
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub Personal Access Token
                </label>
                <input
                  type="password"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveToken}
                  disabled={!tokenInput.trim()}
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Salvar
                </button>
                <button
                  onClick={() => {
                    setShowTokenConfig(false)
                    setTokenInput('')
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600"
                >
                  Cancelar
                </button>
              </div>

              {githubToken && (
                <button
                  onClick={handleRemoveToken}
                  className="w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  Remover Token Configurado
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
