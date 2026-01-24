import { useState } from 'react'
import { FileDown, FileSpreadsheet, Calendar, Filter, Loader2 } from 'lucide-react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default function ReportGenerator({ testDocuments }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [generating, setGenerating] = useState(false)

  // Filtrar documentos por período e filtros
  const getFilteredDocuments = () => {
    return testDocuments.filter(doc => {
      const docDate = new Date(doc.createdAt)
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate + 'T23:59:59') : null

      const matchesDate = (!start || docDate >= start) && (!end || docDate <= end)
      const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
      const matchesCategory = filterCategory === 'all' || doc.category === filterCategory

      return matchesDate && matchesStatus && matchesCategory
    })
  }

  const filteredDocs = getFilteredDocuments()

  // Calcular estatísticas
  const getStats = (docs) => {
    const total = docs.length
    const aprovados = docs.filter(d => d.status === 'aprovado').length
    const reprovados = docs.filter(d => d.status === 'reprovado').length
    const pendentes = docs.filter(d => d.status === 'pendente').length
    const emReteste = docs.filter(d => d.status === 'em_reteste').length

    const bugs = docs.filter(d => d.category === 'bug').length
    const melhorias = docs.filter(d => d.category === 'melhoria').length
    const regrasNegocio = docs.filter(d => d.category === 'regra_negocio').length

    const taxaAprovacao = total > 0 ? Math.round((aprovados / total) * 100) : 0

    return {
      total, aprovados, reprovados, pendentes, emReteste,
      bugs, melhorias, regrasNegocio, taxaAprovacao
    }
  }

  // Exportar para PDF
  const exportToPDF = async () => {
    setGenerating(true)
    try {
      const doc = new jsPDF()
      const stats = getStats(filteredDocs)
      const pageWidth = doc.internal.pageSize.getWidth()

      // Título
      doc.setFontSize(20)
      doc.setTextColor(59, 130, 246)
      doc.text('TestWise', pageWidth / 2, 20, { align: 'center' })

      // Subtítulo
      doc.setFontSize(14)
      doc.setTextColor(100)
      doc.text('Relatório de Testes de Homologação', pageWidth / 2, 28, { align: 'center' })

      // Período
      doc.setFontSize(10)
      doc.setTextColor(120)
      const periodo = startDate && endDate 
        ? `Período: ${formatDate(startDate)} a ${formatDate(endDate)}`
        : 'Período: Todos os registros'
      doc.text(periodo, pageWidth / 2, 36, { align: 'center' })
      doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, pageWidth / 2, 42, { align: 'center' })

      // Linha separadora
      doc.setDrawColor(200)
      doc.line(20, 48, pageWidth - 20, 48)

      // Resumo Estatístico
      doc.setFontSize(14)
      doc.setTextColor(0)
      doc.text('Resumo Estatístico', 20, 58)

      doc.setFontSize(10)
      let y = 68

      // Estatísticas em duas colunas
      const col1 = 25
      const col2 = 110

      doc.setTextColor(60)
      doc.text(`Total de Testes: ${stats.total}`, col1, y)
      doc.text(`Taxa de Aprovação: ${stats.taxaAprovacao}%`, col2, y)
      y += 8

      doc.setTextColor(34, 197, 94) // verde
      doc.text(`Aprovados: ${stats.aprovados}`, col1, y)
      doc.setTextColor(239, 68, 68) // vermelho
      doc.text(`Reprovados: ${stats.reprovados}`, col2, y)
      y += 8

      doc.setTextColor(234, 179, 8) // amarelo
      doc.text(`Pendentes: ${stats.pendentes}`, col1, y)
      doc.setTextColor(59, 130, 246) // azul
      doc.text(`Em Reteste: ${stats.emReteste}`, col2, y)
      y += 12

      // Por Categoria
      doc.setTextColor(0)
      doc.setFontSize(12)
      doc.text('Por Categoria:', col1, y)
      y += 8
      doc.setFontSize(10)
      doc.setTextColor(99, 102, 241) // indigo
      doc.text(`Regra de Negócio: ${stats.regrasNegocio}`, col1, y)
      doc.setTextColor(239, 68, 68) // vermelho
      doc.text(`Bug: ${stats.bugs}`, col2, y)
      y += 8
      doc.setTextColor(16, 185, 129) // verde
      doc.text(`Melhoria: ${stats.melhorias}`, col1, y)

      // Tabela de Testes
      y += 20
      doc.setTextColor(0)
      doc.setFontSize(14)
      doc.text('Lista de Testes', 20, y)

      const tableData = filteredDocs.map(doc => [
        doc.title?.substring(0, 30) + (doc.title?.length > 30 ? '...' : '') || 'Sem título',
        getCategoryLabel(doc.category),
        getStatusLabel(doc.status),
        doc.priority || 'Média',
        formatDate(doc.createdAt)
      ])

      doc.autoTable({
        startY: y + 5,
        head: [['Título', 'Categoria', 'Status', 'Prioridade', 'Data']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [59, 130, 246] },
        styles: { fontSize: 8, cellPadding: 2 },
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 30 },
          2: { cellWidth: 25 },
          3: { cellWidth: 25 },
          4: { cellWidth: 25 }
        }
      })

      // Rodapé
      const pageCount = doc.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150)
        doc.text(
          `Página ${i} de ${pageCount} - TestWise`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        )
      }

      // Salvar
      const fileName = `relatorio-testes-${new Date().toISOString().split('T')[0]}.pdf`
      doc.save(fileName)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar relatório PDF')
    } finally {
      setGenerating(false)
    }
  }

  // Exportar para Excel (CSV)
  const exportToExcel = () => {
    setGenerating(true)
    try {
      const headers = ['Título', 'Categoria', 'Status', 'Prioridade', 'Módulo', 'Feature', 'Testador', 'Data Criação', 'Jira']
      
      const rows = filteredDocs.map(doc => [
        doc.title || '',
        getCategoryLabel(doc.category),
        getStatusLabel(doc.status),
        doc.priority || '',
        doc.module || '',
        doc.feature || '',
        doc.tester || '',
        formatDate(doc.createdAt),
        doc.jiraKey || ''
      ])

      const csvContent = [
        headers.join(';'),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(';'))
      ].join('\n')

      // Adicionar BOM para Excel reconhecer UTF-8
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
      alert('Erro ao gerar relatório Excel')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FileDown className="w-5 h-5 text-primary-600" />
        Gerar Relatório
      </h3>

      {/* Filtros */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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

      {/* Preview */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">{filteredDocs.length}</span> testes encontrados com os filtros selecionados
        </p>
      </div>

      {/* Botões de Exportação */}
      <div className="flex gap-3">
        <button
          onClick={exportToPDF}
          disabled={generating || filteredDocs.length === 0}
          className="btn-primary flex items-center gap-2"
        >
          {generating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileDown className="w-4 h-4" />
          )}
          Exportar PDF
        </button>
        <button
          onClick={exportToExcel}
          disabled={generating || filteredDocs.length === 0}
          className="btn-secondary flex items-center gap-2"
        >
          {generating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileSpreadsheet className="w-4 h-4" />
          )}
          Exportar Excel
        </button>
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
