import { useState, useEffect } from 'react'
import { 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink,
  Loader2,
  AlertCircle,
  FileText,
  X,
  Settings
} from 'lucide-react'
import { 
  triggerPlaywrightTests, 
  listWorkflowRuns, 
  getWorkflowRun,
  cancelWorkflowRun,
  getReportUrl,
  checkReportAvailability,
  checkRunnersAvailability
} from '../services/githubActions'
import TestLogsViewer from './TestLogsViewer'

const STATUS_STYLES = {
  queued: { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock, label: 'Na Fila' },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Loader2, label: 'Executando' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2, label: 'Concluído' }
}

const CONCLUSION_STYLES = {
  success: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2, label: 'Sucesso' },
  failure: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Falhou' },
  cancelled: { bg: 'bg-gray-100', text: 'text-gray-700', icon: AlertCircle, label: 'Cancelado' }
}

export default function TestRunsPanel({ onClose, githubToken, requirement = null, isEmbedded = false }) {
  const [runs, setRuns] = useState([])
  const [loading, setLoading] = useState(false)
  const [triggering, setTriggering] = useState(false)
  const [testPath, setTestPath] = useState('')
  const [environment, setEnvironment] = useState('homolog')
  const [selectedRun, setSelectedRun] = useState(null)
  const [reportUrl, setReportUrl] = useState(null)
  const [reportAvailable, setReportAvailable] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [showConfig, setShowConfig] = useState(false)
  const [runnersStatus, setRunnersStatus] = useState(null)
  const [checkingRunners, setCheckingRunners] = useState(false)

  // Carregar execuções
  const loadRuns = async () => {
    if (!githubToken) return
    
    setLoading(true)
    try {
      const workflowRuns = await listWorkflowRuns(githubToken, 20)
      setRuns(workflowRuns)
    } catch (error) {
      console.error('Erro ao carregar execuções:', error)
      alert('Erro ao carregar execuções. Verifique o token do GitHub.')
    } finally {
      setLoading(false)
    }
  }

  // Auto-refresh a cada 10 segundos se houver execuções em andamento
  useEffect(() => {
    if (!autoRefresh || !githubToken) return

    const hasRunningTests = runs.some(run => run.status === 'in_progress' || run.status === 'queued')
    if (!hasRunningTests) return

    const interval = setInterval(loadRuns, 10000)
    return () => clearInterval(interval)
  }, [runs, autoRefresh, githubToken])

  // Carregar execuções e status dos runners ao montar
  useEffect(() => {
    loadRuns()
    checkRunners()
  }, [githubToken])

  // Verificar status dos runners
  const checkRunners = async () => {
    if (!githubToken) return
    
    setCheckingRunners(true)
    try {
      const status = await checkRunnersAvailability(githubToken)
      setRunnersStatus(status)
    } catch (error) {
      console.error('Erro ao verificar runners:', error)
    } finally {
      setCheckingRunners(false)
    }
  }

  // Disparar testes
  const handleTriggerTests = async () => {
    if (!githubToken) {
      alert('Token do GitHub não configurado. Configure nas opções.')
      setShowConfig(true)
      return
    }

    // Verificar status dos runners antes de disparar
    await checkRunners()
    
    if (runnersStatus && !runnersStatus.hasAvailable) {
      const message = runnersStatus.online === 0 
        ? '⚠️ Nenhum runner está online no momento. Os testes ficarão na fila até que um runner fique disponível.\n\nDeseja continuar mesmo assim?'
        : `⚠️ Há ${runnersStatus.online} runner(s) online, mas todos estão ocupados. Os testes ficarão na fila.\n\nDeseja continuar mesmo assim?`
      
      if (!confirm(message)) {
        return
      }
    }

    setTriggering(true)
    try {
      await triggerPlaywrightTests(githubToken, testPath, environment)
      alert('Testes disparados com sucesso! Aguarde alguns segundos e atualize a lista.')
      setTestPath('')
      
      // Recarregar após 5 segundos
      setTimeout(() => {
        loadRuns()
        checkRunners()
      }, 5000)
    } catch (error) {
      console.error('Erro ao disparar testes:', error)
      alert(`Erro ao disparar testes: ${error.message}`)
    } finally {
      setTriggering(false)
    }
  }

  // Visualizar detalhes de uma execução
  const handleViewRun = async (run) => {
    setSelectedRun(run)
    
    // Verificar se o report está disponível
    if (run.status === 'completed' && run.conclusion === 'success') {
      const url = getReportUrl(run.runNumber)
      setReportUrl(url)
      
      // Verificar disponibilidade
      const available = await checkReportAvailability(url)
      setReportAvailable(available)
    }
  }

  // Cancelar execução
  const handleCancelRun = async (runId) => {
    if (!confirm('Deseja cancelar esta execução?')) return
    
    try {
      await cancelWorkflowRun(githubToken, runId)
      alert('Execução cancelada com sucesso!')
      loadRuns()
    } catch (error) {
      console.error('Erro ao cancelar execução:', error)
      alert(`Erro ao cancelar execução: ${error.message}`)
    }
  }

  const getStatusStyle = (run) => {
    if (run.status === 'completed' && run.conclusion) {
      return CONCLUSION_STYLES[run.conclusion] || CONCLUSION_STYLES.failure
    }
    return STATUS_STYLES[run.status] || STATUS_STYLES.queued
  }

  if (!githubToken) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Configuração Necessária</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="text-center py-8">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Para usar os testes automatizados, você precisa configurar um GitHub Personal Access Token.
            </p>
            <a
              href="https://github.com/settings/tokens/new?scopes=repo,workflow"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center justify-center gap-2"
            >
              Criar Token no GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Conteúdo principal do painel
  const panelContent = (
    <div className={`bg-white dark:bg-slate-800 ${!isEmbedded ? 'rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh]' : 'h-full'} overflow-hidden flex flex-col`}>
      {/* Header - só mostrar se não for embedded */}
      {!isEmbedded && (
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Testes Automatizados</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Playwright - OrquestraIA/TestsDoc-Simples
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      )}

        {/* Trigger Section */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Executar Testes</h3>
            
            {/* Status dos Runners */}
            {runnersStatus && (
              <div className="flex items-center gap-2">
                {checkingRunners ? (
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Verificando runners...
                  </span>
                ) : runnersStatus.error ? (
                  <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Erro ao verificar runners
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                      runnersStatus.available > 0 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : runnersStatus.online > 0
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        runnersStatus.available > 0 ? 'bg-green-500' : 
                        runnersStatus.online > 0 ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      {runnersStatus.available > 0 
                        ? `${runnersStatus.available} runner(s) disponível` 
                        : runnersStatus.online > 0
                          ? `${runnersStatus.online} runner(s) ocupado`
                          : 'Nenhum runner online'}
                    </span>
                    <button
                      onClick={checkRunners}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded transition-colors"
                      title="Atualizar status dos runners"
                    >
                      <RefreshCw className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={testPath}
                onChange={(e) => setTestPath(e.target.value)}
                placeholder="Caminho do teste (ex: tests/auth/login.spec.ts) ou vazio para todos"
                className="w-full px-3 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="homolog">Homologação</option>
              <option value="prod">Produção</option>
            </select>
            <button
              onClick={handleTriggerTests}
              disabled={triggering}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {triggering ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Disparando...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Executar
                </>
              )}
            </button>
          </div>
          {requirement && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Vinculado ao requisito: {requirement.id} - {requirement.descricao}
            </p>
          )}
        </div>

        {/* Runs List */}
        <div className="flex-1 overflow-hidden flex">
          {/* Lista de execuções */}
          <div className="w-1/2 border-r border-gray-200 dark:border-slate-700 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between bg-gray-50 dark:bg-slate-700/30">
              <h3 className="font-medium text-gray-900 dark:text-white">Execuções Recentes</h3>
              <button
                onClick={loadRuns}
                disabled={loading}
                className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                title="Atualizar"
              >
                <RefreshCw className={`w-4 h-4 text-gray-600 dark:text-gray-400 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {loading && runs.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            ) : runs.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                Nenhuma execução encontrada
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-slate-700">
                {runs.map(run => {
                  const statusStyle = getStatusStyle(run)
                  const StatusIcon = statusStyle.icon
                  const isSelected = selectedRun?.id === run.id

                  return (
                    <div
                      key={run.id}
                      onClick={() => handleViewRun(run)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors ${
                        isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text} flex items-center gap-1`}>
                            <StatusIcon className={`w-3 h-3 ${run.status === 'in_progress' ? 'animate-spin' : ''}`} />
                            {statusStyle.label}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Run #{run.runNumber}
                          </span>
                        </div>
                        {(run.status === 'in_progress' || run.status === 'queued') && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCancelRun(run.id)
                            }}
                            className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        <div>Iniciado: {new Date(run.createdAt).toLocaleString('pt-BR')}</div>
                        <div>Por: {run.actor}</div>
                        <div>Branch: {run.headBranch}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Logs Viewer */}
          <div className="flex-1 overflow-hidden">
            <TestLogsViewer 
              run={selectedRun} 
              githubToken={githubToken}
              autoRefresh={autoRefresh}
            />
          </div>
        </div>
      </div>
  )

  // Retornar com ou sem wrapper de modal
  if (isEmbedded) {
    return panelContent
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {panelContent}
    </div>
  )
}
