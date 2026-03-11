import { useState, useMemo } from 'react'
import * as XLSX from 'xlsx'
import { 
  Upload, FileSpreadsheet, Search, Filter, CheckCircle2, XCircle, Clock, 
  AlertTriangle, BarChart3, RefreshCw, Trash2, Download, ChevronDown, X,
  TrendingUp, Calendar, FileText
} from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'

const STATUS_COLORS = {
  'Aprovado': '#22c55e',
  'Reprovado': '#ef4444',
  'Pendente': '#eab308',
  'Em Teste': '#3b82f6',
  'Em-reteste-homolog': '#f97316',
  'Para_Correcao': '#ef4444',
  'Em_Correcao': '#f97316',
  'Para_Teste_QA': '#06b6d4',
  'Para_Reteste_QA': '#a855f7',
  'Aguardando_Deploy': '#6366f1',
  'Dúvida': '#ec4899'
}

const STATUS_DEV_COLORS = {
  'IMPLEMENTADO': '#22c55e',
  'PARCIAL': '#f97316',
  'NAO_IMPLEMENTADO': '#ef4444'
}

const STATUS_HOMOLOG_OPTIONS = [
  { value: 'Pendente', label: 'Pendente', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'Para_Teste_Homolog', label: 'Para Teste Homolog', color: 'bg-cyan-100 text-cyan-700' },
  { value: 'Em Teste', label: 'Em Teste', color: 'bg-blue-100 text-blue-700' },
  { value: 'Aprovado', label: 'Aprovado', color: 'bg-green-100 text-green-700' },
  { value: 'Reprovado', label: 'Reprovado', color: 'bg-red-100 text-red-700' },
  { value: 'Em-reteste-homolog', label: 'Em Reteste', color: 'bg-orange-100 text-orange-700' },
  { value: 'Para_Reteste_Homolog', label: 'Para Reteste Homolog', color: 'bg-purple-100 text-purple-700' },
  { value: 'Bloqueado', label: 'Bloqueado', color: 'bg-gray-100 text-gray-700' },
  { value: 'Aguardando_Deploy', label: 'Aguardando Deploy', color: 'bg-indigo-100 text-indigo-700' }
]

const STATUS_DEV_OPTIONS = [
  { value: 'IMPLEMENTADO', label: 'Implementado' },
  { value: 'PARCIAL', label: 'Parcial' },
  { value: 'NAO_IMPLEMENTADO', label: 'Não Impl.' },
  { value: '', label: '-' }
]

const STATUS_QA_OPTIONS = [
  { value: 'Pendente', label: 'Pendente' },
  { value: 'Para_Correcao', label: 'Para Correção' },
  { value: 'Em_Correcao', label: 'Em Correção' },
  { value: 'Para_Teste_QA', label: 'Para Teste QA' },
  { value: 'Em Teste', label: 'Em Teste' },
  { value: 'Aprovado', label: 'Aprovado' },
  { value: 'Reprovado', label: 'Reprovado' },
  { value: 'Para_Reteste_QA', label: 'Para Reteste QA' },
  { value: 'Aguardando_Deploy', label: 'Aguardando Deploy' },
  { value: 'Dúvida', label: 'Dúvida' },
  { value: '', label: '-' }
]

const REQUIREMENT_EXPORT_HEADERS = [
  'ID',
  'Obrigatório',
  'Módulo',
  'Descrição',
  'Responsável',
  'Arquivo Fonte',
  'Status Dev',
  'Status QA Dev',
  'Status QA Homolog',
  'Status Homolog',
  'Data Aprovação',
  'Versão Dev',
  'Versão Homolog',
  'Observação QA',
  'Observação'
]

const formatRequirementForExport = (req = {}) => ({
  id: req.id || '',
  obrigatorio: ['SIM', 'Sim', 'sim'].includes(req.obrigatorio) ? 'SIM' : 'NÃO',
  modulo: req.modulo || '',
  descricao: req.descricao || '',
  responsavel: req.responsavel || '',
  arquivoFonte: req.arquivoFonte || '',
  statusDev: req.statusDev || '',
  statusQADev: req.statusQADev || '',
  statusQAHomolog: req.statusQAHomolog || '',
  statusHomolog: req.statusHomolog || 'Pendente',
  dataAprovacao: req.dataAprovacaoHomolog 
    ? new Date(req.dataAprovacaoHomolog).toLocaleDateString('pt-BR') 
    : '',
  versaoDev: req.versaoDev || '',
  versaoHomolog: req.versaoHomolog || '',
  observacaoQA: req.observacaoQA || '',
  observacao: req.observacao || ''
})

const REQUIREMENT_EXPORT_COLUMN_WIDTHS = [
  { wch: 12 },  // ID
  { wch: 10 },  // Obrigatório
  { wch: 20 },  // Módulo
  { wch: 60 },  // Descrição
  { wch: 24 },  // Responsável
  { wch: 24 },  // Arquivo Fonte
  { wch: 18 },  // Status Dev
  { wch: 18 },  // Status QA Dev
  { wch: 20 },  // Status QA Homolog
  { wch: 20 },  // Status Homolog
  { wch: 16 },  // Data Aprovação
  { wch: 12 },  // Versão Dev
  { wch: 14 },  // Versão Homolog
  { wch: 28 },  // Observação QA
  { wch: 32 }   // Observação
]

// Tooltip customizado para Dark Mode
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-lg">
        {label && <p className="text-gray-200 font-medium mb-1">{label}</p>}
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color || entry.payload?.color || '#fff' }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }

  return null
}

