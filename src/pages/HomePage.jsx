import { Link } from 'react-router-dom'
import { FileText, FlaskConical, Code, Table2, ArrowRight, CheckCircle2, Clock, XCircle, AlertTriangle, TrendingUp, Lightbulb } from 'lucide-react'

export default function HomePage({ testDocuments, requirements }) {
  // Dados da tabela de REQUISITOS (importedRequirements)
  const totalRequirements = requirements?.length || 0
  const approvedReqs = requirements?.filter(r => r.statusHomolog === 'Aprovado').length || 0
  const failedReqs = requirements?.filter(r => r.statusHomolog === 'Reprovado').length || 0
  const pendingDevReqs = requirements?.filter(r => r.statusHomolog === 'Pendente' || !r.statusHomolog).length || 0
  const inTestReqs = requirements?.filter(r => 
    r.statusHomolog === 'Para_Teste_Homolog' || 
    r.statusHomolog === 'Em Teste' ||
    r.statusHomolog === 'Para_Reteste_Homolog' ||
    r.statusHomolog === 'Em-reteste-homolog'
  ).length || 0
  
  // Requisitos testados = aprovados + reprovados + em teste/reteste
  const testedReqs = approvedReqs + failedReqs + inTestReqs
  
  // Calcular progresso: requisitos testados / total de requisitos
  const progressPercent = totalRequirements > 0 ? Math.round((testedReqs / totalRequirements) * 100) : 0
  const approvalRate = testedReqs > 0 ? Math.round((approvedReqs / testedReqs) * 100) : 0

  // Agrupar por módulo/feature
  const testsByModule = (testDocuments || []).reduce((acc, doc) => {
    const module = doc.module || doc.feature || 'Sem módulo'
    if (!acc[module]) {
      acc[module] = { total: 0, approved: 0, failed: 0, pending: 0 }
    }
    acc[module].total++
    if (doc.status === 'aprovado') acc[module].approved++
    else if (doc.status === 'reprovado') acc[module].failed++
    else acc[module].pending++
    return acc
  }, {})

  // Testes reprovados
  const failedTestsList = (testDocuments || []).filter(d => d.status === 'reprovado')

  // Timeline - ordenar por data
  const sortedTests = [...(testDocuments || [])].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 8)

  // Agrupar timeline por data
  const groupByDate = (tests) => {
    const groups = {}
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    
    tests.forEach(test => {
      const testDate = new Date(test.createdAt).toDateString()
      let label = new Date(test.createdAt).toLocaleDateString('pt-BR')
      if (testDate === today) label = 'Hoje'
      else if (testDate === yesterday) label = 'Ontem'
      
      if (!groups[label]) groups[label] = []
      groups[label].push(test)
    })
    return groups
  }

  const timelineGroups = groupByDate(sortedTests)

  const stats = [
    { label: 'Total de Requisitos', value: totalRequirements, color: 'bg-blue-500' },
    { label: 'Aprovados', value: approvedReqs, color: 'bg-green-500' },
    { label: 'Reprovados', value: failedReqs, color: 'bg-red-500' },
    { label: 'Em Teste', value: inTestReqs, color: 'bg-cyan-500' },
    { label: 'Aguardando Teste', value: pendingDevReqs, color: 'bg-yellow-500' },
  ]

  const quickActions = [
    {
      title: 'Registrar Teste',
      description: 'Colaboradora registra um novo teste de homologação',
      icon: FlaskConical,
      path: '/registro',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Ver Documentos',
      description: 'Visualizar e gerenciar documentos de teste',
      icon: FileText,
      path: '/documentos',
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Gerar Gherkin',
      description: 'Converter testes para formato Gherkin + Playwright',
      icon: Code,
      path: '/gherkin',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Tabela de Partição',
      description: 'Gerenciar requisitos com tabela de partição',
      icon: Table2,
      path: '/particao',
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  const recentTests = (testDocuments || []).slice(-5).reverse()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">TestWise</h1>
        <p className="mt-2 text-gray-600">
          Plataforma completa de QA, Sprints e Gestão de Desenvolvimento
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className={`w-2 h-2 rounded-full ${stat.color} mb-2`}></div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Dashboard de Progresso */}
      {totalRequirements > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Progresso Geral */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                Progresso da Homologação
              </h3>
              <span className="text-2xl font-bold text-primary-600">{progressPercent}%</span>
            </div>
            
            {/* Barra de progresso */}
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div className="h-full flex">
                <div 
                  className="bg-green-500 transition-all duration-500" 
                  style={{ width: `${totalRequirements > 0 ? (approvedReqs / totalRequirements) * 100 : 0}%` }}
                />
                <div 
                  className="bg-red-500 transition-all duration-500" 
                  style={{ width: `${totalRequirements > 0 ? (failedReqs / totalRequirements) * 100 : 0}%` }}
                />
                <div 
                  className="bg-cyan-500 transition-all duration-500" 
                  style={{ width: `${totalRequirements > 0 ? (inTestReqs / totalRequirements) * 100 : 0}%` }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-700">{approvedReqs}</p>
                <p className="text-xs text-green-600">Aprovados</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-red-700">{failedReqs}</p>
                <p className="text-xs text-red-600">Reprovados</p>
              </div>
              <div className="p-2 bg-cyan-50 rounded-lg">
                <Clock className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-cyan-700">{inTestReqs}</p>
                <p className="text-xs text-cyan-600">Em Teste</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-yellow-700">{pendingDevReqs}</p>
                <p className="text-xs text-yellow-600">Aguardando</p>
              </div>
            </div>

            {approvalRate > 0 && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Taxa de aprovação: <span className="font-semibold text-green-600">{approvalRate}%</span>
              </p>
            )}
          </div>

          {/* Progresso por Módulo */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Progresso por Módulo</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {Object.entries(testsByModule).map(([module, data]) => {
                const moduleProgress = Math.round(((data.approved + data.failed) / data.total) * 100)
                const moduleApproval = data.total > 0 ? Math.round((data.approved / data.total) * 100) : 0
                return (
                  <div key={module} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 truncate max-w-[60%]" title={module}>
                        {module}
                      </span>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-green-600">{data.approved}</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-600">{data.total}</span>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full flex">
                        <div 
                          className="bg-green-500 transition-all" 
                          style={{ width: `${(data.approved / data.total) * 100}%` }}
                        />
                        <div 
                          className="bg-red-500 transition-all" 
                          style={{ width: `${(data.failed / data.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Alertas - Testes Reprovados */}
      {failedTestsList.length > 0 && (
        <div className="card border-l-4 border-l-red-500 bg-red-50">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800">Testes Reprovados - Atenção Necessária</h3>
          </div>
          <div className="space-y-2">
            {failedTestsList.slice(0, 5).map(test => (
              <div key={test.id} className="flex items-start gap-2 p-2 bg-white rounded-lg">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{test.title}</p>
                  <p className="text-xs text-gray-500">{test.feature}</p>
                  {test.observations && (
                    <p className="text-xs text-red-600 mt-1 truncate" title={test.observations}>
                      Obs: {test.observations}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {failedTestsList.length > 5 && (
            <Link to="/documentos?status=reprovado" className="text-sm text-red-600 font-medium mt-3 inline-block hover:underline">
              Ver todos os {failedTestsList.length} reprovados →
            </Link>
          )}
        </div>
      )}

      {/* Timeline de Atividades */}
      {sortedTests.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Timeline de Atividades</h3>
          <div className="space-y-4">
            {Object.entries(timelineGroups).map(([date, tests]) => (
              <div key={date}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{date}</p>
                <div className="space-y-2 border-l-2 border-gray-200 pl-4">
                  {tests.map(test => (
                    <div key={test.id} className="flex items-center gap-3 relative">
                      <div className={`absolute -left-[21px] w-3 h-3 rounded-full border-2 border-white ${
                        test.status === 'aprovado' ? 'bg-green-500' :
                        test.status === 'reprovado' ? 'bg-red-500' :
                        test.status === 'melhoria' ? 'bg-cyan-500' : 'bg-yellow-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{test.title}</span>
                          <span className={`ml-2 text-xs ${
                            test.status === 'aprovado' ? 'text-green-600' :
                            test.status === 'reprovado' ? 'text-red-600' :
                            test.status === 'melhoria' ? 'text-cyan-600' : 'text-yellow-600'
                          }`}>
                            {test.status}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(test.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          {test.tester && ` • ${test.tester}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.path}
                to={action.path}
                className="card hover:shadow-md transition-shadow group"
              >
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                <div className="flex items-center text-primary-600 text-sm font-medium mt-3">
                  <span>Acessar</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Tests */}
      {recentTests.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Testes Recentes</h2>
            <Link to="/documentos" className="text-primary-600 text-sm font-medium hover:text-primary-700">
              Ver todos →
            </Link>
          </div>
          <div className="card">
            <div className="divide-y divide-gray-200">
              {recentTests.map((test) => (
                <div key={test.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {test.status === 'aprovado' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : test.status === 'reprovado' ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : test.status === 'melhoria' ? (
                      <Lightbulb className="w-5 h-5 text-cyan-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-500" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{test.title}</p>
                      <p className="text-sm text-gray-500">{test.feature}</p>
                    </div>
                  </div>
                  <span className={`badge ${
                    test.status === 'aprovado' ? 'badge-success' :
                    test.status === 'reprovado' ? 'badge-error' :
                    test.status === 'melhoria' ? 'bg-cyan-100 text-cyan-700' : 'badge-warning'
                  }`}>
                    {test.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(testDocuments || []).length === 0 && (
        <div className="card text-center py-12">
          <FlaskConical className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Nenhum teste registrado</h3>
          <p className="text-gray-600 mt-1">Comece registrando seu primeiro teste de homologação</p>
          <Link to="/registro" className="btn-primary inline-block mt-4">
            Registrar Teste
          </Link>
        </div>
      )}
    </div>
  )
}
