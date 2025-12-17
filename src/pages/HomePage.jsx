import { Link } from 'react-router-dom'
import { FileText, FlaskConical, Code, Table2, ArrowRight, CheckCircle2, Clock } from 'lucide-react'

export default function HomePage({ testDocuments, requirements }) {
  const pendingTests = testDocuments.filter(d => d.status === 'pendente').length
  const approvedTests = testDocuments.filter(d => d.status === 'aprovado').length
  const failedTests = testDocuments.filter(d => d.status === 'reprovado').length

  const stats = [
    { label: 'Total de Testes', value: testDocuments.length, color: 'bg-blue-500' },
    { label: 'Aprovados', value: approvedTests, color: 'bg-green-500' },
    { label: 'Reprovados', value: failedTests, color: 'bg-red-500' },
    { label: 'Pendentes', value: pendingTests, color: 'bg-yellow-500' },
    { label: 'Requisitos', value: requirements.length, color: 'bg-purple-500' },
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

  const recentTests = testDocuments.slice(-5).reverse()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">DocSimples Reports</h1>
        <p className="mt-2 text-gray-600">
          Sistema de documentação de testes de homologação com geração automática de Gherkin e Playwright
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className={`w-2 h-2 rounded-full ${stat.color} mb-2`}></div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

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
                      <CheckCircle2 className="w-5 h-5 text-red-500" />
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
                    test.status === 'reprovado' ? 'badge-error' : 'badge-warning'
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
      {testDocuments.length === 0 && (
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
