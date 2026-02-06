import { useState, useEffect, useRef } from 'react'
import { Loader2, RefreshCw, Download, Maximize2, Minimize2, Terminal, FileText, ExternalLink } from 'lucide-react'
import { getWorkflowJobs, getJobLogs, getReportUrl, checkReportAvailability } from '../services/githubActions'

export default function TestLogsViewer({ run, githubToken, autoRefresh = true }) {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [logs, setLogs] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingLogs, setLoadingLogs] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)
  const [showReport, setShowReport] = useState(false)
  const [reportUrl, setReportUrl] = useState(null)
  const [reportAvailable, setReportAvailable] = useState(false)
  const [checkingReport, setCheckingReport] = useState(false)
  const logsEndRef = useRef(null)
  const logsContainerRef = useRef(null)

  // Carregar jobs da execução
  useEffect(() => {
    if (!run || !githubToken) return
    
    // Limpar logs e job selecionado ao trocar de execução
    setLogs('')
    setSelectedJob(null)
    
    loadJobs()
    checkReport()
  }, [run?.id, githubToken])

  // Verificar disponibilidade do relatório
  const checkReport = async () => {
    if (!run || run.status !== 'completed') return
    
    setCheckingReport(true)
    const url = getReportUrl()
    setReportUrl(url)
    
    try {
      const available = await checkReportAvailability(url)
      setReportAvailable(available)
    } catch (error) {
      console.error('Erro ao verificar relatório:', error)
      setReportAvailable(false)
    } finally {
      setCheckingReport(false)
    }
  }

  // Auto-refresh dos jobs enquanto estiver rodando
  useEffect(() => {
    if (!autoRefresh || !run || !githubToken) return
    if (run.status !== 'in_progress' && run.status !== 'queued') return

    const interval = setInterval(loadJobs, 5000) // Atualizar a cada 5 segundos
    return () => clearInterval(interval)
  }, [run?.status, autoRefresh, githubToken])

  // Auto-refresh dos logs do job selecionado (apenas quando completado)
  useEffect(() => {
    if (!autoRefresh || !selectedJob || !githubToken) return
    // Não fazer auto-refresh de logs durante execução pois a API não disponibiliza
    if (selectedJob.status === 'in_progress' || selectedJob.status === 'queued') return

    // Carregar logs quando o job finalizar
    if (selectedJob.status === 'completed' && !logs) {
      loadLogs(selectedJob.id)
    }
  }, [selectedJob?.id, selectedJob?.status, autoRefresh, githubToken])

  // Auto-scroll para o final dos logs
  useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs, autoScroll])

  const loadJobs = async () => {
    if (!run || !githubToken) return
    
    setLoading(true)
    try {
      const jobsList = await getWorkflowJobs(githubToken, run.id)
      setJobs(jobsList)
      
      // Se não há job selecionado, selecionar o primeiro automaticamente
      if (!selectedJob && jobsList.length > 0) {
        setSelectedJob(jobsList[0])
        loadLogs(jobsList[0].id)
      }
      // Atualizar job selecionado se mudou
      else if (selectedJob) {
        const updatedJob = jobsList.find(j => j.id === selectedJob.id)
        if (updatedJob) {
          setSelectedJob(updatedJob)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadLogs = async (jobId) => {
    if (!githubToken) return
    
    // Não tentar carregar logs se o job ainda está rodando
    if (selectedJob && (selectedJob.status === 'in_progress' || selectedJob.status === 'queued')) {
      return
    }
    
    setLoadingLogs(true)
    try {
      const logsText = await getJobLogs(githubToken, jobId)
      setLogs(logsText)
    } catch (error) {
      console.error('Erro ao carregar logs:', error)
      setLogs(`Erro ao carregar logs: ${error.message}`)
    } finally {
      setLoadingLogs(false)
    }
  }

  const handleJobSelect = (job) => {
    setSelectedJob(job)
    setLogs('') // Limpar logs anteriores
    
    // Só carregar logs se o job já finalizou
    if (job.status === 'completed') {
      loadLogs(job.id)
    }
  }

  const handleDownloadLogs = () => {
    const blob = new Blob([logs], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `test-logs-run-${run.runNumber}-job-${selectedJob.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getStepIcon = (step) => {
    if (step.status === 'in_progress') {
      return <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
    }
    if (step.conclusion === 'success') {
      return <span className="text-green-500">✓</span>
    }
    if (step.conclusion === 'failure') {
      return <span className="text-red-500">✗</span>
    }
    return <span className="text-gray-400">○</span>
  }

  if (!run) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        <Terminal className="w-8 h-8 mr-2" />
        Selecione uma execução para ver os logs
      </div>
    )
  }

  return (
    <div className={`flex flex-col h-full ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-slate-900' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              Logs - Run #{run.runNumber}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {jobs.length} job(s) • {selectedJob?.name || 'Selecione um job'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={loadJobs}
            disabled={loading}
            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors"
            title="Atualizar"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          {logs && (
            <button
              onClick={handleDownloadLogs}
              className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors"
              title="Baixar logs"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
          
          {reportUrl && reportAvailable && run.status === 'completed' && (
            <button
              onClick={() => setShowReport(true)}
              className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
              title="Ver Relatório Customizado - Mostra o último relatório publicado"
            >
              <FileText className="w-4 h-4" />
              Ver Último Relatório
            </button>
          )}
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors"
            title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          
          <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="rounded"
            />
            Auto-scroll
          </label>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Jobs Sidebar */}
        <div className="w-64 border-r border-gray-200 dark:border-slate-700 overflow-y-auto bg-gray-50 dark:bg-slate-800/50">
          {loading && jobs.length === 0 ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              Nenhum job encontrado
            </div>
          ) : (
            <div className="p-2">
              {jobs.map(job => (
                <div key={job.id} className="mb-2">
                  <button
                    onClick={() => handleJobSelect(job)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedJob?.id === job.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {job.status === 'in_progress' && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                      {job.status === 'completed' && job.conclusion === 'success' && <span className="text-green-500">✓</span>}
                      {job.status === 'completed' && job.conclusion === 'failure' && <span className="text-red-500">✗</span>}
                      <span className="text-sm font-medium truncate">{job.name}</span>
                    </div>
                    
                    {/* Steps */}
                    {job.steps && job.steps.length > 0 && (
                      <div className="space-y-1 ml-6">
                        {job.steps.slice(0, 5).map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            {getStepIcon(step)}
                            <span className="truncate text-gray-600 dark:text-gray-400">{step.name}</span>
                          </div>
                        ))}
                        {job.steps.length > 5 && (
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            +{job.steps.length - 5} mais...
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logs Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {loadingLogs && !logs ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : !selectedJob ? (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              Selecione um job para ver os logs
            </div>
          ) : selectedJob.status === 'in_progress' || selectedJob.status === 'queued' ? (
            <div className="flex-1 flex items-center justify-center bg-gray-900 text-gray-100">
              <div className="text-center max-w-md p-8">
                <div className="mb-6 flex items-center justify-center gap-4">
                  <img 
                    src="logo-orquestraia-transp.png" 
                    alt="OrquestraIA" 
                    className="h-16 animate-pulse"
                  />
                  <img 
                    src="logo.png" 
                    alt="OM30" 
                    className="h-16 animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {selectedJob.status === 'queued' ? 'Teste na fila...' : 'Teste em execução...'}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Os logs serão exibidos após a conclusão da execução dos testes.
                </p>
                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 text-left">
                  <p className="text-xs text-blue-300">
                    💡 <strong>Nota:</strong> A API do GitHub Actions disponibiliza os logs completos apenas após a finalização da execução.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              ref={logsContainerRef}
              className="flex-1 overflow-auto p-4 bg-gray-900 text-gray-100 font-mono text-xs"
            >
              <pre className="whitespace-pre-wrap break-words">
                {logs || 'Aguardando logs...'}
              </pre>
              <div ref={logsEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Modal do Relatório Customizado */}
      {showReport && reportUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-[95vw] h-[95vh] flex flex-col overflow-hidden">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Relatório Customizado - Run #{run.runNumber}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Dashboard de Testes E2E
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href={reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Abrir em Nova Aba
                </a>
                <button
                  onClick={() => setShowReport(false)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Iframe do Relatório */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={reportUrl}
                className="w-full h-full border-0"
                title="Relatório Customizado de Testes"
                sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
                allow="fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
