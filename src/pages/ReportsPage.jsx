import { useState, useMemo } from 'react'
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area
} from 'recharts'
import { 
  BarChart3, FileDown, FileSpreadsheet, Calendar, Clock, TrendingUp, Timer,
  Loader2, Filter
} from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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

export default function ReportsPage({ testDocuments }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [generating, setGenerating] = useState(false)

  // Filtrar documentos
  const filteredDocs = useMemo(() => {
    return testDocuments.filter(doc => {
      const docDate = new Date(doc.createdAt)
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate + 'T23:59:59') : null

      const matchesDate = (!start || docDate >= start) && (!end || docDate <= end)
      const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
      const matchesCategory = filterCategory === 'all' || doc.category === filterCategory

      return matchesDate && matchesStatus && matchesCategory
    })
  }, [testDocuments, startDate, endDate, filterStatus, filterCategory])

  // Dados para gráfico de pizza (Status)
  const statusData = useMemo(() => {
    const counts = filteredDocs.reduce((acc, doc) => {
      const status = doc.status || 'pendente'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {})

    return Object.entries(counts).map(([name, value]) => ({
      name: getStatusLabel(name),
      value,
      color: COLORS[name] || '#6b7280'
    }))
  }, [filteredDocs])

  // Dados para gráfico de barras (Categoria com status empilhados)
  const categoryData = useMemo(() => {
    const categories = ['regra_negocio', 'bug', 'melhoria', 'sem_categoria']
    const categoryLabels = {
      regra_negocio: 'Regra de Negócio',
      bug: 'Bug',
      melhoria: 'Melhoria',
      sem_categoria: 'Sem Categoria'
    }
    
    return categories.map(category => {
      const docsInCategory = category === 'sem_categoria'
        ? filteredDocs.filter(doc => !doc.category || doc.category === '')
        : filteredDocs.filter(doc => doc.category === category)
      return {
        name: categoryLabels[category],
        aprovado: docsInCategory.filter(d => d.status === 'aprovado').length,
        pendente: docsInCategory.filter(d => d.status === 'pendente').length,
        reprovado: docsInCategory.filter(d => d.status === 'reprovado').length,
        em_reteste: docsInCategory.filter(d => d.status === 'em_reteste').length,
        melhoria: docsInCategory.filter(d => d.status === 'melhoria').length,
        bloqueado: docsInCategory.filter(d => d.status === 'bloqueado').length,
      }
    })
  }, [filteredDocs])

  // Dados para gráfico de evolução
  const evolutionData = useMemo(() => {
    const byDate = filteredDocs.reduce((acc, doc) => {
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
      .slice(-14)
  }, [filteredDocs])

  // Tempo médio de resolução
  const avgResolutionTime = useMemo(() => {
    const resolvedTests = filteredDocs.filter(doc => 
      doc.status === 'aprovado' && doc.createdAt
    )

    if (resolvedTests.length === 0) return null

    let totalHours = 0
    let count = 0

    resolvedTests.forEach(doc => {
      const approvalComment = doc.comments?.find(c => c.type === 'aprovado_reteste')
      if (approvalComment && approvalComment.createdAt) {
        const created = new Date(doc.createdAt)
        const resolved = new Date(approvalComment.createdAt)
        const diffHours = (resolved - created) / (1000 * 60 * 60)
        if (diffHours > 0 && diffHours < 720) {
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
  }, [filteredDocs])

  // Estatísticas
  const stats = useMemo(() => {
    const total = filteredDocs.length
    const aprovados = filteredDocs.filter(d => d.status === 'aprovado').length
    const reprovados = filteredDocs.filter(d => d.status === 'reprovado').length
    const pendentes = filteredDocs.filter(d => d.status === 'pendente').length
    const emReteste = filteredDocs.filter(d => d.status === 'em_reteste').length
    const taxaAprovacao = total > 0 ? Math.round((aprovados / total) * 100) : 0

    return { total, aprovados, reprovados, pendentes, emReteste, taxaAprovacao }
  }, [filteredDocs])

  // Exportar PDF
  const exportToPDF = async () => {
    setGenerating(true)
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()

      doc.setFontSize(20)
      doc.setTextColor(59, 130, 246)
      doc.text('DocSimples Reports', pageWidth / 2, 20, { align: 'center' })

      doc.setFontSize(14)
      doc.setTextColor(100)
      doc.text('Relatório de Testes de Homologação', pageWidth / 2, 28, { align: 'center' })

      doc.setFontSize(10)
      doc.setTextColor(120)
      const periodo = startDate && endDate 
        ? `Período: ${formatDate(startDate)} a ${formatDate(endDate)}`
        : 'Período: Todos os registros'
      doc.text(periodo, pageWidth / 2, 36, { align: 'center' })
      doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, pageWidth / 2, 42, { align: 'center' })

      doc.setDrawColor(200)
      doc.line(20, 48, pageWidth - 20, 48)

      doc.setFontSize(14)
      doc.setTextColor(0)
      doc.text('Resumo Estatístico', 20, 58)

      doc.setFontSize(10)
      let y = 68
      const col1 = 25
      const col2 = 110

      doc.setTextColor(60)
      doc.text(`Total de Testes: ${stats.total}`, col1, y)
      doc.text(`Taxa de Aprovação: ${stats.taxaAprovacao}%`, col2, y)
      y += 8

      doc.setTextColor(34, 197, 94)
      doc.text(`Aprovados: ${stats.aprovados}`, col1, y)
      doc.setTextColor(239, 68, 68)
      doc.text(`Reprovados: ${stats.reprovados}`, col2, y)
      y += 8

      doc.setTextColor(234, 179, 8)
      doc.text(`Pendentes: ${stats.pendentes}`, col1, y)
      doc.setTextColor(59, 130, 246)
      doc.text(`Em Reteste: ${stats.emReteste}`, col2, y)

      y += 20
      doc.setTextColor(0)
      doc.setFontSize(14)
      doc.text('Lista de Testes', 20, y)

      const tableData = filteredDocs.map(d => [
        d.title?.substring(0, 30) + (d.title?.length > 30 ? '...' : '') || 'Sem título',
        getCategoryLabel(d.category),
        getStatusLabel(d.status),
        d.priority || 'Média',
        formatDate(d.createdAt)
      ])

      autoTable(doc, {
        startY: y + 5,
        head: [['Título', 'Categoria', 'Status', 'Prioridade', 'Data']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [59, 130, 246] },
        styles: { fontSize: 8, cellPadding: 2 }
      })

      const fileName = `relatorio-testes-${new Date().toISOString().split('T')[0]}.pdf`
      doc.save(fileName)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar relatório PDF')
    } finally {
      setGenerating(false)
    }
  }

  // Exportar Excel (CSV)
  const exportToExcel = () => {
    setGenerating(true)
    try {
      const headers = ['Título', 'Categoria', 'Status', 'Prioridade', 'Módulo', 'Feature', 'Testador', 'Data', 'Jira']
      
      const rows = filteredDocs.map(d => [
        d.title || '',
        getCategoryLabel(d.category),
        getStatusLabel(d.status),
        d.priority || '',
        d.module || '',
        d.feature || '',
        d.tester || '',
        formatDate(d.createdAt),
        d.jiraKey || ''
      ])

      const csvContent = [
        headers.join(';'),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(';'))
      ].join('\n')

      const BOM = '\uFEFF'
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `relatorio-testes-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro ao gerar Excel:', error)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios e Métricas</h1>
          <p className="text-gray-600">Visualize gráficos e exporte relatórios</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Filtros</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Data Início</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Data Fim</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field text-sm"
            >
              <option value="all">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="aprovado">Aprovado</option>
              <option value="reprovado">Reprovado</option>
              <option value="em_reteste">Em Reteste</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Categoria</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field text-sm"
            >
              <option value="all">Todas</option>
              <option value="regra_negocio">Regra de Negócio</option>
              <option value="bug">Bug</option>
              <option value="melhoria">Melhoria</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{filteredDocs.length}</span> testes encontrados
          </p>
          <div className="flex gap-2">
            <button
              onClick={exportToPDF}
              disabled={generating || filteredDocs.length === 0}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
              PDF
            </button>
            <button
              onClick={exportToExcel}
              disabled={generating || filteredDocs.length === 0}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={TrendingUp}
          label="Taxa de Aprovação"
          value={`${stats.taxaAprovacao}%`}
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <MetricCard
          icon={Clock}
          label="Em Andamento"
          value={stats.pendentes + stats.emReteste}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <MetricCard
          icon={Calendar}
          label="Total Filtrado"
          value={stats.total}
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
        {avgResolutionTime && (
          <MetricCard
            icon={Timer}
            label="Tempo Médio"
            value={`${avgResolutionTime.value} ${avgResolutionTime.unit}`}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
        )}
      </div>

      {/* Gráficos */}
      {filteredDocs.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pizza - Status */}
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

          {/* Barras - Categoria com Status */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Testes por Categoria</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="aprovado" name="Aprovado" stackId="a" fill={COLORS.aprovado} />
                  <Bar dataKey="pendente" name="Pendente" stackId="a" fill={COLORS.pendente} />
                  <Bar dataKey="reprovado" name="Reprovado" stackId="a" fill={COLORS.reprovado} />
                  <Bar dataKey="em_reteste" name="Em Reteste" stackId="a" fill={COLORS.em_reteste} />
                  <Bar dataKey="melhoria" name="Melhoria" stackId="a" fill={COLORS.melhoria} />
                  <Bar dataKey="bloqueado" name="Bloqueado" stackId="a" fill={COLORS.bloqueado} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Evolução */}
          {evolutionData.length > 1 && (
            <div className="card md:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-4">Evolução dos Testes</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={evolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="total" name="Total" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="aprovados" name="Aprovados" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="reprovados" name="Reprovados" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum dado para exibir com os filtros selecionados</p>
        </div>
      )}
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

function formatDate(dateString) {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('pt-BR')
}

function getStatusLabel(status) {
  const labels = {
    aprovado: 'Aprovado',
    reprovado: 'Reprovado',
    pendente: 'Pendente',
    em_reteste: 'Em Reteste',
    bloqueado: 'Bloqueado'
  }
  return labels[status] || status || '-'
}

function getCategoryLabel(category) {
  const labels = {
    regra_negocio: 'Regra de Negócio',
    bug: 'Bug',
    melhoria: 'Melhoria'
  }
  return labels[category] || category || '-'
}
