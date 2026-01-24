import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  CheckCircle, XCircle, Clock, AlertTriangle, ArrowLeft, Save,
  Upload, Image, Video, X, Play, Pause, ChevronDown, ChevronUp,
  FileText, Camera, Eye, Maximize2, Timer
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import MediaViewer from '../components/MediaViewer'

const STEP_STATUS = {
  'pending': { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', label: 'Pendente' },
  'passed': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', label: 'Passou' },
  'failed': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', label: 'Falhou' },
  'blocked': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', label: 'Bloqueado' }
}

// Formatar tempo em HH:MM:SS
const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function TestExecutionPage({ 
  execution, 
  testCase,
  onUpdateExecution,
  onFinishExecution,
  onUploadEvidence,
  currentUser 
}) {
  const navigate = useNavigate()
  const [steps, setSteps] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [expandedStep, setExpandedStep] = useState(0)
  const [notes, setNotes] = useState('')
  const [viewingMedia, setViewingMedia] = useState(null) // { media: [], index: 0 }
  
  // Cronômetro
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    console.log('[TestExecution] Carregando execução:', execution?.id, 'steps salvos:', execution?.steps?.length)
    
    if (execution?.steps && execution.steps.length > 0) {
      // Carregar steps salvos da execução
      setSteps(execution.steps)
      console.log('[TestExecution] Steps carregados da execução:', execution.steps)
    } else if (testCase?.steps) {
      // Inicializar passos com status pendente (apenas se não há steps salvos)
      setSteps(testCase.steps.map(s => ({
        ...s,
        status: 'pending',
        actualResult: '',
        evidences: []
      })))
      console.log('[TestExecution] Steps inicializados do testCase')
    }
    if (execution?.notes) {
      setNotes(execution.notes)
    }
    // Recuperar tempo salvo se existir
    if (execution?.elapsedTime) {
      setElapsedTime(execution.elapsedTime)
    }
  }, [execution?.id, execution?.steps, execution?.notes, execution?.elapsedTime, testCase])

  // Iniciar cronômetro automaticamente quando a página carrega
  useEffect(() => {
    if (execution && !execution.finishedAt && steps.length > 0) {
      startTimer()
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [execution?.id, steps.length])

  // Parar cronômetro quando todos os passos forem concluídos
  useEffect(() => {
    if (steps.length > 0) {
      const allCompleted = steps.every(s => s.status !== 'pending')
      if (allCompleted && isTimerRunning) {
        stopTimer()
      }
    }
  }, [steps])

  const startTimer = () => {
    if (isTimerRunning) return
    setIsTimerRunning(true)
    startTimeRef.current = Date.now() - (elapsedTime * 1000)
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsTimerRunning(false)
  }

  const updateStepStatus = (index, status) => {
    const newSteps = [...steps]
    newSteps[index].status = status
    setSteps(newSteps)
    
    // Auto-expandir próximo passo pendente
    if (status !== 'pending') {
      const nextPending = newSteps.findIndex((s, i) => i > index && s.status === 'pending')
      if (nextPending !== -1) {
        setExpandedStep(nextPending)
      }
    }
  }

  const updateStepActualResult = (index, actualResult) => {
    const newSteps = [...steps]
    newSteps[index].actualResult = actualResult
    setSteps(newSteps)
  }

  const handleEvidenceUpload = async (index, files) => {
    if (!onUploadEvidence || !files.length) return
    
    setLoadingMessage('Enviando evidência...')
    setLoading(true)
    
    try {
      const newSteps = [...steps]
      for (const file of files) {
        const url = await onUploadEvidence(file, execution.id, index)
        newSteps[index].evidences = [
          ...(newSteps[index].evidences || []),
          { url, type: file.type.startsWith('video') ? 'video' : 'image', name: file.name }
        ]
      }
      setSteps(newSteps)
    } catch (error) {
      console.error('Erro ao enviar evidência:', error)
      alert('Erro ao enviar evidência. Tente novamente.')
    } finally {
      setLoading(false)
      setLoadingMessage('')
    }
  }

  const removeEvidence = (stepIndex, evidenceIndex) => {
    const newSteps = [...steps]
    newSteps[stepIndex].evidences.splice(evidenceIndex, 1)
    setSteps(newSteps)
  }

  const handleSave = async () => {
    if (!onUpdateExecution) return
    setLoadingMessage('Salvando progresso...')
    setLoading(true)
    try {
      await onUpdateExecution(execution.id, { steps, notes, elapsedTime })
      alert('Progresso salvo com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar progresso. Tente novamente.')
    } finally {
      setLoading(false)
      setLoadingMessage('')
    }
  }

  const handleFinish = async () => {
    const pendingSteps = steps.filter(s => s.status === 'pending')
    if (pendingSteps.length > 0) {
      if (!window.confirm(`Ainda há ${pendingSteps.length} passo(s) pendente(s). Deseja finalizar mesmo assim?`)) {
        return
      }
    }

    // Determinar status final
    const hasFailedSteps = steps.some(s => s.status === 'failed')
    const hasBlockedSteps = steps.some(s => s.status === 'blocked')
    const allPassed = steps.every(s => s.status === 'passed')
    
    let finalStatus = 'passed'
    if (hasFailedSteps) finalStatus = 'failed'
    else if (hasBlockedSteps) finalStatus = 'blocked'
    else if (!allPassed) finalStatus = 'blocked' // Se tem pendentes

    if (!window.confirm(`Finalizar execução como "${finalStatus === 'passed' ? 'APROVADO' : finalStatus === 'failed' ? 'REPROVADO' : 'BLOQUEADO'}"?`)) {
      return
    }

    stopTimer() // Parar cronômetro ao finalizar
    setLoadingMessage('Finalizando execução...')
    setLoading(true)
    try {
      await onFinishExecution(execution.id, { steps, status: finalStatus, notes, elapsedTime })
      navigate('/casos-de-teste')
    } finally {
      setLoading(false)
      setLoadingMessage('')
    }
  }

  // Estatísticas
  const stats = {
    total: steps.length,
    passed: steps.filter(s => s.status === 'passed').length,
    failed: steps.filter(s => s.status === 'failed').length,
    blocked: steps.filter(s => s.status === 'blocked').length,
    pending: steps.filter(s => s.status === 'pending').length
  }
  const progress = stats.total > 0 ? ((stats.total - stats.pending) / stats.total) * 100 : 0

  if (!testCase || !execution) {
    return (
      <div className="text-center py-16">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Execução não encontrada</h3>
        <button onClick={() => navigate('/casos-de-teste')} className="btn-primary mt-4">
          Voltar para Casos de Teste
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {loading && <LoadingSpinner message={loadingMessage} />}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <button 
            onClick={() => navigate('/casos-de-teste')}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Execução de Teste</h1>
          <p className="text-gray-600 mt-1">{testCase.title}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Cronômetro */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isTimerRunning ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-slate-700'
          }`}>
            <Timer className={`w-5 h-5 ${isTimerRunning ? 'text-green-600' : 'text-gray-500'}`} />
            <span className={`font-mono text-lg font-bold ${
              isTimerRunning ? 'text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {formatTime(elapsedTime)}
            </span>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-secondary flex items-center gap-2">
              <Save className="w-4 h-4" />
              Salvar
            </button>
            <button onClick={handleFinish} className="btn-primary flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Finalizar
            </button>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Progresso da Execução</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className={`h-3 rounded-full transition-all ${stats.failed > 0 ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            Passou: {stats.passed}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            Falhou: {stats.failed}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            Bloqueado: {stats.blocked}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            Pendente: {stats.pending}
          </span>
        </div>
      </div>

      {/* Preconditions */}
      {testCase.preconditions && (
        <div className="card p-4 bg-yellow-50 border-yellow-200">
          <h3 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Pré-condições
          </h3>
          <p className="text-yellow-700 text-sm">{testCase.preconditions}</p>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const statusStyle = STEP_STATUS[step.status]
          const isExpanded = expandedStep === index

          return (
            <div 
              key={index} 
              className={`card overflow-hidden border-2 ${statusStyle.border} transition-all`}
            >
              {/* Step Header */}
              <div 
                className={`p-4 ${statusStyle.bg} cursor-pointer`}
                onClick={() => setExpandedStep(isExpanded ? -1 : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.status === 'passed' ? 'bg-green-500 text-white' :
                      step.status === 'failed' ? 'bg-red-500 text-white' :
                      step.status === 'blocked' ? 'bg-orange-500 text-white' :
                      'bg-gray-300 dark:bg-slate-600 text-gray-600 dark:text-gray-200'
                    }`}>
                      {step.status === 'passed' ? <CheckCircle className="w-5 h-5" /> :
                       step.status === 'failed' ? <XCircle className="w-5 h-5" /> :
                       step.status === 'blocked' ? <AlertTriangle className="w-5 h-5" /> :
                       <span className="font-bold">{index + 1}</span>}
                    </div>
                    <div>
                      <span className={`text-xs font-medium ${statusStyle.text}`}>
                        Passo {index + 1} - {statusStyle.label}
                      </span>
                      <p className="font-medium text-gray-900 line-clamp-1">{step.action}</p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </div>
              </div>

              {/* Step Content */}
              {isExpanded && (
                <div className="p-4 space-y-4">
                  {/* Action */}
                  <div>
                    <label className="text-xs font-medium text-gray-500">Ação</label>
                    <p className="text-gray-900 mt-1">{step.action}</p>
                  </div>

                  {/* Expected Result */}
                  {step.expectedResult && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">Resultado Esperado</label>
                      <p className="text-gray-700 mt-1 bg-blue-50 p-3 rounded-lg">{step.expectedResult}</p>
                    </div>
                  )}

                  {/* Actual Result */}
                  <div>
                    <label className="text-xs font-medium text-gray-500">Resultado Obtido</label>
                    <textarea
                      value={step.actualResult || ''}
                      onChange={(e) => updateStepActualResult(index, e.target.value)}
                      className="input-field w-full mt-1"
                      rows={2}
                      placeholder="Descreva o resultado obtido (opcional)..."
                    />
                  </div>

                  {/* Evidence Upload */}
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-2 block">Evidências</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {step.evidences?.map((evidence, eIndex) => (
                        <div key={eIndex} className="relative group">
                          <button
                            onClick={() => setViewingMedia({ media: step.evidences, index: eIndex })}
                            className="cursor-pointer"
                          >
                            {evidence.type === 'video' ? (
                              <div className="relative w-24 h-24">
                                <video src={evidence.url} className="w-24 h-24 object-cover rounded-lg" />
                                <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center hover:bg-black/50 transition-colors">
                                  <Play className="w-8 h-8 text-white" />
                                </div>
                              </div>
                            ) : (
                              <img src={evidence.url} alt="" className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity" />
                            )}
                          </button>
                          {/* Botão para remover */}
                          <button
                            onClick={() => removeEvidence(index, eIndex)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remover"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
                        <Camera className="w-6 h-6 text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">Adicionar</span>
                        <input
                          type="file"
                          accept="image/*,video/mp4,video/webm,video/quicktime,video/x-msvideo"
                          multiple
                          onChange={(e) => handleEvidenceUpload(index, Array.from(e.target.files))}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Status Buttons */}
                  <div className="flex gap-2 pt-2 border-t">
                    <button
                      onClick={() => updateStepStatus(index, 'passed')}
                      className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                        step.status === 'passed' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                      Passou
                    </button>
                    <button
                      onClick={() => updateStepStatus(index, 'failed')}
                      className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                        step.status === 'failed' 
                          ? 'bg-red-500 text-white' 
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      <XCircle className="w-5 h-5" />
                      Falhou
                    </button>
                    <button
                      onClick={() => updateStepStatus(index, 'blocked')}
                      className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                        step.status === 'blocked' 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      }`}
                    >
                      <AlertTriangle className="w-5 h-5" />
                      Bloqueado
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Notes */}
      <div className="card p-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Observações Gerais
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input-field w-full"
          rows={3}
          placeholder="Adicione observações sobre a execução do teste..."
        />
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between">
        <button 
          onClick={() => navigate('/casos-de-teste')}
          className="btn-secondary"
        >
          Cancelar
        </button>
        <div className="flex gap-2">
          <button onClick={handleSave} className="btn-secondary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Salvar Progresso
          </button>
          <button onClick={handleFinish} className="btn-primary flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Finalizar Execução
          </button>
        </div>
      </div>

      {/* Media Viewer Modal */}
      {viewingMedia && (
        <MediaViewer
          media={viewingMedia.media}
          initialIndex={viewingMedia.index}
          onClose={() => setViewingMedia(null)}
        />
      )}
    </div>
  )
}
