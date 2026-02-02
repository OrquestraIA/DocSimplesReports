import { useState, useMemo } from 'react'
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area
} from 'recharts'
import { 
  BarChart3, FileDown, FileSpreadsheet, Calendar, Clock, TrendingUp, Timer,
  Loader2, Filter, CheckCircle2, XCircle, AlertTriangle, Target
} from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const STATUS_HOMOLOG_COLORS = {
  'Aprovado': '#22c55e',
  'Reprovado': '#ef4444',
  'Pendente': '#eab308',
  'Em Teste': '#3b82f6',
  'Para_Teste_Homolog': '#06b6d4',
  'Para_Reteste_Homolog': '#a855f7',
  'Bloqueado': '#6b7280',
  'Em-reteste-homolog': '#f97316',
  'Aguardando_Deploy': '#8b5cf6'
}

const STATUS_DEV_COLORS = {
  'IMPLEMENTADO': '#22c55e',
  'PARCIAL': '#f97316',
  'NAO_IMPLEMENTADO': '#ef4444'
}

export default function RequirementsReportsPage({ requirements = [] }) {
  const [filterModule, setFilterModule] = useState('all')
  const [filterObrigatorio, setFilterObrigatorio] = useState('all')
  const [filterStatusHomolog, setFilterStatusHomolog] = useState('all')
  const [generating, setGenerating] = useState(false)

  // Módulos únicos
  const modules = useMemo(() => {
    const uniqueModules = [...new Set(requirements.map(r => r.modulo).filter(Boolean))]
    return uniqueModules.sort()
  }, [requirements])

  // Filtrar requisitos
  const filteredReqs = useMemo(() => {
    return requirements.filter(req => {
      const matchesModule = filterModule === 'all' || req.modulo === filterModule
      const matchesObrigatorio = filterObrigatorio === 'all' || 
        (filterObrigatorio === 'sim' && (req.obrigatorio === 'SIM' || req.obrigatorio === 'Sim' || req.obrigatorio === 'sim')) ||
        (filterObrigatorio === 'nao' && req.obrigatorio !== 'SIM' && req.obrigatorio !== 'Sim' && req.obrigatorio !== 'sim')
      const matchesStatusHomolog = filterStatusHomolog === 'all' || req.statusHomolog === filterStatusHomolog
      return matchesModule && matchesObrigatorio && matchesStatusHomolog
    })
  }, [requirements, filterModule, filterObrigatorio, filterStatusHomolog])

  // Estatísticas gerais
  const stats = useMemo(() => {
    const total = filteredReqs.length
    const implementados = filteredReqs.filter(r => r.statusDev === 'IMPLEMENTADO').length
    const parciais = filteredReqs.filter(r => r.statusDev === 'PARCIAL').length
    const naoImplementados = filteredReqs.filter(r => r.statusDev === 'NAO_IMPLEMENTADO').length

    // Status Homologação
    const aprovadosHomolog = filteredReqs.filter(r => r.statusHomolog === 'Aprovado').length
    const reprovadosHomolog = filteredReqs.filter(r => r.statusHomolog === 'Reprovado').length
    const pendentesHomolog = filteredReqs.filter(r => !r.statusHomolog || r.statusHomolog === 'Pendente' || r.statusHomolog === '').length
    const emTesteHomolog = filteredReqs.filter(r => r.statusHomolog === 'Em Teste' || r.statusHomolog === 'Em-reteste-homolog').length
    const paraTesteHomolog = filteredReqs.filter(r => r.statusHomolog === 'Para_Teste_Homolog').length
    const paraRetesteHomolog = filteredReqs.filter(r => r.statusHomolog === 'Para_Reteste_Homolog').length
    const bloqueadosHomolog = filteredReqs.filter(r => r.statusHomolog === 'Bloqueado').length

    // Requisitos Obrigatórios
    const obrigatorios = filteredReqs.filter(r => r.obrigatorio === 'SIM' || r.obrigatorio === 'Sim' || r.obrigatorio === 'sim')
    const totalObrigatorios = obrigatorios.length
    const obrigatoriosAprovados = obrigatorios.filter(r => r.statusHomolog === 'Aprovado').length

    // Não obrigatórios
    const naoObrigatorios = filteredReqs.filter(r => r.obrigatorio !== 'SIM' && r.obrigatorio !== 'Sim' && r.obrigatorio !== 'sim')
    const totalNaoObrigatorios = naoObrigatorios.length
    const naoObrigatoriosAprovados = naoObrigatorios.filter(r => r.statusHomolog === 'Aprovado').length
    const metaNaoObrigatorios = Math.ceil(totalNaoObrigatorios * 0.85)

    return {
      total,
      implementados,
      parciais,
      naoImplementados,
      aprovadosHomolog,
      reprovadosHomolog,
      pendentesHomolog,
      emTesteHomolog,
      paraTesteHomolog,
      paraRetesteHomolog,
      bloqueadosHomolog,
      totalObrigatorios,
      obrigatoriosAprovados,
      totalNaoObrigatorios,
      naoObrigatoriosAprovados,
      metaNaoObrigatorios,
      taxaImplementacao: total > 0 ? ((implementados / total) * 100).toFixed(1) : 0,
      taxaAprovacaoHomolog: total > 0 ? ((aprovadosHomolog / total) * 100).toFixed(1) : 0,
      taxaObrigatoriosAprovados: totalObrigatorios > 0 ? ((obrigatoriosAprovados / totalObrigatorios) * 100).toFixed(1) : 0,
      taxaNaoObrigatoriosAprovados: totalNaoObrigatorios > 0 ? ((naoObrigatoriosAprovados / totalNaoObrigatorios) * 100).toFixed(1) : 0
    }
  }, [filteredReqs])

  // Dados para gráfico de Status Homologação
  const statusHomologData = useMemo(() => [
    { name: 'Aprovado', value: stats.aprovadosHomolog, color: '#22c55e' },
    { name: 'Reprovado', value: stats.reprovadosHomolog, color: '#ef4444' },
    { name: 'Pendente', value: stats.pendentesHomolog, color: '#eab308' },
    { name: 'Em Teste', value: stats.emTesteHomolog, color: '#3b82f6' },
    { name: 'Para Teste', value: stats.paraTesteHomolog, color: '#06b6d4' },
    { name: 'Para Reteste', value: stats.paraRetesteHomolog, color: '#a855f7' },
    { name: 'Bloqueado', value: stats.bloqueadosHomolog, color: '#6b7280' }
  ].filter(d => d.value > 0), [stats])

  // Dados para gráfico de Status Dev
  const statusDevData = useMemo(() => [
    { name: 'Implementado', value: stats.implementados, color: '#22c55e' },
    { name: 'Parcial', value: stats.parciais, color: '#f97316' },
    { name: 'Não Implementado', value: stats.naoImplementados, color: '#ef4444' }
  ].filter(d => d.value > 0), [stats])

  // Dados para gráfico de Obrigatórios vs Não Obrigatórios
  const obrigatoriosData = useMemo(() => [
    { 
      name: 'Obrigatórios', 
      aprovados: stats.obrigatoriosAprovados, 
      pendentes: stats.totalObrigatorios - stats.obrigatoriosAprovados,
      meta: stats.totalObrigatorios
    },
    { 
      name: 'Não Obrigatórios', 
      aprovados: stats.naoObrigatoriosAprovados, 
      pendentes: stats.metaNaoObrigatorios - stats.naoObrigatoriosAprovados,
      meta: stats.metaNaoObrigatorios
    }
  ], [stats])

  // Dados por módulo
  const moduleData = useMemo(() => {
    const byModule = filteredReqs.reduce((acc, req) => {
      const mod = req.modulo || 'Sem Módulo'
      if (!acc[mod]) {
        acc[mod] = { name: mod, total: 0, aprovado: 0, pendente: 0, reprovado: 0 }
      }
      acc[mod].total++
      if (req.statusHomolog === 'Aprovado') acc[mod].aprovado++
      else if (req.statusHomolog === 'Reprovado') acc[mod].reprovado++
      else acc[mod].pendente++
      return acc
    }, {})
    return Object.values(byModule).sort((a, b) => b.total - a.total).slice(0, 10)
  }, [filteredReqs])

  // Estatísticas de aprovações por semana
  const aprovacoesPorSemana = useMemo(() => {
    const reqsComData = filteredReqs.filter(r => r.dataAprovacaoHomolog && r.statusHomolog === 'Aprovado')
    
    if (reqsComData.length === 0) return { semanas: [], mediaAprovacoesSemana: 0, totalComData: 0 }
    
    const porSemana = reqsComData.reduce((acc, req) => {
      const data = new Date(req.dataAprovacaoHomolog)
      const diaSemana = data.getDay()
      const diff = diaSemana === 0 ? -6 : 1 - diaSemana
      const inicioSemana = new Date(data)
      inicioSemana.setDate(data.getDate() + diff)
      inicioSemana.setHours(0, 0, 0, 0)
      
      const chave = inicioSemana.toISOString().split('T')[0]
      if (!acc[chave]) {
        acc[chave] = { semana: chave, quantidade: 0 }
      }
      acc[chave].quantidade++
      return acc
    }, {})
    
    const semanas = Object.values(porSemana)
      .sort((a, b) => new Date(b.semana) - new Date(a.semana))
      .slice(0, 8)
      .reverse()
    
    const totalSemanas = semanas.length
    const totalAprovacoes = semanas.reduce((sum, s) => sum + s.quantidade, 0)
    const mediaAprovacoesSemana = totalSemanas > 0 ? (totalAprovacoes / totalSemanas).toFixed(1) : 0
    
    return { semanas, mediaAprovacoesSemana, totalComData: reqsComData.length }
  }, [filteredReqs])

  // Formatar data da semana
  const formatarSemana = (dataStr) => {
    const data = new Date(dataStr)
    const fimSemana = new Date(data)
    fimSemana.setDate(data.getDate() + 6)
    const formatarDia = (d) => `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`
    return `${formatarDia(data)} - ${formatarDia(fimSemana)}`
  }

  // Exportar PDF
  const exportToPDF = async () => {
    setGenerating(true)
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()

      doc.setFontSize(20)
      doc.setTextColor(59, 130, 246)
      doc.text('TestWise', pageWidth / 2, 20, { align: 'center' })

      doc.setFontSize(14)
      doc.setTextColor(100)
      doc.text('Relatório de Requisitos - Homologação', pageWidth / 2, 28, { align: 'center' })

      doc.setFontSize(10)
      doc.setTextColor(120)
      doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, pageWidth / 2, 36, { align: 'center' })

      doc.setDrawColor(200)
      doc.line(20, 42, pageWidth - 20, 42)

      doc.setFontSize(14)
      doc.setTextColor(0)
      doc.text('Resumo Estatístico', 20, 52)

      doc.setFontSize(10)
      let y = 62
      const col1 = 25
      const col2 = 110

      doc.setTextColor(60)
      doc.text(`Total de Requisitos: ${stats.total}`, col1, y)
      doc.text(`Taxa de Aprovação: ${stats.taxaAprovacaoHomolog}%`, col2, y)
      y += 8

      doc.setTextColor(34, 197, 94)
      doc.text(`Aprovados: ${stats.aprovadosHomolog}`, col1, y)
      doc.setTextColor(239, 68, 68)
      doc.text(`Reprovados: ${stats.reprovadosHomolog}`, col2, y)
      y += 8

      doc.setTextColor(234, 179, 8)
      doc.text(`Pendentes: ${stats.pendentesHomolog}`, col1, y)
      doc.setTextColor(59, 130, 246)
      doc.text(`Em Teste: ${stats.emTesteHomolog}`, col2, y)
      y += 12

      doc.setTextColor(220, 38, 38)
      doc.text(`Obrigatórios: ${stats.obrigatoriosAprovados}/${stats.totalObrigatorios} (${stats.taxaObrigatoriosAprovados}%)`, col1, y)
      doc.setTextColor(100)
      doc.text(`Não Obrig. (meta 85%): ${stats.naoObrigatoriosAprovados}/${stats.metaNaoObrigatorios}`, col2, y)

      y += 20
      doc.setTextColor(0)
      doc.setFontSize(14)
      doc.text('Lista de Requisitos', 20, y)

      const tableData = filteredReqs.map(r => [
        r.id || '-',
        r.modulo?.substring(0, 15) || '-',
        (r.obrigatorio === 'SIM' || r.obrigatorio === 'Sim') ? 'SIM' : 'NÃO',
        r.statusHomolog || 'Pendente',
        r.statusDev || '-',
        r.dataAprovacaoHomolog ? new Date(r.dataAprovacaoHomolog).toLocaleDateString('pt-BR') : '-'
      ])

      autoTable(doc, {
        startY: y + 5,
        head: [['ID', 'Módulo', 'Obrig.', 'Status Homolog', 'Status Dev', 'Data Aprov.']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [99, 102, 241] },
        styles: { fontSize: 7, cellPadding: 2 }
      })

      const fileName = `relatorio-requisitos-${new Date().toISOString().split('T')[0]}.pdf`
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
      const headers = ['ID', 'Módulo', 'Descrição', 'Obrigatório', 'Status Dev', 'Status Homolog', 'Data Aprovação', 'Versão Dev', 'Versão Homolog']
      
      const rows = filteredReqs.map(r => [
        r.id || '',
        r.modulo || '',
        r.descricao || '',
        (r.obrigatorio === 'SIM' || r.obrigatorio === 'Sim') ? 'SIM' : 'NÃO',
        r.statusDev || '',
        r.statusHomolog || 'Pendente',
        r.dataAprovacaoHomolog ? new Date(r.dataAprovacaoHomolog).toLocaleDateString('pt-BR') : '',
        r.versaoDev || '',
        r.versaoHomolog || ''
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
      a.download = `relatorio-requisitos-${new Date().toISOString().split('T')[0]}.csv`
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
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Relatórios de Requisitos</h1>
          <p className="text-gray-600 dark:text-gray-400">Métricas e exportação de requisitos de homologação</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Filtros</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Módulo</label>
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="input-field text-sm"
            >
              <option value="all">Todos</option>
              {modules.map(mod => (
                <option key={mod} value={mod}>{mod}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Obrigatório</label>
            <select
              value={filterObrigatorio}
              onChange={(e) => setFilterObrigatorio(e.target.value)}
              className="input-field text-sm"
            >
              <option value="all">Todos</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Status Homolog</label>
            <select
              value={filterStatusHomolog}
              onChange={(e) => setFilterStatusHomolog(e.target.value)}
              className="input-field text-sm"
            >
              <option value="all">Todos</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Reprovado">Reprovado</option>
              <option value="Pendente">Pendente</option>
              <option value="Em Teste">Em Teste</option>
              <option value="Para_Teste_Homolog">Para Teste Homolog</option>
              <option value="Para_Reteste_Homolog">Para Reteste Homolog</option>
              <option value="Bloqueado">Bloqueado</option>
            </select>
          </div>
          <div className="flex items-end">
            <div className="flex gap-2">
              <button
                onClick={exportToPDF}
                disabled={generating || filteredReqs.length === 0}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
                PDF
              </button>
              <button
                onClick={exportToExcel}
                disabled={generating || filteredReqs.length === 0}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Excel
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          <span className="font-medium">{filteredReqs.length}</span> requisitos encontrados
        </p>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard
          icon={Target}
          label="Taxa Aprovação"
          value={`${stats.taxaAprovacaoHomolog}%`}
          color="text-green-600"
          bgColor="bg-green-50 dark:bg-green-900/20"
        />
        <MetricCard
          icon={CheckCircle2}
          label="Aprovados"
          value={stats.aprovadosHomolog}
          color="text-emerald-600"
          bgColor="bg-emerald-50 dark:bg-emerald-900/20"
        />
        <MetricCard
          icon={Clock}
          label="Pendentes"
          value={stats.pendentesHomolog}
          color="text-yellow-600"
          bgColor="bg-yellow-50 dark:bg-yellow-900/20"
        />
        <MetricCard
          icon={XCircle}
          label="Reprovados"
          value={stats.reprovadosHomolog}
          color="text-red-600"
          bgColor="bg-red-50 dark:bg-red-900/20"
        />
        <MetricCard
          icon={AlertTriangle}
          label="Obrigatórios"
          value={`${stats.obrigatoriosAprovados}/${stats.totalObrigatorios}`}
          color="text-red-700"
          bgColor="bg-red-100 dark:bg-red-900/30"
        />
      </div>

      {/* Gráficos */}
      {filteredReqs.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pizza - Status Homologação */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Status Homologação</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusHomologData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusHomologData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {statusHomologData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="dark:text-gray-300">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pizza - Status Dev */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Status Desenvolvimento</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDevData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusDevData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {statusDevData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="dark:text-gray-300">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Barras - Obrigatórios vs Não Obrigatórios */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Progresso: Obrigatórios vs Não Obrigatórios</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={obrigatoriosData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="aprovados" name="Aprovados" stackId="a" fill="#22c55e" />
                  <Bar dataKey="pendentes" name="Faltam p/ Meta" stackId="a" fill="#fbbf24" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
              Meta: 100% obrigatórios + 85% não obrigatórios
            </div>
          </div>

          {/* Barras - Por Módulo */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top 10 Módulos</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moduleData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="aprovado" name="Aprovado" stackId="a" fill="#22c55e" />
                  <Bar dataKey="pendente" name="Pendente" stackId="a" fill="#eab308" />
                  <Bar dataKey="reprovado" name="Reprovado" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Evolução de Aprovações por Semana */}
          {aprovacoesPorSemana.semanas.length > 0 && (
            <div className="card md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Aprovações por Semana
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-lg">
                    <span className="text-emerald-600 dark:text-emerald-400">Média:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 ml-1">{aprovacoesPorSemana.mediaAprovacoesSemana}/semana</span>
                  </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={aprovacoesPorSemana.semanas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semana" tick={{ fontSize: 10 }} tickFormatter={formatarSemana} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip 
                      labelFormatter={formatarSemana}
                      formatter={(value) => [value, 'Aprovações']}
                    />
                    <Area type="monotone" dataKey="quantidade" name="Aprovações" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Nenhum requisito importado ou filtros sem resultados</p>
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
          <p className="text-xs text-gray-600 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  )
}