export default function RequirementsPage({ requirements = [], onImport, onClear, onUpdateRequirement, testDocuments = [], tasks = [], onUpdateTask }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterModule, setFilterModule] = useState('all')
  const [filterStatusDev, setFilterStatusDev] = useState('all')
  const [filterStatusQADev, setFilterStatusQADev] = useState('all')
  const [filterStatusQAHomolog, setFilterStatusQAHomolog] = useState('all')
  const [filterStatusHomolog, setFilterStatusHomolog] = useState('all')
  const [filterObrigatorio, setFilterObrigatorio] = useState('all')
  const [importing, setImporting] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50
  const [exporting, setExporting] = useState(false)

  // Módulos únicos
  const modules = useMemo(() => {
    const uniqueModules = [...new Set(requirements.map(r => r.modulo).filter(Boolean))]
    return uniqueModules.sort()
  }, [requirements])

  // Função para extrair número do ID (ex: "FONTE-123" -> 123)
  const extractIdNumber = (id) => {
    if (!id) return Infinity // IDs vazios vão para o final
    const match = id.match(/(\d+)/)
    return match ? parseInt(match[1], 10) : Infinity
  }

  // Filtrar e ordenar requisitos
  const filteredRequirements = useMemo(() => {
    const filtered = requirements.filter(req => {
      const matchesSearch = 
        req.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.responsavel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.modulo?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesModule = filterModule === 'all' || req.modulo === filterModule
      const matchesStatusDev = filterStatusDev === 'all' || req.statusDev === filterStatusDev
      const matchesStatusQADev = filterStatusQADev === 'all' || req.statusQADev === filterStatusQADev
      const matchesStatusQAHomolog = filterStatusQAHomolog === 'all' || req.statusQAHomolog === filterStatusQAHomolog
      const matchesStatusHomolog = filterStatusHomolog === 'all' || req.statusHomolog === filterStatusHomolog
      const matchesObrigatorio = filterObrigatorio === 'all' || 
        (filterObrigatorio === 'sim' && (req.obrigatorio === 'SIM' || req.obrigatorio === 'Sim' || req.obrigatorio === 'sim')) ||
        (filterObrigatorio === 'nao' && req.obrigatorio !== 'SIM' && req.obrigatorio !== 'Sim' && req.obrigatorio !== 'sim')
      return matchesSearch && matchesModule && matchesStatusDev && matchesStatusQADev && matchesStatusQAHomolog && matchesStatusHomolog && matchesObrigatorio
    })
    
    // Ordenar por número do ID em ordem crescente
    return filtered.sort((a, b) => extractIdNumber(a.id) - extractIdNumber(b.id))
  }, [requirements, searchTerm, filterModule, filterStatusDev, filterStatusQADev, filterStatusQAHomolog, filterStatusHomolog, filterObrigatorio])

  // Paginação
  const totalPages = Math.ceil(filteredRequirements.length / itemsPerPage)
  const paginatedRequirements = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredRequirements.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredRequirements, currentPage, itemsPerPage])

  const exportableRequirements = useMemo(() => {
    return filteredRequirements.map(formatRequirementForExport)
  }, [filteredRequirements])

  const downloadBlob = (blobContent, filename, type) => {
    const blob = blobContent instanceof Blob ? blobContent : new Blob([blobContent], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleExportCSV = () => {
    if (!exportableRequirements.length) return
    setExporting(true)
    try {
      const rows = exportableRequirements.map(req => [
        req.id,
        req.obrigatorio,
        req.modulo,
        (req.descricao || '').replace(/"/g, '""'),
        req.responsavel,
        req.arquivoFonte,
        req.statusDev,
        req.statusQADev,
        req.statusQAHomolog,
        req.statusHomolog,
        req.dataAprovacao,
        req.versaoDev,
        req.versaoHomolog,
        (req.observacaoQA || '').replace(/"/g, '""'),
        (req.observacao || '').replace(/"/g, '""')
      ].map(cell => `"${cell ?? ''}"`).join(';'))

      const csvContent = [
        REQUIREMENT_EXPORT_HEADERS.join(';'),
        ...rows
      ].join('\n')

      const BOM = '\uFEFF'
      downloadBlob(BOM + csvContent, `requisitos-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8')
    } catch (error) {
      console.error('Erro ao exportar CSV:', error)
      alert('Erro ao exportar CSV. Tente novamente.')
    } finally {
      setExporting(false)
    }
  }

  const handleExportExcel = () => {
    if (!exportableRequirements.length) return
    setExporting(true)
    try {
      const worksheetData = [
        REQUIREMENT_EXPORT_HEADERS,
        ...exportableRequirements.map(req => [
          req.id,
          req.obrigatorio,
          req.modulo,
          req.descricao,
          req.responsavel,
          req.arquivoFonte,
          req.statusDev,
          req.statusQADev,
          req.statusQAHomolog,
          req.statusHomolog,
          req.dataAprovacao,
          req.versaoDev,
          req.versaoHomolog,
          req.observacaoQA,
          req.observacao
        ])
      ]

      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
      worksheet['!cols'] = REQUIREMENT_EXPORT_COLUMN_WIDTHS

      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Requisitos')
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      downloadBlob(blob, `requisitos-${new Date().toISOString().split('T')[0]}.xlsx`, blob.type)
    } catch (error) {
      console.error('Erro ao exportar Excel:', error)
      alert('Erro ao exportar Excel. Tente novamente.')
    } finally {
      setExporting(false)
    }
  }

  const handleExportMarkdown = () => {
    if (!exportableRequirements.length) return
    setExporting(true)
    try {
      const headerRow = `| ${REQUIREMENT_EXPORT_HEADERS.join(' | ')} |`
      const separatorRow = `| ${REQUIREMENT_EXPORT_HEADERS.map(() => '---').join(' | ')} |`
      const rows = exportableRequirements.map(req => {
        const values = [
          req.id,
          req.obrigatorio,
          req.modulo,
          (req.descricao || '').replace(/\r?\n|\r/g, ' '),
          req.responsavel,
          req.arquivoFonte,
          req.statusDev,
          req.statusQADev,
          req.statusQAHomolog,
          req.statusHomolog,
          req.dataAprovacao,
          req.versaoDev,
          req.versaoHomolog,
          (req.observacaoQA || '').replace(/\r?\n|\r/g, ' '),
          (req.observacao || '').replace(/\r?\n|\r/g, ' ')
        ]
        return `| ${values.map(value => (value || '').toString().replace(/\|/g, '\\|')).join(' | ')} |`
      })

      const markdownContent = [headerRow, separatorRow, ...rows].join('\n')
      downloadBlob(markdownContent, `requisitos-${new Date().toISOString().split('T')[0]}.md`, 'text/markdown;charset=utf-8')
    } catch (error) {
      console.error('Erro ao exportar Markdown:', error)
      alert('Erro ao exportar Markdown. Tente novamente.')
    } finally {
      setExporting(false)
    }
  }

  // Reset página quando filtros mudam
  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value)
    setCurrentPage(1)
  }

  // Handler para atualizar status de um requisito
  const handleStatusChange = async (req, field, newValue) => {
    if (!onUpdateRequirement || !req.firebaseId) return
    setUpdatingId(req.firebaseId)
    try {
      const updateData = { [field]: newValue }

      // Se o campo for statusHomolog e o novo valor for Aprovado, salvar a data de aprovação
      if (field === 'statusHomolog' && newValue === 'Aprovado' && !req.dataAprovacaoHomolog) {
        updateData.dataAprovacaoHomolog = new Date().toISOString()
      }
      // Se mudar de Aprovado para outro status, limpar a data
      if (field === 'statusHomolog' && newValue !== 'Aprovado' && req.dataAprovacaoHomolog) {
        updateData.dataAprovacaoHomolog = null
      }

      await onUpdateRequirement(req.firebaseId, updateData)

      // Quando Operação aprova homolog via tabela → concluir tarefas vinculadas
      if (field === 'statusHomolog' && newValue === 'Aprovado' && onUpdateTask && tasks.length > 0) {
        const relatedDocs = testDocuments.filter(d => d.requirement === req.id)
        const relatedTasks = tasks.filter(t => relatedDocs.some(d => d.id === t.sourceId) && t.status !== 'done')
        await Promise.all(relatedTasks.map(t => onUpdateTask(t.id, { status: 'done' })))
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar status. Tente novamente.')
    } finally {
      setUpdatingId(null)
    }
  }

  // Estatísticas gerais
  const stats = useMemo(() => {
    const total = requirements.length
    const implementados = requirements.filter(r => r.statusDev === 'IMPLEMENTADO').length
    const parciais = requirements.filter(r => r.statusDev === 'PARCIAL').length
    const naoImplementados = requirements.filter(r => r.statusDev === 'NAO_IMPLEMENTADO').length
    
    const aprovadosQA = requirements.filter(r => r.statusQAHomolog === 'Aprovado').length
    const reprovadosQA = requirements.filter(r => r.statusQAHomolog === 'Reprovado').length
    const pendentesQA = requirements.filter(r => r.statusQAHomolog === 'Pendente').length
    const emTesteQA = requirements.filter(r => r.statusQAHomolog === 'Em Teste' || r.statusQAHomolog === 'Em-reteste-homolog').length
    const paraTesteQA = requirements.filter(r => r.statusQAHomolog === 'Para_Teste_QA').length

    // Status QA Dev
    const aprovadosQADev = requirements.filter(r => r.statusQADev === 'Aprovado').length
    const reprovadosQADev = requirements.filter(r => r.statusQADev === 'Reprovado').length
    const pendentesQADev = requirements.filter(r => r.statusQADev === 'Pendente' || !r.statusQADev).length
    const emTesteQADev = requirements.filter(r => r.statusQADev === 'Em Teste').length
    const paraTesteQADev = requirements.filter(r => r.statusQADev === 'Para_Teste_QA').length

    // Status Homologação (coluna principal)
    const aprovadosHomolog = requirements.filter(r => r.statusHomolog === 'Aprovado').length
    const reprovadosHomolog = requirements.filter(r => r.statusHomolog === 'Reprovado').length
    const pendentesHomolog = requirements.filter(r => !r.statusHomolog || r.statusHomolog === 'Pendente' || r.statusHomolog === '').length
    const emTesteHomolog = requirements.filter(r => r.statusHomolog === 'Em Teste' || r.statusHomolog === 'Em-reteste-homolog').length
    const paraTesteHomolog = requirements.filter(r => r.statusHomolog === 'Para_Teste_Homolog').length
    const paraRetesteHomolog = requirements.filter(r => r.statusHomolog === 'Para_Reteste_Homolog').length
    const bloqueadosHomolog = requirements.filter(r => r.statusHomolog === 'Bloqueado').length

    // Requisitos Obrigatórios
    const obrigatorios = requirements.filter(r => r.obrigatorio === 'SIM' || r.obrigatorio === 'Sim' || r.obrigatorio === 'sim')
    const totalObrigatorios = obrigatorios.length
    const obrigatoriosAprovados = obrigatorios.filter(r => r.statusHomolog === 'Aprovado').length
    const obrigatoriosReprovados = obrigatorios.filter(r => r.statusHomolog === 'Reprovado').length
    const obrigatoriosEmTeste = obrigatorios.filter(r => r.statusHomolog === 'Em Teste' || r.statusHomolog === 'Em-reteste-homolog').length
    const obrigatoriosBloqueados = obrigatorios.filter(r => r.statusHomolog === 'Bloqueado').length
    // Pendentes = total - (aprovados + reprovados + em teste + bloqueados)
    const obrigatoriosPendentes = totalObrigatorios - obrigatoriosAprovados - obrigatoriosReprovados - obrigatoriosEmTeste - obrigatoriosBloqueados

    return {
      total,
      implementados,
      parciais,
      naoImplementados,
      aprovadosQA,
      reprovadosQA,
      pendentesQA,
      emTesteQA,
      aprovadosHomolog,
      reprovadosHomolog,
      pendentesHomolog,
      emTesteHomolog,
      paraTesteHomolog,
      paraRetesteHomolog,
      bloqueadosHomolog,
      totalObrigatorios,
      obrigatoriosAprovados,
      obrigatoriosReprovados,
      obrigatoriosPendentes,
      obrigatoriosEmTeste,
      obrigatoriosBloqueados,
      taxaImplementacao: total > 0 ? ((implementados / total) * 100).toFixed(1) : 0,
      taxaAprovacao: total > 0 ? ((aprovadosQA / total) * 100).toFixed(1) : 0,
      taxaAprovacaoHomolog: total > 0 ? ((aprovadosHomolog / total) * 100).toFixed(1) : 0,
      taxaObrigatoriosAprovados: totalObrigatorios > 0 ? ((obrigatoriosAprovados / totalObrigatorios) * 100).toFixed(1) : 0,
      aprovadosQADev,
      reprovadosQADev,
      pendentesQADev,
      emTesteQADev,
      paraTesteQADev,
      paraTesteQA
    }
  }, [requirements])

  // Dados para gráficos
  const statusDevData = useMemo(() => [
    { name: 'Implementado', value: stats.implementados, color: STATUS_DEV_COLORS['IMPLEMENTADO'] },
    { name: 'Parcial', value: stats.parciais, color: STATUS_DEV_COLORS['PARCIAL'] },
    { name: 'Não Implementado', value: stats.naoImplementados, color: STATUS_DEV_COLORS['NAO_IMPLEMENTADO'] }
  ], [stats])

  const statusQAData = useMemo(() => [
    { name: 'Aprovado', value: stats.aprovadosQA, color: STATUS_COLORS['Aprovado'] },
    { name: 'Reprovado', value: stats.reprovadosQA, color: STATUS_COLORS['Reprovado'] },
    { name: 'Pendente', value: stats.pendentesQA, color: STATUS_COLORS['Pendente'] },
    { name: 'Em Teste', value: stats.emTesteQA, color: STATUS_COLORS['Em Teste'] }
  ], [stats])

  // Dados para gráfico de Status Homologação (principal)
  const statusHomologData = useMemo(() => [
    { name: 'Aprovado', value: stats.aprovadosHomolog, color: '#22c55e' },
    { name: 'Reprovado', value: stats.reprovadosHomolog, color: '#ef4444' },
    { name: 'Pendente', value: stats.pendentesHomolog, color: '#eab308' },
    { name: 'Em Teste', value: stats.emTesteHomolog, color: '#3b82f6' },
    { name: 'Bloqueado', value: stats.bloqueadosHomolog, color: '#6b7280' }
  ], [stats])

  // Dados para gráfico de Requisitos Obrigatórios (apenas Aprovado, Reprovado, Pendente)
  const obrigatoriosData = useMemo(() => [
    { name: 'Aprovado', value: stats.obrigatoriosAprovados, color: '#22c55e' },
    { name: 'Reprovado', value: stats.obrigatoriosReprovados, color: '#ef4444' },
    { name: 'Pendente', value: stats.obrigatoriosPendentes, color: '#eab308' }
  ], [stats])

  // Dados para gráfico comparativo Dev vs QA Dev vs QA Homolog
  const comparativoData = useMemo(() => [
    { 
      name: 'Implementado/Aprovado', 
      dev: stats.implementados, 
      qaDev: stats.aprovadosQADev, 
      qaHomolog: stats.aprovadosQA 
    },
    { 
      name: 'Para Teste', 
      dev: 0, 
      qaDev: stats.paraTesteQADev, 
      qaHomolog: stats.paraTesteQA 
    },
    { 
      name: 'Em Teste', 
      dev: 0, 
      qaDev: stats.emTesteQADev, 
      qaHomolog: stats.emTesteQA 
    },
    { 
      name: 'Reprovado', 
      dev: 0, 
      qaDev: stats.reprovadosQADev, 
      qaHomolog: stats.reprovadosQA 
    }
  ], [stats])

  // Dados para gráfico de Status Homolog em barras
  const statusHomologBarData = useMemo(() => [
    { name: 'Aprovado', value: stats.aprovadosHomolog, color: '#22c55e' },
    { name: 'Para Teste Homolog', value: stats.paraTesteHomolog, color: '#06b6d4' },
    { name: 'Em Teste', value: stats.emTesteHomolog, color: '#3b82f6' },
    { name: 'Para Reteste Homolog', value: stats.paraRetesteHomolog, color: '#a855f7' },
    { name: 'Pendente', value: stats.pendentesHomolog, color: '#eab308' },
    { name: 'Reprovado', value: stats.reprovadosHomolog, color: '#ef4444' },
    { name: 'Bloqueado', value: stats.bloqueadosHomolog, color: '#6b7280' }
  ], [stats])

  // Dados por módulo (usando Status Homologação)
  const moduleData = useMemo(() => {
    const byModule = requirements.reduce((acc, req) => {
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
  }, [requirements])

  // Estatísticas de aprovações por semana
  const aprovacoesPorSemana = useMemo(() => {
    const reqsComData = requirements.filter(r => r.dataAprovacaoHomolog && r.statusHomolog === 'Aprovado')
    
    if (reqsComData.length === 0) return { semanas: [], mediaAprovacoesSemana: 0, totalComData: 0 }
    
    // Agrupar por semana (segunda a domingo)
    const porSemana = reqsComData.reduce((acc, req) => {
      const data = new Date(req.dataAprovacaoHomolog)
      // Pegar início da semana (segunda-feira)
      const diaSemana = data.getDay()
      const diff = diaSemana === 0 ? -6 : 1 - diaSemana // Ajustar para segunda
      const inicioSemana = new Date(data)
      inicioSemana.setDate(data.getDate() + diff)
      inicioSemana.setHours(0, 0, 0, 0)
      
      const chave = inicioSemana.toISOString().split('T')[0]
      if (!acc[chave]) {
        acc[chave] = { 
          semana: chave, 
          inicio: inicioSemana,
          quantidade: 0,
          requisitos: []
        }
      }
      acc[chave].quantidade++
      acc[chave].requisitos.push(req.id)
      return acc
    }, {})
    
    const semanas = Object.values(porSemana)
      .sort((a, b) => new Date(b.semana) - new Date(a.semana))
      .slice(0, 8) // Últimas 8 semanas
      .reverse()
    
    const totalSemanas = semanas.length
    const totalAprovacoes = semanas.reduce((sum, s) => sum + s.quantidade, 0)
    const mediaAprovacoesSemana = totalSemanas > 0 ? (totalAprovacoes / totalSemanas).toFixed(1) : 0
    
    return { 
      semanas, 
      mediaAprovacoesSemana, 
      totalComData: reqsComData.length 
    }
  }, [requirements])

  // Formatar data da semana para exibição
  const formatarSemana = (dataStr) => {
    const data = new Date(dataStr)
    const fimSemana = new Date(data)
    fimSemana.setDate(data.getDate() + 6)
    
    const formatarDia = (d) => `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`
    return `${formatarDia(data)} - ${formatarDia(fimSemana)}`
  }

  // Handler para importar arquivo Excel
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImporting(true)
    setLoadingMessage('Importando planilha...')
    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      
      // Mostrar todas as abas disponíveis
      console.log('Abas disponíveis:', workbook.SheetNames)
      
      // Procurar a aba "Requisitos" ou usar a primeira
      const sheetName = workbook.SheetNames.find(name => 
        name.toLowerCase().includes('requisito')
      ) || workbook.SheetNames[0]
      
      console.log('Aba selecionada:', sheetName)
      
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      
      // Mostrar primeiras linhas para debug
      console.log('Primeiras 3 linhas:', jsonData.slice(0, 3))
      
      // Encontrar o índice das colunas pelo cabeçalho
      const headers = jsonData[0] || []
      console.log('Headers encontrados:', headers)
      
      const colIndex = {
        id: headers.findIndex(h => h?.toString().toLowerCase() === 'id'),
        responsavel: headers.findIndex(h => h?.toString().toLowerCase().includes('responsável') || h?.toString().toLowerCase() === 'responsavel'),
        modulo: headers.findIndex(h => h?.toString().toLowerCase().includes('módulo') || h?.toString().toLowerCase() === 'modulo'),
        descricao: headers.findIndex(h => h?.toString().toLowerCase().includes('descrição') || h?.toString().toLowerCase() === 'descricao'),
        arquivoFonte: headers.findIndex(h => h?.toString().toLowerCase().includes('arquivo fonte')),
        obrigatorio: headers.findIndex(h => h?.toString().toLowerCase().includes('obrigatório') || h?.toString().toLowerCase() === 'obrigatorio'),
        statusDev: headers.findIndex(h => h?.toString().toLowerCase() === 'status dev'),
        jiraLink: headers.findIndex(h => h?.toString().toLowerCase().includes('jira')),
        versaoDev: headers.findIndex(h => h?.toString().toLowerCase().includes('versão dev') || h?.toString().toLowerCase() === 'versao dev'),
        versaoHomolog: headers.findIndex(h => h?.toString().toLowerCase().includes('versão homolog') || h?.toString().toLowerCase() === 'versao homolog'),
        statusQADev: headers.findIndex(h => h?.toString().toLowerCase() === 'status qa - dev'),
        statusQAHomolog: headers.findIndex(h => h?.toString().toLowerCase() === 'status qa - homolog'),
        observacaoQA: headers.findIndex(h => h?.toString().toLowerCase().includes('observação qa') || h?.toString().toLowerCase() === 'observacao qa'),
        statusHomolog: headers.findIndex(h => h?.toString().toLowerCase() === 'status homolog'),
        observacao: headers.findIndex(h => h?.toString().toLowerCase() === 'observação')
      }
      
      console.log('Índices das colunas:', colIndex)

      // Converter dados para objetos
      const requirements = jsonData.slice(1).map((row, index) => ({
        id: row[colIndex.id] || `REQ-${index + 1}`,
        responsavel: row[colIndex.responsavel] || '',
        modulo: row[colIndex.modulo] || '',
        descricao: row[colIndex.descricao] || '',
        arquivoFonte: row[colIndex.arquivoFonte] || '',
        obrigatorio: row[colIndex.obrigatorio] || '',
        statusDev: row[colIndex.statusDev] || '',
        jiraLink: row[colIndex.jiraLink] || '',
        versaoDev: row[colIndex.versaoDev] || '',
        versaoHomolog: row[colIndex.versaoHomolog] || '',
        statusQADev: row[colIndex.statusQADev] || '',
        statusQAHomolog: row[colIndex.statusQAHomolog] || '',
        observacaoQA: row[colIndex.observacaoQA] || '',
        statusHomolog: row[colIndex.statusHomolog] || 'Pendente',
        observacao: row[colIndex.observacao] || ''
      })).filter(req => req.id && req.id.toString().trim() !== '')

      await onImport(requirements)
      alert(`${requirements.length} requisitos importados com sucesso!`)
    } catch (error) {
      console.error('Erro ao importar:', error)
      alert('Erro ao importar arquivo. Verifique se é um arquivo Excel válido.')
    } finally {
      setImporting(false)
      setLoadingMessage('')
      e.target.value = ''
    }
  }

  const getStatusDevBadge = (status) => {
    const colors = {
      'IMPLEMENTADO': 'bg-green-100 text-green-700',
      'PARCIAL': 'bg-orange-100 text-orange-700',
      'NAO_IMPLEMENTADO': 'bg-red-100 text-red-700'
    }
    const labels = {
      'IMPLEMENTADO': 'Implementado',
      'PARCIAL': 'Parcial',
      'NAO_IMPLEMENTADO': 'Não Impl.'
    }
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
        {labels[status] || status || '-'}
      </span>
    )
  }

  const getStatusQABadge = (status) => {
    const colors = {
      'Aprovado': 'bg-green-100 text-green-700',
      'Reprovado': 'bg-red-100 text-red-700',
      'Pendente': 'bg-yellow-100 text-yellow-700',
      'Em Teste': 'bg-blue-100 text-blue-700',
      'Em-reteste-homolog': 'bg-orange-100 text-orange-700',
      'Para_Correcao': 'bg-red-100 text-red-700',
      'Em_Correcao': 'bg-orange-100 text-orange-700',
      'Para_Teste_QA': 'bg-cyan-100 text-cyan-700',
      'Para_Reteste_QA': 'bg-purple-100 text-purple-700',
      'Aguardando_Deploy': 'bg-indigo-100 text-indigo-700',
      'Dúvida': 'bg-pink-100 text-pink-700'
    }
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
        {status || '-'}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Loading Spinner */}
      {loadingMessage && <LoadingSpinner message={loadingMessage} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Requisitos</h1>
          <p className="text-gray-600 mt-1">
            {requirements.length > 0 
              ? `${requirements.length} requisitos carregados`
              : 'Importe sua planilha de requisitos'}
          </p>
        </div>
        <div className="flex gap-2">
          {requirements.length > 0 && (
            <button
              disabled
              title="Botão desabilitado para evitar perda acidental de dados"
              className="btn-secondary flex items-center gap-2 text-sm text-gray-400 cursor-not-allowed opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Limpar Dados
            </button>
          )}
          <label className={`flex items-center gap-2 ${requirements.length > 0 ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary cursor-pointer'}`}>
            <Upload className="w-4 h-4" />
            {importing ? 'Importando...' : 'Importar Planilha'}
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              disabled={importing || requirements.length > 0}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3 items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{filteredRequirements.length}</span> requisitos filtrados
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleExportCSV}
              disabled={exporting || exportableRequirements.length === 0}
              className="btn-secondary flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              CSV
            </button>
            <button
              onClick={handleExportExcel}
              disabled={exporting || exportableRequirements.length === 0}
              className="btn-secondary flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
              Excel
            </button>
            <button
              onClick={handleExportMarkdown}
              disabled={exporting || exportableRequirements.length === 0}
              className="btn-secondary flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              Markdown
            </button>
          </div>
        </div>
      </div>

      {requirements.length === 0 ? (
        /* Empty State */
        <div className="card text-center py-16">
          <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum requisito importado</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Importe sua planilha Excel com os requisitos para visualizar estatísticas e acompanhar a evolução dos testes.
          </p>
          <label className="btn-primary inline-flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            Selecionar Arquivo Excel
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              disabled={importing}
            />
          </label>
          <p className="text-xs text-gray-500 mt-4">
            Formatos aceitos: .xlsx, .xls
          </p>
        </div>
      ) : (
        <>
          {/* Stats Cards - Status Homologação como principal */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <FileSpreadsheet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
                  <p className="text-xs text-blue-600">Total Requisitos</p>
                </div>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700">{stats.taxaAprovacaoHomolog}%</p>
                  <p className="text-xs text-green-600">Aprovados Homolog</p>
                </div>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-700">{stats.pendentesHomolog}</p>
                  <p className="text-xs text-yellow-600">Pendentes Homolog</p>
                </div>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500 rounded-lg">
                  <XCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-700">{stats.reprovadosHomolog}</p>
                  <p className="text-xs text-red-600">Reprovados Homolog</p>
                </div>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-cyan-700">{stats.taxaImplementacao}%</p>
                  <p className="text-xs text-cyan-600">Implementados Dev</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-4 gap-4">
            {/* Requisitos Obrigatórios - DESTAQUE */}
            <div className="card border-2 border-red-200 bg-red-50/30">
              <h3 className="font-semibold text-red-900 mb-4">⚠️ Obrigatórios ({stats.totalObrigatorios})</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={obrigatoriosData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {obrigatoriosData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {obrigatoriosData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span>{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Homologação - PRINCIPAL */}
            <div className="card border-2 border-indigo-200">
              <h3 className="font-semibold text-indigo-900 mb-4">📊 Status Homologação</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusHomologData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {statusHomologData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {statusHomologData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span>{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Dev */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Status Desenvolvimento</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDevData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {statusDevData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {statusDevData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span>{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Por Módulo */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Top 10 Módulos (Homolog)</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moduleData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 10 }} />
                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 9 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="aprovado" name="Aprovado" stackId="a" fill="#22c55e" />
                    <Bar dataKey="pendente" name="Pendente" stackId="a" fill="#eab308" />
                    <Bar dataKey="reprovado" name="Reprovado" stackId="a" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Gráfico Comparativo Dev vs QA Dev vs QA Homolog */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">📈 Comparativo: Dev × QA Dev × QA Homolog</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparativoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="dev" name="Implementado (Dev)" fill="#22c55e" />
                  <Bar dataKey="qaDev" name="QA Dev" fill="#3b82f6" />
                  <Bar dataKey="qaHomolog" name="QA Homolog" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: '#22c55e' }} />
                <span>Implementado (Dev): {stats.implementados}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: '#3b82f6' }} />
                <span>Aprovados QA Dev: {stats.aprovadosQADev}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: '#8b5cf6' }} />
                <span>Aprovados QA Homolog: {stats.aprovadosQA}</span>
              </div>
            </div>
          </div>

          {/* Gráfico Status Homolog em Barras */}
          <div className="card">
            <h3 className="font-semibold text-indigo-900 mb-4">📊 Status Homologação (Detalhado)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusHomologBarData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Quantidade">
                    {statusHomologBarData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs">
              {statusHomologBarData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: entry.color }} />
                  <span>{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Estatísticas de Aprovações por Semana */}
          {aprovacoesPorSemana.semanas.length > 0 && (
            <div className="card border-2 border-emerald-200 bg-emerald-50/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-emerald-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Aprovações por Semana
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="bg-emerald-100 px-3 py-1 rounded-lg">
                    <span className="text-emerald-600">Média:</span>
                    <span className="font-bold text-emerald-700 ml-1">{aprovacoesPorSemana.mediaAprovacoesSemana}/semana</span>
                  </div>
                  <div className="bg-blue-100 px-3 py-1 rounded-lg">
                    <span className="text-blue-600">Total c/ data:</span>
                    <span className="font-bold text-blue-700 ml-1">{aprovacoesPorSemana.totalComData}</span>
                  </div>
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aprovacoesPorSemana.semanas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="semana" 
                      tick={{ fontSize: 10 }} 
                      tickFormatter={formatarSemana}
                    />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-lg">
                              <p className="text-gray-200 font-medium mb-1">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {formatarSemana(data.semana)}
                              </p>
                              <p className="text-emerald-400 font-bold">{data.quantidade} aprovações</p>
                              {data.requisitos.length <= 5 && (
                                <p className="text-gray-400 text-xs mt-1">
                                  {data.requisitos.join(', ')}
                                </p>
                              )}
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="quantidade" name="Aprovações" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-emerald-600 mt-2 text-center">
                Últimas {aprovacoesPorSemana.semanas.length} semanas com aprovações registradas
              </p>
            </div>
          )}

          {/* Filters & Export */}
          <div className="card space-y-4">
            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
              <div className="flex-1 relative min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Buscar por ID, descrição, responsável ou módulo..."
                />
              </div>
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
              <select
                value={filterObrigatorio}
                onChange={(e) => { setFilterObrigatorio(e.target.value); setCurrentPage(1); }}
                className="input-field md:w-32 border-red-300 bg-red-50"
              >
                <option value="all">Obrigatório</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
              <select
                value={filterStatusHomolog}
                onChange={(e) => { setFilterStatusHomolog(e.target.value); setCurrentPage(1); }}
                className="input-field md:w-40 border-indigo-300 bg-indigo-50"
              >
                <option value="all">Status Homolog</option>
                <option value="Para_Teste_Homolog">Para Teste Homolog</option>
                <option value="Aprovado">Aprovado</option>
                <option value="Reprovado">Reprovado</option>
                <option value="Pendente">Pendente</option>
                <option value="Em Teste">Em Teste</option>
                <option value="Em-reteste-homolog">Em Reteste</option>
                <option value="Para_Reteste_Homolog">Para Reteste Homolog</option>
                <option value="Bloqueado">Bloqueado</option>
              </select>
              <select
                value={filterStatusDev}
                onChange={(e) => { setFilterStatusDev(e.target.value); setCurrentPage(1); }}
                className="input-field md:w-36"
              >
                <option value="all">Status Dev</option>
                <option value="IMPLEMENTADO">Implementado</option>
                <option value="PARCIAL">Parcial</option>
                <option value="NAO_IMPLEMENTADO">Não Impl.</option>
              </select>
              <select
                value={filterStatusQADev}
                onChange={(e) => { setFilterStatusQADev(e.target.value); setCurrentPage(1); }}
                className="input-field md:w-32"
              >
                <option value="all">QA Dev</option>
                {STATUS_QA_OPTIONS.filter(o => o.value !== '').map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                value={filterStatusQAHomolog}
                onChange={(e) => { setFilterStatusQAHomolog(e.target.value); setCurrentPage(1); }}
                className="input-field md:w-36"
              >
                <option value="all">QA Homolog</option>
                {STATUS_QA_OPTIONS.filter(o => o.value !== '').map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {/* Botão Limpar Filtros */}
              {(searchTerm || filterModule !== 'all' || filterObrigatorio !== 'all' || filterStatusHomolog !== 'all' || filterStatusDev !== 'all' || filterStatusQADev !== 'all' || filterStatusQAHomolog !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setFilterModule('all')
                    setFilterObrigatorio('all')
                    setFilterStatusHomolog('all')
                    setFilterStatusDev('all')
                    setFilterStatusQADev('all')
                    setFilterStatusQAHomolog('all')
                    setCurrentPage(1)
                  }}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 flex items-center gap-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Limpar
                </button>
              )}
            </div>
          </div>

          {/* Requirements Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 text-xs border-r border-gray-200">ID</th>
                    <th className="px-2 py-2 text-center font-medium text-red-700 bg-red-50 text-xs border-r border-gray-200">Obrig.</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 text-xs border-r border-gray-200">Módulo</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 text-xs border-r border-gray-200">Descrição</th>
                    <th className="px-2 py-2 text-center font-medium text-gray-700 text-xs border-r border-gray-200">Status Dev</th>
                    <th className="px-2 py-2 text-center font-medium text-gray-700 text-xs border-r border-gray-200">QA Dev</th>
                    <th className="px-2 py-2 text-center font-medium text-gray-700 text-xs border-r border-gray-200">QA Homolog</th>
                    <th className="px-2 py-2 text-center font-medium text-indigo-700 bg-indigo-50 text-xs border-r border-gray-200">Status Homolog</th>
                    <th className="px-2 py-2 text-center font-medium text-emerald-700 bg-emerald-50 text-xs border-r border-gray-200">Data Aprov.</th>
                    <th className="px-2 py-2 text-center font-medium text-gray-700 text-xs border-r border-gray-200">V. Dev</th>
                    <th className="px-2 py-2 text-center font-medium text-gray-700 text-xs border-r border-gray-200">V. Homolog</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700 text-xs">Observação</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginatedRequirements.map((req, index) => (
                    <tr key={req.firebaseId || req.id || index} className={`hover:bg-blue-50/30 ${(req.obrigatorio === 'SIM' || req.obrigatorio === 'Sim') ? 'bg-red-50/30' : ''}`}>
                      <td className="px-3 py-2 font-mono text-xs text-blue-600 border-r border-gray-100">{req.id}</td>
                      <td className="px-2 py-2 text-center border-r border-gray-100">
                        {(req.obrigatorio === 'SIM' || req.obrigatorio === 'Sim' || req.obrigatorio === 'sim') ? (
                          <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">SIM</span>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-3 py-2 border-r border-gray-100">
                        <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{req.modulo || '-'}</span>
                      </td>
                      <td className="px-3 py-2 max-w-[200px] truncate text-xs border-r border-gray-100" title={req.descricao}>
                        {req.descricao}
                      </td>
                      {/* Status Dev - Editável */}
                      <td className="px-2 py-2 text-center border-r border-gray-100">
                        <select
                          value={req.statusDev || ''}
                          onChange={(e) => handleStatusChange(req, 'statusDev', e.target.value)}
                          disabled={!req.firebaseId}
                          className={`text-xs px-1 py-0.5 rounded border font-medium ${
                            req.statusDev === 'IMPLEMENTADO' ? 'bg-green-100 text-green-700 border-green-300' :
                            req.statusDev === 'PARCIAL' ? 'bg-orange-100 text-orange-700 border-orange-300' :
                            req.statusDev === 'NAO_IMPLEMENTADO' ? 'bg-red-100 text-red-700 border-red-300' :
                            'bg-gray-100 text-gray-600 border-gray-200'
                          } ${!req.firebaseId ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {STATUS_DEV_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                      {/* Status QA Dev - Editável */}
                      <td className="px-2 py-2 text-center border-r border-gray-100">
                        <select
                          value={req.statusQADev || ''}
                          onChange={(e) => handleStatusChange(req, 'statusQADev', e.target.value)}
                          disabled={!req.firebaseId}
                          className={`text-xs px-1 py-0.5 rounded border font-medium ${
                            req.statusQADev === 'Aprovado' ? 'bg-green-100 text-green-700 border-green-300' :
                            req.statusQADev === 'Reprovado' ? 'bg-red-100 text-red-700 border-red-300' :
                            req.statusQADev === 'Para_Correcao' ? 'bg-red-100 text-red-700 border-red-300' :
                            req.statusQADev === 'Em_Correcao' ? 'bg-orange-100 text-orange-700 border-orange-300' :
                            req.statusQADev === 'Em Teste' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                            req.statusQADev === 'Para_Teste_QA' ? 'bg-cyan-100 text-cyan-700 border-cyan-300' :
                            req.statusQADev === 'Pendente' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                            req.statusQADev === 'Para_Reteste_QA' ? 'bg-purple-100 text-purple-700 border-purple-300' :
                            req.statusQADev === 'Aguardando_Deploy' ? 'bg-indigo-100 text-indigo-700 border-indigo-300' :
                            req.statusQADev === 'Dúvida' ? 'bg-pink-100 text-pink-700 border-pink-300' :
                            'bg-gray-50 text-gray-500 border-gray-200'
                          } ${!req.firebaseId ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {STATUS_QA_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                      {/* Status QA Homolog - Editável */}
                      <td className="px-2 py-2 text-center border-r border-gray-100">
                        <select
                          value={req.statusQAHomolog || ''}
                          onChange={(e) => handleStatusChange(req, 'statusQAHomolog', e.target.value)}
                          disabled={!req.firebaseId}
                          className={`text-xs px-1 py-0.5 rounded border font-medium ${
                            req.statusQAHomolog === 'Aprovado' ? 'bg-green-100 text-green-700 border-green-300' :
                            req.statusQAHomolog === 'Reprovado' ? 'bg-red-100 text-red-700 border-red-300' :
                            req.statusQAHomolog === 'Em Teste' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                            req.statusQAHomolog === 'Para_Teste_QA' ? 'bg-cyan-100 text-cyan-700 border-cyan-300' :
                            req.statusQAHomolog === 'Pendente' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                            req.statusQAHomolog === 'Para_Reteste_QA' ? 'bg-purple-100 text-purple-700 border-purple-300' :
                            req.statusQAHomolog === 'Aguardando_Deploy' ? 'bg-indigo-100 text-indigo-700 border-indigo-300' :
                            req.statusQAHomolog === 'Dúvida' ? 'bg-pink-100 text-pink-700 border-pink-300' :
                            'bg-gray-50 text-gray-500 border-gray-200'
                          } ${!req.firebaseId ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {STATUS_QA_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                      {/* Status Homolog - Principal */}
                      <td className="px-2 py-2 text-center bg-indigo-50/50 border-r border-gray-100">
                        <select
                          value={req.statusHomolog || 'Pendente'}
                          onChange={(e) => handleStatusChange(req, 'statusHomolog', e.target.value)}
                          disabled={!req.firebaseId || updatingId === req.firebaseId}
                          title={!req.firebaseId ? 'Reimporte a planilha para editar' : ''}
                          className={`text-xs px-1 py-0.5 rounded border font-medium ${
                            req.statusHomolog === 'Aprovado' ? 'bg-green-100 text-green-700 border-green-300' :
                            req.statusHomolog === 'Reprovado' ? 'bg-red-100 text-red-700 border-red-300' :
                            req.statusHomolog === 'Em Teste' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                            req.statusHomolog === 'Para_Teste_Homolog' ? 'bg-cyan-100 text-cyan-700 border-cyan-300' :
                            req.statusHomolog === 'Em-reteste-homolog' ? 'bg-orange-100 text-orange-700 border-orange-300' :
                            req.statusHomolog === 'Para_Reteste_Homolog' ? 'bg-purple-100 text-purple-700 border-purple-300' :
                            req.statusHomolog === 'Bloqueado' ? 'bg-gray-100 text-gray-700 border-gray-300' :
                            'bg-yellow-100 text-yellow-700 border-yellow-300'
                          } ${!req.firebaseId ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${updatingId === req.firebaseId ? 'opacity-50' : ''}`}
                        >
                          {STATUS_HOMOLOG_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                      {/* Data Aprovação Homolog */}
                      <td className="px-2 py-2 text-center bg-emerald-50/50 border-r border-gray-100">
                        {req.dataAprovacaoHomolog ? (
                          <span className="text-xs text-emerald-700 font-medium">
                            {new Date(req.dataAprovacaoHomolog).toLocaleDateString('pt-BR')}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                      {/* Versão Dev */}
                      <td className="px-2 py-2 text-center border-r border-gray-100">
                        <input
                          type="text"
                          defaultValue={req.versaoDev || ''}
                          onBlur={(e) => e.target.value !== (req.versaoDev || '') && handleStatusChange(req, 'versaoDev', e.target.value)}
                          disabled={!req.firebaseId}
                          placeholder="-"
                          className="w-16 text-xs px-2 py-1 rounded border border-gray-200 text-center bg-white disabled:opacity-60 disabled:cursor-not-allowed focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                        />
                      </td>
                      {/* Versão Homolog */}
                      <td className="px-2 py-2 text-center border-r border-gray-100">
                        <input
                          type="text"
                          defaultValue={req.versaoHomolog || ''}
                          onBlur={(e) => e.target.value !== (req.versaoHomolog || '') && handleStatusChange(req, 'versaoHomolog', e.target.value)}
                          disabled={!req.firebaseId}
                          placeholder="-"
                          className="w-16 text-xs px-2 py-1 rounded border border-gray-200 text-center bg-white disabled:opacity-60 disabled:cursor-not-allowed focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                        />
                      </td>
                      {/* Observação */}
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          defaultValue={req.observacao || ''}
                          onBlur={(e) => e.target.value !== (req.observacao || '') && handleStatusChange(req, 'observacao', e.target.value)}
                          disabled={!req.firebaseId}
                          placeholder="-"
                          className="w-36 text-xs px-2 py-1 rounded border border-gray-200 bg-white disabled:opacity-60 disabled:cursor-not-allowed focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Paginação */}
            <div className="px-4 py-3 bg-gray-50 border-t flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredRequirements.length)} de {filteredRequirements.length} requisitos
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 text-xs rounded border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ««
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 text-xs rounded border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  «
                </button>
                <span className="px-3 py-1 text-sm font-medium">
                  Página {currentPage} de {totalPages || 1}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="px-2 py-1 text-xs rounded border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  »
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage >= totalPages}
                  className="px-2 py-1 text-xs rounded border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  »»
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
