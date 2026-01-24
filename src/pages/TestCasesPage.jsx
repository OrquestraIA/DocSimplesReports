import { useState, useMemo } from 'react'
import { 
  Plus, Search, Filter, Play, Edit2, Trash2, Eye, CheckCircle, XCircle, 
  Clock, FileText, ChevronDown, ChevronRight, AlertTriangle, Copy,
  MoreVertical, PlayCircle, History
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import MediaViewer from '../components/MediaViewer'

const STATUS_COLORS = {
  'draft': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Rascunho' },
  'ready': { bg: 'bg-green-100', text: 'text-green-700', label: 'Pronto' },
  'deprecated': { bg: 'bg-red-100', text: 'text-red-700', label: 'Obsoleto' }
}

const PRIORITY_COLORS = {
  'low': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Baixa' },
  'medium': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Média' },
  'high': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Alta' },
  'critical': { bg: 'bg-red-100', text: 'text-red-700', label: 'Crítica' }
}

const EXECUTION_STATUS = {
  'not_executed': { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Não Executado' },
  'in_progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em Execução' },
  'passed': { bg: 'bg-green-100', text: 'text-green-700', label: 'Aprovado' },
  'failed': { bg: 'bg-red-100', text: 'text-red-700', label: 'Reprovado' },
  'blocked': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Bloqueado' }
}

export default function TestCasesPage({ 
  testCases = [], 
  executions = [],
  onCreateTestCase, 
  onUpdateTestCase, 
  onDeleteTestCase,
  onStartExecution,
  currentUser 
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterModule, setFilterModule] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTestCase, setEditingTestCase] = useState(null)
  const [viewingTestCase, setViewingTestCase] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')

  // Módulos únicos
  const modules = useMemo(() => {
    const uniqueModules = [...new Set(testCases.map(tc => tc.module).filter(Boolean))]
    return uniqueModules.sort()
  }, [testCases])

  // Filtrar casos de teste
  const filteredTestCases = useMemo(() => {
    return testCases.filter(tc => {
      const matchesSearch = 
        tc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tc.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tc.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || tc.status === filterStatus
      const matchesPriority = filterPriority === 'all' || tc.priority === filterPriority
      const matchesModule = filterModule === 'all' || tc.module === filterModule
      return matchesSearch && matchesStatus && matchesPriority && matchesModule
    })
  }, [testCases, searchTerm, filterStatus, filterPriority, filterModule])

  // Obter última execução de um caso de teste
  const getLastExecution = (testCaseId) => {
    return executions.find(e => e.testCaseId === testCaseId)
  }

  // Estatísticas
  const stats = useMemo(() => {
    const total = testCases.length
    const ready = testCases.filter(tc => tc.status === 'ready').length
    const draft = testCases.filter(tc => tc.status === 'draft').length
    
    // Estatísticas de execução
    const executed = testCases.filter(tc => {
      const lastExec = getLastExecution(tc.id)
      return lastExec && lastExec.status !== 'in_progress'
    }).length
    const passed = testCases.filter(tc => {
      const lastExec = getLastExecution(tc.id)
      return lastExec?.status === 'passed'
    }).length
    const failed = testCases.filter(tc => {
      const lastExec = getLastExecution(tc.id)
      return lastExec?.status === 'failed'
    }).length

    return { total, ready, draft, executed, passed, failed }
  }, [testCases, executions])

  const handleStartExecution = async (testCase) => {
    if (!onStartExecution) return
    setLoadingMessage('Iniciando execução...')
    setLoading(true)
    try {
      await onStartExecution(testCase)
    } finally {
      setLoading(false)
      setLoadingMessage('')
    }
  }

  const handleDeleteTestCase = async (testCase) => {
    if (!onDeleteTestCase) return
    if (!confirm(`Tem certeza que deseja excluir o caso de teste "${testCase.title}"?`)) return
    
    setLoadingMessage('Excluindo caso de teste...')
    setLoading(true)
    try {
      await onDeleteTestCase(testCase.id)
    } finally {
      setLoading(false)
      setLoadingMessage('')
    }
  }

  return (
    <div className="space-y-6">
      {loading && <LoadingSpinner message={loadingMessage} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Casos de Teste</h1>
          <p className="text-gray-600 mt-1">
            {testCases.length > 0 
              ? `${testCases.length} casos de teste cadastrados`
              : 'Crie seus casos de teste para execução'}
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo Caso de Teste
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.ready}</p>
              <p className="text-xs text-gray-500">Prontos</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Edit2 className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
              <p className="text-xs text-gray-500">Rascunhos</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{stats.executed}</p>
              <p className="text-xs text-gray-500">Executados</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.passed}</p>
              <p className="text-xs text-gray-500">Aprovados</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              <p className="text-xs text-gray-500">Reprovados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título, ID ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field md:w-36"
          >
            <option value="all">Todos Status</option>
            <option value="ready">Pronto</option>
            <option value="draft">Rascunho</option>
            <option value="deprecated">Obsoleto</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="input-field md:w-36"
          >
            <option value="all">Prioridade</option>
            <option value="critical">Crítica</option>
            <option value="high">Alta</option>
            <option value="medium">Média</option>
            <option value="low">Baixa</option>
          </select>
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            className="input-field md:w-40"
          >
            <option value="all">Todos Módulos</option>
            {modules.map(mod => (
              <option key={mod} value={mod}>{mod}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Test Cases List */}
      {filteredTestCases.length === 0 ? (
        <div className="card text-center py-16">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {testCases.length === 0 ? 'Nenhum caso de teste cadastrado' : 'Nenhum resultado encontrado'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {testCases.length === 0 
              ? 'Crie seu primeiro caso de teste para começar a executar testes estruturados.'
              : 'Tente ajustar os filtros ou termo de busca.'}
          </p>
          {testCases.length === 0 && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Criar Caso de Teste
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTestCases.map((testCase) => {
            const lastExecution = getLastExecution(testCase.id)
            const execStatus = lastExecution?.status || 'not_executed'
            const statusStyle = STATUS_COLORS[testCase.status] || STATUS_COLORS.draft
            const priorityStyle = PRIORITY_COLORS[testCase.priority] || PRIORITY_COLORS.medium
            const execStyle = EXECUTION_STATUS[execStatus]

            return (
              <div key={testCase.id} className="card p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                        {statusStyle.label}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
                        {priorityStyle.label}
                      </span>
                      {testCase.module && (
                        <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                          {testCase.module}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{testCase.title}</h3>
                    {testCase.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{testCase.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {testCase.steps?.length || 0} passos
                      </span>
                      {lastExecution && (
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded ${execStyle.bg} ${execStyle.text}`}>
                          {execStatus === 'passed' && <CheckCircle className="w-3 h-3" />}
                          {execStatus === 'failed' && <XCircle className="w-3 h-3" />}
                          {execStatus === 'in_progress' && <Clock className="w-3 h-3" />}
                          {execStyle.label}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewingTestCase(testCase)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                      title="Visualizar"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingTestCase(testCase)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {testCase.status === 'ready' && (
                      <button
                        onClick={() => handleStartExecution(testCase)}
                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg"
                        title="Executar Teste"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTestCase(testCase)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      {(showCreateModal || editingTestCase) && (
        <TestCaseModal
          testCase={editingTestCase}
          onSave={async (data) => {
            setLoadingMessage(editingTestCase ? 'Salvando alterações...' : 'Criando caso de teste...')
            setLoading(true)
            try {
              if (editingTestCase) {
                await onUpdateTestCase(editingTestCase.id, data)
              } else {
                await onCreateTestCase(data)
              }
              setShowCreateModal(false)
              setEditingTestCase(null)
            } finally {
              setLoading(false)
              setLoadingMessage('')
            }
          }}
          onClose={() => {
            setShowCreateModal(false)
            setEditingTestCase(null)
          }}
        />
      )}

      {/* View Modal */}
      {viewingTestCase && (
        <TestCaseViewModal
          testCase={viewingTestCase}
          lastExecution={getLastExecution(viewingTestCase.id)}
          onClose={() => setViewingTestCase(null)}
          onExecute={() => {
            setViewingTestCase(null)
            handleStartExecution(viewingTestCase)
          }}
          onEdit={() => {
            setViewingTestCase(null)
            setEditingTestCase(viewingTestCase)
          }}
        />
      )}
    </div>
  )
}

// Modal para criar/editar caso de teste
function TestCaseModal({ testCase, onSave, onClose }) {
  const [title, setTitle] = useState(testCase?.title || '')
  const [description, setDescription] = useState(testCase?.description || '')
  const [module, setModule] = useState(testCase?.module || '')
  const [priority, setPriority] = useState(testCase?.priority || 'medium')
  const [status, setStatus] = useState(testCase?.status || 'draft')
  const [preconditions, setPreconditions] = useState(testCase?.preconditions || '')
  const [steps, setSteps] = useState(testCase?.steps || [{ action: '', expectedResult: '' }])

  const addStep = () => {
    setSteps([...steps, { action: '', expectedResult: '' }])
  }

  const removeStep = (index) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index))
    }
  }

  const updateStep = (index, field, value) => {
    const newSteps = [...steps]
    newSteps[index][field] = value
    setSteps(newSteps)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('O título é obrigatório')
      return
    }
    if (steps.some(s => !s.action.trim())) {
      alert('Todos os passos devem ter uma ação definida')
      return
    }
    onSave({
      title: title.trim(),
      description: description.trim(),
      module: module.trim(),
      priority,
      status,
      preconditions: preconditions.trim(),
      steps: steps.map((s, i) => ({ ...s, order: i + 1 }))
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full shadow-2xl my-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {testCase ? 'Editar Caso de Teste' : 'Novo Caso de Teste'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Informações Básicas */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field w-full"
                placeholder="Ex: Validar login com credenciais válidas"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Módulo
              </label>
              <input
                type="text"
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className="input-field w-full"
                placeholder="Ex: Autenticação"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridade
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="critical">Crítica</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="draft">Rascunho</option>
                  <option value="ready">Pronto</option>
                  <option value="deprecated">Obsoleto</option>
                </select>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field w-full"
                rows={2}
                placeholder="Descreva o objetivo deste caso de teste..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pré-condições
              </label>
              <textarea
                value={preconditions}
                onChange={(e) => setPreconditions(e.target.value)}
                className="input-field w-full"
                rows={2}
                placeholder="Ex: Usuário deve estar logado no sistema..."
              />
            </div>
          </div>

          {/* Passos do Teste */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Passos do Teste *
              </label>
              <button
                type="button"
                onClick={addStep}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Adicionar Passo
              </button>
            </div>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary-600">{index + 1}</span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Ação *
                        </label>
                        <textarea
                          value={step.action}
                          onChange={(e) => updateStep(index, 'action', e.target.value)}
                          className="input-field w-full text-sm"
                          rows={2}
                          placeholder="Descreva a ação a ser executada..."
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Resultado Esperado
                        </label>
                        <textarea
                          value={step.expectedResult}
                          onChange={(e) => updateStep(index, 'expectedResult', e.target.value)}
                          className="input-field w-full text-sm"
                          rows={2}
                          placeholder="Descreva o resultado esperado..."
                        />
                      </div>
                    </div>
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary"
          >
            {testCase ? 'Salvar Alterações' : 'Criar Caso de Teste'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Modal para visualizar caso de teste
function TestCaseViewModal({ testCase, lastExecution, onClose, onExecute, onEdit }) {
  const [viewingMedia, setViewingMedia] = useState(null)
  const statusStyle = STATUS_COLORS[testCase.status] || STATUS_COLORS.draft
  const priorityStyle = PRIORITY_COLORS[testCase.priority] || PRIORITY_COLORS.medium
  const execStatus = lastExecution?.status || 'not_executed'
  const execStyle = EXECUTION_STATUS[execStatus]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full shadow-2xl my-8">
        <div className="p-6 border-b">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                  {statusStyle.label}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
                  {priorityStyle.label}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{testCase.title}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <XCircle className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Info */}
          <div className="grid md:grid-cols-2 gap-4">
            {testCase.module && (
              <div>
                <label className="text-xs font-medium text-gray-500">Módulo</label>
                <p className="text-gray-900">{testCase.module}</p>
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-gray-500">Última Execução</label>
              <p className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${execStyle.bg} ${execStyle.text} text-sm`}>
                {execStyle.label}
              </p>
            </div>
          </div>

          {testCase.description && (
            <div>
              <label className="text-xs font-medium text-gray-500">Descrição</label>
              <p className="text-gray-700 mt-1">{testCase.description}</p>
            </div>
          )}

          {testCase.preconditions && (
            <div>
              <label className="text-xs font-medium text-gray-500">Pré-condições</label>
              <p className="text-gray-700 mt-1 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                {testCase.preconditions}
              </p>
            </div>
          )}

          {/* Steps */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-3 block">
              Passos do Teste ({testCase.steps?.length || 0})
            </label>
            <div className="space-y-3">
              {testCase.steps?.map((step, index) => {
                // Buscar dados da última execução para este passo
                const execStep = lastExecution?.steps?.[index]
                const stepStatus = execStep?.status
                const stepStatusStyle = stepStatus === 'passed' ? 'bg-green-100 border-green-300' :
                                        stepStatus === 'failed' ? 'bg-red-100 border-red-300' :
                                        stepStatus === 'blocked' ? 'bg-orange-100 border-orange-300' :
                                        'bg-gray-50'
                
                return (
                  <div key={index} className={`p-4 rounded-lg border ${stepStatusStyle}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        stepStatus === 'passed' ? 'bg-green-500 text-white' :
                        stepStatus === 'failed' ? 'bg-red-500 text-white' :
                        stepStatus === 'blocked' ? 'bg-orange-500 text-white' :
                        'bg-primary-100'
                      }`}>
                        {stepStatus === 'passed' ? <CheckCircle className="w-4 h-4" /> :
                         stepStatus === 'failed' ? <XCircle className="w-4 h-4" /> :
                         stepStatus === 'blocked' ? <AlertTriangle className="w-4 h-4" /> :
                         <span className="text-sm font-bold text-primary-600">{index + 1}</span>}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{step.action}</p>
                        {step.expectedResult && (
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium text-gray-500">Esperado:</span> {step.expectedResult}
                          </p>
                        )}
                        {/* Resultado obtido da execução */}
                        {execStep?.actualResult && (
                          <p className="text-sm text-gray-700 mt-2 bg-white/50 p-2 rounded">
                            <span className="font-medium text-gray-500">Resultado:</span> {execStep.actualResult}
                          </p>
                        )}
                        {/* Evidências da execução */}
                        {execStep?.evidences?.length > 0 && (
                          <div className="mt-3">
                            <span className="text-xs font-medium text-gray-500">Evidências:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {execStep.evidences.map((evidence, eIndex) => (
                                <button 
                                  key={eIndex}
                                  onClick={() => setViewingMedia({ media: execStep.evidences, index: eIndex })}
                                  className="relative group cursor-pointer"
                                >
                                  {evidence.type === 'video' ? (
                                    <div className="relative w-16 h-16">
                                      <video src={evidence.url} className="w-16 h-16 object-cover rounded-lg" />
                                      <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center hover:bg-black/50 transition-colors">
                                        <Play className="w-6 h-6 text-white" />
                                      </div>
                                    </div>
                                  ) : (
                                    <img src={evidence.url} alt="" className="w-16 h-16 object-cover rounded-lg hover:opacity-80 transition-opacity" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-between">
          <button onClick={onEdit} className="btn-secondary flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Editar
          </button>
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-secondary">
              Fechar
            </button>
            {testCase.status === 'ready' && (
              <button onClick={onExecute} className="btn-primary flex items-center gap-2">
                <Play className="w-4 h-4" />
                Executar Teste
              </button>
            )}
          </div>
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
