import { useMemo } from 'react'
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, AreaChart, Area
} from 'recharts'
import { Clock, TrendingUp, Calendar, Timer } from 'lucide-react'

const COLORS = {
  aprovado: '#22c55e',
  reprovado: '#ef4444',
  pendente: '#eab308',
  em_reteste: '#3b82f6',
  bloqueado: '#6b7280',
  melhoria: '#06b6d4'
}

const CATEGORY_COLORS = {
  regra_negocio: '#6366f1',
  bug: '#ef4444',
  melhoria: '#10b981'
}

export default function DashboardCharts({ testDocuments }) {
  // Dados para gráfico de pizza (Status)
  const statusData = useMemo(() => {
    const counts = testDocuments.reduce((acc, doc) => {
      const status = doc.status || 'pendente'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {})

    return Object.entries(counts).map(([name, value]) => ({
      name: getStatusLabel(name),
      value,
      color: COLORS[name] || '#6b7280'
    }))
  }, [testDocuments])

  // Dados para gráfico de barras (Categoria)
  const categoryData = useMemo(() => {
    const counts = testDocuments.reduce((acc, doc) => {
      const category = doc.category || 'sem_categoria'
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {})

    return [
      { name: 'Regra de Negócio', value: counts.regra_negocio || 0, fill: CATEGORY_COLORS.regra_negocio },
      { name: 'Bug', value: counts.bug || 0, fill: CATEGORY_COLORS.bug },
      { name: 'Melhoria', value: counts.melhoria || 0, fill: CATEGORY_COLORS.melhoria }
    ]
  }, [testDocuments])

  // Dados para gráfico de linha (Evolução ao longo do tempo)
  const evolutionData = useMemo(() => {
    const byDate = testDocuments.reduce((acc, doc) => {
      const date = new Date(doc.createdAt).toLocaleDateString('pt-BR')
      if (!acc[date]) {
        acc[date] = { date, total: 0, aprovados: 0, reprovados: 0 }
      }
      acc[date].total++
      if (doc.status === 'aprovado') acc[date].aprovados++
      if (doc.status === 'reprovado') acc[date].reprovados++
      return acc
    }, {})

    return Object.values(byDate)
      .sort((a, b) => {
        const [dA, mA, yA] = a.date.split('/')
        const [dB, mB, yB] = b.date.split('/')
        return new Date(yA, mA - 1, dA) - new Date(yB, mB - 1, dB)
      })
      .slice(-14) // Últimos 14 dias
  }, [testDocuments])

  // Calcular tempo médio de resolução
  const avgResolutionTime = useMemo(() => {
    const resolvedTests = testDocuments.filter(doc => 
      doc.status === 'aprovado' && doc.createdAt
    )

    if (resolvedTests.length === 0) return null

    let totalHours = 0
    let count = 0

    resolvedTests.forEach(doc => {
      // Procurar o comentário de aprovação
      const approvalComment = doc.comments?.find(c => c.type === 'aprovado_reteste')
      if (approvalComment && approvalComment.createdAt) {
        const created = new Date(doc.createdAt)
        const resolved = new Date(approvalComment.createdAt)
        const diffHours = (resolved - created) / (1000 * 60 * 60)
        if (diffHours > 0 && diffHours < 720) { // Ignorar outliers (> 30 dias)
          totalHours += diffHours
          count++
        }
      }
    })

    if (count === 0) return null

    const avgHours = totalHours / count
    if (avgHours < 24) {
      return { value: Math.round(avgHours), unit: 'horas' }
    } else {
      return { value: Math.round(avgHours / 24), unit: 'dias' }
    }
  }, [testDocuments])

  // Testes por prioridade
  const priorityData = useMemo(() => {
    const counts = testDocuments.reduce((acc, doc) => {
      const priority = doc.priority || 'media'
      acc[priority] = (acc[priority] || 0) + 1
      return acc
    }, {})

    return [
      { name: 'Crítica', value: counts.critica || 0, fill: '#dc2626' },
      { name: 'Alta', value: counts.alta || 0, fill: '#f97316' },
      { name: 'Média', value: counts.media || 0, fill: '#eab308' },
      { name: 'Baixa', value: counts.baixa || 0, fill: '#22c55e' }
    ]
  }, [testDocuments])

  if (testDocuments.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500">Nenhum dado disponível para exibir gráficos</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Métricas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={TrendingUp}
          label="Taxa de Aprovação"
          value={`${Math.round((testDocuments.filter(d => d.status === 'aprovado').length / testDocuments.length) * 100)}%`}
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <MetricCard
          icon={Clock}
          label="Em Andamento"
          value={testDocuments.filter(d => d.status === 'pendente' || d.status === 'em_reteste').length}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <MetricCard
          icon={Calendar}
          label="Esta Semana"
          value={testDocuments.filter(d => {
            const created = new Date(d.createdAt)
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            return created > weekAgo
          }).length}
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
        {avgResolutionTime && (
          <MetricCard
            icon={Timer}
            label="Tempo Médio Resolução"
            value={`${avgResolutionTime.value} ${avgResolutionTime.unit}`}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
        )}
      </div>

      {/* Gráficos */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Gráfico de Pizza - Status */}
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Distribuição por Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {statusData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span>{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico de Barras - Categoria */}
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Testes por Categoria</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Linha - Evolução */}
        {evolutionData.length > 1 && (
          <div className="card md:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-4">Evolução dos Testes (Últimos 14 dias)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolutionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    name="Total" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="aprovados" 
                    name="Aprovados" 
                    stroke="#22c55e" 
                    fill="#22c55e" 
                    fillOpacity={0.2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="reprovados" 
                    name="Reprovados" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Gráfico de Barras - Prioridade */}
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Testes por Prioridade</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, color, bgColor }) {
  return (
    <div className={`card ${bgColor} border-0`}>
      <div className="flex items-center gap-3">
        <Icon className={`w-8 h-8 ${color}`} />
        <div>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          <p className="text-xs text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  )
}

function getStatusLabel(status) {
  const labels = {
    aprovado: 'Aprovado',
    reprovado: 'Reprovado',
    pendente: 'Pendente',
    em_reteste: 'Em Reteste',
    bloqueado: 'Bloqueado',
    melhoria: 'Melhoria'
  }
  return labels[status] || status
}
