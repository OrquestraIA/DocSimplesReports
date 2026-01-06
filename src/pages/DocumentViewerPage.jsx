import { useState } from 'react'
import { FileText, Trash2, Eye, Download, Search, Filter, CheckCircle2, XCircle, Clock, ChevronDown, MessageSquare, Send, RefreshCw, ThumbsUp, Image, X, Loader2, Edit3, Save, Plus } from 'lucide-react'
import { addCommentToTestDocument, uploadScreenshot } from '../firebase'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun } from 'docx'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'

export default function DocumentViewerPage({ documents, onUpdate, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [exportMenuOpen, setExportMenuOpen] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [commentType, setCommentType] = useState('resposta')
  const [sendingComment, setSendingComment] = useState(false)
  const [commentScreenshots, setCommentScreenshots] = useState([])
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState(null)
  const [saving, setSaving] = useState(false)

  // Função para upload de screenshot no comentário
  const handleCommentScreenshot = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    
    setUploadingScreenshot(true)
    try {
      const tempId = `comment_${Date.now()}`
      const uploadPromises = files.map(file => uploadScreenshot(file, tempId))
      const uploadedFiles = await Promise.all(uploadPromises)
      setCommentScreenshots([...commentScreenshots, ...uploadedFiles])
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      alert('Erro ao fazer upload da imagem.')
    } finally {
      setUploadingScreenshot(false)
    }
  }

  const removeCommentScreenshot = (index) => {
    setCommentScreenshots(commentScreenshots.filter((_, i) => i !== index))
  }

  // Função para enviar comentário/interação
  const handleSendComment = async (type) => {
    if (!newComment.trim() && type === 'resposta' && commentScreenshots.length === 0) return
    
    setSendingComment(true)
    try {
      const comment = {
        type: type, // 'resposta', 'solicitar_reteste', 'aprovado_reteste'
        text: newComment.trim(),
        author: 'Desenvolvedor', // Pode ser dinâmico baseado no usuário logado
        screenshots: commentScreenshots
      }
      
      await addCommentToTestDocument(selectedDoc.id, comment)
      
      // Se for aprovação após reteste, atualizar status do documento
      if (type === 'aprovado_reteste') {
        await onUpdate(selectedDoc.id, { status: 'aprovado' })
      }
      // Se for solicitação de reteste, mudar status para 'em_reteste'
      if (type === 'solicitar_reteste') {
        await onUpdate(selectedDoc.id, { status: 'em_reteste' })
      }
      
      setNewComment('')
      setCommentScreenshots([])
      // Atualizar o documento selecionado com os novos comentários
      const updatedDoc = documents.find(d => d.id === selectedDoc.id)
      if (updatedDoc) {
        setSelectedDoc({...updatedDoc, comments: [...(updatedDoc.comments || []), comment]})
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error)
      alert('Erro ao enviar comentário. Tente novamente.')
    } finally {
      setSendingComment(false)
    }
  }

  // Função para formatar tipo de comentário
  const getCommentTypeLabel = (type) => {
    switch(type) {
      case 'solicitar_reteste': return 'Solicitou Reteste'
      case 'aprovado_reteste': return 'Aprovou após Reteste'
      case 'feedback': return 'Feedback'
      default: return 'Resposta'
    }
  }

  const getCommentTypeColor = (type) => {
    switch(type) {
      case 'solicitar_reteste': return 'bg-orange-100 text-orange-700'
      case 'aprovado_reteste': return 'bg-green-100 text-green-700'
      case 'feedback': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  // Funções de edição
  const startEdit = () => {
    setEditData({
      title: selectedDoc.title,
      feature: selectedDoc.feature,
      module: selectedDoc.module || '',
      testType: selectedDoc.testType,
      priority: selectedDoc.priority,
      status: selectedDoc.status,
      tester: selectedDoc.tester,
      environment: selectedDoc.environment || '',
      preconditions: selectedDoc.preconditions || '',
      observations: selectedDoc.observations || '',
      steps: selectedDoc.steps || [{ action: '', expectedResult: '', actualResult: '', status: 'pendente' }]
    })
    setEditMode(true)
  }

  const cancelEdit = () => {
    setEditMode(false)
    setEditData(null)
  }

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value })
  }

  const handleStepChange = (index, field, value) => {
    const newSteps = [...editData.steps]
    newSteps[index][field] = value
    setEditData({ ...editData, steps: newSteps })
  }

  const addStep = () => {
    setEditData({
      ...editData,
      steps: [...editData.steps, { action: '', expectedResult: '', actualResult: '', status: 'pendente' }]
    })
  }

  const removeStep = (index) => {
    if (editData.steps.length > 1) {
      const newSteps = editData.steps.filter((_, i) => i !== index)
      setEditData({ ...editData, steps: newSteps })
    }
  }

  const saveEdit = async () => {
    setSaving(true)
    try {
      await onUpdate(selectedDoc.id, editData)
      setSelectedDoc({ ...selectedDoc, ...editData })
      setEditMode(false)
      setEditData(null)
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar alterações.')
    } finally {
      setSaving(false)
    }
  }

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.feature.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
    const matchesType = filterType === 'all' || doc.testType === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const exportAsTxt = (doc) => {
    const content = generateDocumentText(doc)
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `teste-${doc.title.replace(/\s+/g, '-').toLowerCase()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setExportMenuOpen(null)
  }

  const exportAsMarkdown = (doc) => {
    const content = generateMarkdown(doc)
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `teste-${doc.title.replace(/\s+/g, '-').toLowerCase()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setExportMenuOpen(null)
  }

  const generateMarkdown = (doc) => {
    let md = `# ${doc.title}\n\n`
    md += `## Informações Gerais\n\n`
    md += `| Campo | Valor |\n|-------|-------|\n`
    md += `| Feature | ${doc.feature} |\n`
    md += `| Módulo | ${doc.module || 'N/A'} |\n`
    md += `| Tipo | ${doc.testType} |\n`
    md += `| Prioridade | ${doc.priority} |\n`
    md += `| Status | **${doc.status.toUpperCase()}** |\n`
    md += `| Testador | ${doc.tester} |\n`
    md += `| Ambiente | ${doc.environment || 'N/A'} |\n`
    md += `| Data | ${new Date(doc.createdAt).toLocaleString('pt-BR')} |\n\n`
    
    if (doc.preconditions) {
      md += `## Pré-condições\n\n${doc.preconditions}\n\n`
    }
    
    md += `## Passos do Teste\n\n`
    doc.steps.forEach((step, i) => {
      md += `### Passo ${i + 1}\n\n`
      md += `- **Ação:** ${step.action}\n`
      md += `- **Esperado:** ${step.expectedResult}\n`
      md += `- **Obtido:** ${step.actualResult}\n`
      md += `- **Status:** ${step.status}\n\n`
    })
    
    if (doc.elements && doc.elements.length > 0 && doc.elements[0].name) {
      md += `## Elementos da Interface\n\n`
      md += `| Nome | Selector | Tipo |\n|------|----------|------|\n`
      doc.elements.forEach(el => {
        if (el.name) {
          md += `| ${el.name} | \`${el.selector}\` | ${el.type} |\n`
        }
      })
      md += `\n`
    }
    
    if (doc.screenshots && doc.screenshots.length > 0) {
      md += `## Screenshots / Evidências\n\n`
      doc.screenshots.forEach((screenshot, i) => {
        md += `![${screenshot.name}](${screenshot.url})\n\n`
      })
    }

    if (doc.observations) {
      md += `## Observações\n\n${doc.observations}\n\n`
    }
    
    return md
  }

  const fetchImageAsBase64 = async (url) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.error('Erro ao carregar imagem:', error)
      return null
    }
  }

  const fetchImageAsArrayBuffer = async (url) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      return await blob.arrayBuffer()
    } catch (error) {
      console.error('Erro ao carregar imagem:', error)
      return null
    }
  }

  const exportAsDocx = async (doc) => {
    // Carregar logo
    let logoImageData = null
    try {
      logoImageData = await fetchImageAsArrayBuffer('/DocSimplesReports/logo.jpg')
    } catch (e) {
      console.log('Logo não encontrado para DOCX')
    }

    const children = []

    // Cabeçalho com logo e nome
    if (logoImageData) {
      children.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: logoImageData,
              transformation: { width: 50, height: 50 },
              type: 'jpg'
            }),
          ],
          spacing: { after: 100 },
        })
      )
    }
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'DocSimples Reports', bold: true, size: 32, color: '2563EB' })
        ],
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Sistema de Documentação de Testes', size: 20, color: '666666' })
        ],
        spacing: { after: 400 },
      }),
      new Paragraph({
        text: doc.title,
        heading: HeadingLevel.TITLE,
      }),
      new Paragraph({
        text: `Feature: ${doc.feature} | Módulo: ${doc.module || 'N/A'}`,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: `Status: ${doc.status.toUpperCase()} | Tipo: ${doc.testType} | Prioridade: ${doc.priority}`,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: `Testador: ${doc.tester} | Ambiente: ${doc.environment || 'N/A'}`,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: `Data: ${new Date(doc.createdAt).toLocaleString('pt-BR')}`,
        spacing: { after: 400 },
      })
    )

    if (doc.preconditions) {
      children.push(
        new Paragraph({ text: 'Pré-condições', heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ text: doc.preconditions, spacing: { after: 300 } })
      )
    }

    children.push(new Paragraph({ text: 'Passos do Teste', heading: HeadingLevel.HEADING_1 }))
    
    doc.steps.forEach((step, i) => {
      children.push(
        new Paragraph({ text: `Passo ${i + 1}`, heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun({ text: 'Ação: ', bold: true }), new TextRun(step.action)] }),
        new Paragraph({ children: [new TextRun({ text: 'Esperado: ', bold: true }), new TextRun(step.expectedResult)] }),
        new Paragraph({ children: [new TextRun({ text: 'Obtido: ', bold: true }), new TextRun(step.actualResult)] }),
        new Paragraph({ children: [new TextRun({ text: 'Status: ', bold: true }), new TextRun(step.status)], spacing: { after: 200 } })
      )
    })

    if (doc.screenshots && doc.screenshots.length > 0) {
      children.push(new Paragraph({ text: 'Screenshots / Evidências', heading: HeadingLevel.HEADING_1 }))
      
      for (const screenshot of doc.screenshots) {
        try {
          const imageData = await fetchImageAsArrayBuffer(screenshot.url)
          if (imageData) {
            children.push(
              new Paragraph({
                children: [
                  new ImageRun({
                    data: imageData,
                    transformation: { width: 400, height: 300 },
                    type: 'jpg'
                  })
                ],
                spacing: { after: 200 }
              }),
              new Paragraph({ text: screenshot.name, spacing: { after: 300 } })
            )
          }
        } catch (e) {
          children.push(new Paragraph({ text: `[Imagem: ${screenshot.name}] - ${screenshot.url}`, spacing: { after: 200 } }))
        }
      }
    }

    if (doc.observations) {
      children.push(
        new Paragraph({ text: 'Observações', heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ text: doc.observations })
      )
    }

    const docx = new Document({
      sections: [{ children }]
    })

    const blob = await Packer.toBlob(docx)
    saveAs(blob, `teste-${doc.title.replace(/\s+/g, '-').toLowerCase()}.docx`)
    setExportMenuOpen(null)
  }

  const exportAsPdf = async (doc) => {
    const pdf = new jsPDF()
    let y = 20
    const lineHeight = 7
    const pageHeight = pdf.internal.pageSize.height
    const margin = 20

    // Cabeçalho com logo e nome
    try {
      const logoData = await fetchImageAsBase64('/DocSimplesReports/logo.jpg')
      if (logoData) {
        pdf.addImage(logoData, 'JPEG', margin, y, 15, 15)
      }
    } catch (e) {
      console.log('Logo não encontrado para PDF')
    }
    
    // Nome do sistema
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(37, 99, 235) // Azul primário
    pdf.text('DocSimples Reports', margin + 20, y + 8)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(100, 100, 100)
    pdf.text('Sistema de Documentação de Testes', margin + 20, y + 14)
    
    // Linha separadora
    y += 22
    pdf.setDrawColor(200, 200, 200)
    pdf.line(margin, y, 190, y)
    y += 10
    
    // Resetar cor do texto
    pdf.setTextColor(0, 0, 0)

    const addText = (text, isBold = false, fontSize = 12) => {
      if (y > pageHeight - 20) {
        pdf.addPage()
        y = 20
      }
      pdf.setFontSize(fontSize)
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal')
      const lines = pdf.splitTextToSize(text, 170)
      lines.forEach(line => {
        if (y > pageHeight - 20) {
          pdf.addPage()
          y = 20
        }
        pdf.text(line, margin, y)
        y += lineHeight
      })
    }

    addText(doc.title, true, 18)
    y += 5
    addText(`Feature: ${doc.feature} | Módulo: ${doc.module || 'N/A'}`)
    addText(`Status: ${doc.status.toUpperCase()} | Tipo: ${doc.testType} | Prioridade: ${doc.priority}`)
    addText(`Testador: ${doc.tester} | Ambiente: ${doc.environment || 'N/A'}`)
    addText(`Data: ${new Date(doc.createdAt).toLocaleString('pt-BR')}`)
    y += 10

    if (doc.preconditions) {
      addText('Pré-condições', true, 14)
      addText(doc.preconditions)
      y += 5
    }

    addText('Passos do Teste', true, 14)
    doc.steps.forEach((step, i) => {
      y += 3
      addText(`Passo ${i + 1}`, true)
      addText(`Ação: ${step.action}`)
      addText(`Esperado: ${step.expectedResult}`)
      addText(`Obtido: ${step.actualResult}`)
      addText(`Status: ${step.status}`)
    })

    if (doc.screenshots && doc.screenshots.length > 0) {
      y += 10
      addText('Screenshots / Evidências', true, 14)
      y += 5
      
      for (const screenshot of doc.screenshots) {
        try {
          const imgData = await fetchImageAsBase64(screenshot.url)
          if (imgData) {
            if (y > pageHeight - 80) {
              pdf.addPage()
              y = 20
            }
            pdf.addImage(imgData, 'JPEG', margin, y, 80, 60)
            y += 65
            addText(screenshot.name)
            y += 5
          }
        } catch (e) {
          addText(`[Imagem: ${screenshot.name}]`)
        }
      }
    }

    if (doc.observations) {
      y += 5
      addText('Observações', true, 14)
      addText(doc.observations)
    }

    pdf.save(`teste-${doc.title.replace(/\s+/g, '-').toLowerCase()}.pdf`)
    setExportMenuOpen(null)
  }

  const generateDocumentText = (doc) => {
    let text = `DOCUMENTO DE TESTE DE HOMOLOGAÇÃO\n`
    text += `${'='.repeat(50)}\n\n`
    text += `Título: ${doc.title}\n`
    text += `Feature: ${doc.feature}\n`
    text += `Módulo: ${doc.module || 'N/A'}\n`
    text += `Tipo: ${doc.testType}\n`
    text += `Prioridade: ${doc.priority}\n`
    text += `Status: ${doc.status.toUpperCase()}\n`
    text += `Testador: ${doc.tester}\n`
    text += `Ambiente: ${doc.environment || 'N/A'}\n`
    text += `Data: ${new Date(doc.createdAt).toLocaleString('pt-BR')}\n\n`
    
    if (doc.preconditions) {
      text += `PRÉ-CONDIÇÕES:\n${'-'.repeat(30)}\n${doc.preconditions}\n\n`
    }
    
    text += `PASSOS DO TESTE:\n${'-'.repeat(30)}\n`
    doc.steps.forEach((step, i) => {
      text += `\nPasso ${i + 1}:\n`
      text += `  Ação: ${step.action}\n`
      text += `  Esperado: ${step.expectedResult}\n`
      text += `  Obtido: ${step.actualResult}\n`
      text += `  Status: ${step.status}\n`
    })
    
    if (doc.elements && doc.elements.length > 0 && doc.elements[0].name) {
      text += `\nELEMENTOS DA INTERFACE:\n${'-'.repeat(30)}\n`
      doc.elements.forEach(el => {
        if (el.name) {
          text += `  - ${el.name}: ${el.selector} (${el.type})\n`
        }
      })
    }
    
    if (doc.observations) {
      text += `\nOBSERVAÇÕES:\n${'-'.repeat(30)}\n${doc.observations}\n`
    }
    
    if (doc.evidences) {
      text += `\nEVIDÊNCIAS:\n${'-'.repeat(30)}\n${doc.evidences}\n`
    }
    
    return text
  }

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'aprovado':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'reprovado':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'em_reteste':
        return <RefreshCw className="w-5 h-5 text-orange-500" />
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentos de Teste</h1>
          <p className="text-gray-600 mt-1">{documents.length} documento(s) registrado(s)</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
              placeholder="Buscar por título ou feature..."
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field w-40"
            >
              <option value="all">Todos Status</option>
              <option value="pendente">Pendente</option>
              <option value="aprovado">Aprovado</option>
              <option value="reprovado">Reprovado</option>
              <option value="em_reteste">Em Reteste</option>
              <option value="bloqueado">Bloqueado</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-field w-40"
            >
              <option value="all">Todos Tipos</option>
              <option value="funcional">Funcional</option>
              <option value="exploratorio">Exploratório</option>
              <option value="regressao">Regressão</option>
              <option value="integracao">Integração</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents List */}
      {filteredDocs.length === 0 ? (
        <div className="card text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            {documents.length === 0 ? 'Nenhum documento registrado' : 'Nenhum resultado encontrado'}
          </h3>
          <p className="text-gray-600 mt-1">
            {documents.length === 0 
              ? 'Registre um teste para começar' 
              : 'Tente ajustar os filtros de busca'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <StatusIcon status={doc.status} />
                  <div>
                    <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                    <p className="text-sm text-gray-600">{doc.feature} {doc.module && `• ${doc.module}`}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`badge ${
                        doc.status === 'aprovado' ? 'badge-success' :
                        doc.status === 'reprovado' ? 'badge-error' :
                        doc.status === 'em_reteste' ? 'bg-orange-100 text-orange-700' : 'badge-warning'
                      }`}>
                        {doc.status === 'em_reteste' ? 'Em Reteste' : doc.status}
                      </span>
                      <span className="badge badge-info">{doc.testType}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                    title="Visualizar"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setExportMenuOpen(exportMenuOpen === doc.id ? null : doc.id)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg flex items-center"
                      title="Exportar"
                    >
                      <Download className="w-4 h-4" />
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </button>
                    {exportMenuOpen === doc.id && (
                      <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <button onClick={() => exportAsTxt(doc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.txt</button>
                        <button onClick={() => exportAsMarkdown(doc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.md (Markdown)</button>
                        <button onClick={() => exportAsDocx(doc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.docx (Word)</button>
                        <button onClick={() => exportAsPdf(doc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.pdf</button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => onDelete(doc.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editMode ? 'Editar Documento' : selectedDoc.title}
              </h2>
              <div className="flex items-center gap-2">
                {!editMode && (
                  <button
                    onClick={startEdit}
                    className="p-2 text-gray-500 hover:text-primary-600 rounded-lg hover:bg-gray-100"
                    title="Editar"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => { setSelectedDoc(null); setEditMode(false); setEditData(null); }}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Modo de Edição */}
            {editMode && editData ? (
              <div className="p-6 space-y-6">
                {/* Informações Básicas */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => handleEditChange('title', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feature</label>
                    <input
                      type="text"
                      value={editData.feature}
                      onChange={(e) => handleEditChange('feature', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Módulo</label>
                    <input
                      type="text"
                      value={editData.module}
                      onChange={(e) => handleEditChange('module', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Testador</label>
                    <input
                      type="text"
                      value={editData.tester}
                      onChange={(e) => handleEditChange('tester', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Teste</label>
                    <select
                      value={editData.testType}
                      onChange={(e) => handleEditChange('testType', e.target.value)}
                      className="input-field"
                    >
                      <option value="funcional">Funcional</option>
                      <option value="exploratorio">Exploratório</option>
                      <option value="regressao">Regressão</option>
                      <option value="integracao">Integração</option>
                      <option value="usabilidade">Usabilidade</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
                    <select
                      value={editData.priority}
                      onChange={(e) => handleEditChange('priority', e.target.value)}
                      className="input-field"
                    >
                      <option value="baixa">Baixa</option>
                      <option value="media">Média</option>
                      <option value="alta">Alta</option>
                      <option value="critica">Crítica</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={editData.status}
                      onChange={(e) => handleEditChange('status', e.target.value)}
                      className="input-field"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="aprovado">Aprovado</option>
                      <option value="reprovado">Reprovado</option>
                      <option value="em_reteste">Em Reteste</option>
                      <option value="bloqueado">Bloqueado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ambiente</label>
                    <input
                      type="text"
                      value={editData.environment}
                      onChange={(e) => handleEditChange('environment', e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Pré-condições */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pré-condições</label>
                  <textarea
                    value={editData.preconditions}
                    onChange={(e) => handleEditChange('preconditions', e.target.value)}
                    className="textarea-field"
                    rows="2"
                  />
                </div>

                {/* Passos do Teste */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">Passos do Teste</label>
                    <button
                      type="button"
                      onClick={addStep}
                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Adicionar Passo
                    </button>
                  </div>
                  <div className="space-y-3">
                    {editData.steps.map((step, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Passo {index + 1}</span>
                          {editData.steps.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeStep(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <input
                            type="text"
                            value={step.action}
                            onChange={(e) => handleStepChange(index, 'action', e.target.value)}
                            className="input-field text-sm"
                            placeholder="Ação"
                          />
                          <input
                            type="text"
                            value={step.expectedResult}
                            onChange={(e) => handleStepChange(index, 'expectedResult', e.target.value)}
                            className="input-field text-sm"
                            placeholder="Resultado Esperado"
                          />
                          <input
                            type="text"
                            value={step.actualResult}
                            onChange={(e) => handleStepChange(index, 'actualResult', e.target.value)}
                            className="input-field text-sm"
                            placeholder="Resultado Obtido"
                          />
                          <select
                            value={step.status}
                            onChange={(e) => handleStepChange(index, 'status', e.target.value)}
                            className="input-field text-sm"
                          >
                            <option value="pendente">Pendente</option>
                            <option value="passou">Passou</option>
                            <option value="falhou">Falhou</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                  <textarea
                    value={editData.observations}
                    onChange={(e) => handleEditChange('observations', e.target.value)}
                    className="textarea-field"
                    rows="3"
                  />
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={cancelEdit}
                    className="btn-secondary"
                    disabled={saving}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveEdit}
                    className="btn-primary flex items-center gap-2"
                    disabled={saving}
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </div>
            ) : (
            <div className="p-6 space-y-6">
              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Feature</p>
                  <p className="font-medium">{selectedDoc.feature}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Módulo</p>
                  <p className="font-medium">{selectedDoc.module || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tipo</p>
                  <p className="font-medium capitalize">{selectedDoc.testType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`badge ${
                    selectedDoc.status === 'aprovado' ? 'badge-success' :
                    selectedDoc.status === 'reprovado' ? 'badge-error' :
                    selectedDoc.status === 'em_reteste' ? 'bg-orange-100 text-orange-700' : 'badge-warning'
                  }`}>
                    {selectedDoc.status === 'em_reteste' ? 'Em Reteste' : selectedDoc.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Testador</p>
                  <p className="font-medium">{selectedDoc.tester}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ambiente</p>
                  <p className="font-medium">{selectedDoc.environment || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Prioridade</p>
                  <p className="font-medium capitalize">{selectedDoc.priority}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Data</p>
                  <p className="font-medium">{new Date(selectedDoc.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              {/* Preconditions */}
              {selectedDoc.preconditions && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Pré-condições</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDoc.preconditions}</p>
                </div>
              )}

              {/* Steps */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Passos do Teste</h3>
                <div className="space-y-3">
                  {selectedDoc.steps.map((step, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Passo {i + 1}</span>
                        <span className={`badge ${
                          step.status === 'passou' ? 'badge-success' :
                          step.status === 'falhou' ? 'badge-error' : 'badge-warning'
                        }`}>
                          {step.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p><strong>Ação:</strong> {step.action}</p>
                        <p><strong>Esperado:</strong> {step.expectedResult}</p>
                        <p><strong>Obtido:</strong> {step.actualResult}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Elements */}
              {selectedDoc.elements && selectedDoc.elements.some(el => el.name) && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Elementos da Interface</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500">
                          <th className="pb-2">Nome</th>
                          <th className="pb-2">Selector</th>
                          <th className="pb-2">Tipo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDoc.elements.filter(el => el.name).map((el, i) => (
                          <tr key={i}>
                            <td className="py-1">{el.name}</td>
                            <td className="py-1 font-mono text-xs">{el.selector}</td>
                            <td className="py-1">{el.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Screenshots */}
              {selectedDoc.screenshots && selectedDoc.screenshots.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Screenshots / Prints</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedDoc.screenshots.map((screenshot, i) => (
                      <a
                        key={i}
                        href={screenshot.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={screenshot.url}
                          alt={screenshot.name}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-1 truncate">{screenshot.name}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Observations */}
              {selectedDoc.observations && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Observações</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDoc.observations}</p>
                </div>
              )}

              {/* Seção de Interação - Comentários e Reteste */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary-600" />
                  Interação / Feedback
                </h3>
                
                {/* Lista de comentários existentes */}
                {selectedDoc.comments && selectedDoc.comments.length > 0 && (
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {selectedDoc.comments.map((comment, idx) => (
                      <div key={comment.id || idx} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getCommentTypeColor(comment.type)}`}>
                              {getCommentTypeLabel(comment.type)}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {comment.createdAt ? new Date(comment.createdAt).toLocaleString('pt-BR') : ''}
                          </span>
                        </div>
                        {comment.text && (
                          <p className="text-sm text-gray-700">{comment.text}</p>
                        )}
                        {/* Screenshots do comentário */}
                        {comment.screenshots && comment.screenshots.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {comment.screenshots.map((screenshot, sIdx) => (
                              <a
                                key={sIdx}
                                href={screenshot.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                <img
                                  src={screenshot.url}
                                  alt={screenshot.name}
                                  className="h-20 w-auto object-cover rounded border border-gray-200 hover:border-primary-500"
                                />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Área para novo comentário */}
                <div className="space-y-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escreva uma resposta ou descrição da correção realizada..."
                    className="textarea-field"
                    rows="3"
                  />
                  
                  {/* Upload de Screenshots */}
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      id="comment-screenshot"
                      multiple
                      accept="image/*"
                      onChange={handleCommentScreenshot}
                      className="hidden"
                      disabled={uploadingScreenshot}
                    />
                    <label
                      htmlFor="comment-screenshot"
                      className="flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      {uploadingScreenshot ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Image className="w-4 h-4" />
                      )}
                      <span>{uploadingScreenshot ? 'Enviando...' : 'Anexar Screenshot'}</span>
                    </label>
                    {commentScreenshots.length > 0 && (
                      <span className="text-xs text-gray-500">{commentScreenshots.length} imagem(ns)</span>
                    )}
                  </div>
                  
                  {/* Preview das screenshots anexadas */}
                  {commentScreenshots.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {commentScreenshots.map((screenshot, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={screenshot.url}
                            alt={screenshot.name}
                            className="h-16 w-auto object-cover rounded border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeCommentScreenshot(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Botões de ação */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleSendComment('resposta')}
                      disabled={sendingComment || (!newComment.trim() && commentScreenshots.length === 0)}
                      className="btn-secondary flex items-center gap-2 text-sm disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      Enviar Resposta
                    </button>
                    
                    <button
                      onClick={() => handleSendComment('solicitar_reteste')}
                      disabled={sendingComment}
                      className="flex items-center gap-2 text-sm px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Solicitar Reteste
                    </button>
                    
                    {selectedDoc.status === 'em_reteste' && (
                      <button
                        onClick={() => handleSendComment('aprovado_reteste')}
                        disabled={sendingComment}
                        className="flex items-center gap-2 text-sm px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Aprovar após Reteste
                      </button>
                    )}
                  </div>
                  
                  {sendingComment && (
                    <p className="text-sm text-gray-500">Enviando...</p>
                  )}
                </div>
              </div>
            </div>
            )}
            {!editMode && (
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end space-x-2">
              <div className="relative">
                <button
                  onClick={() => setExportMenuOpen(exportMenuOpen === 'modal' ? null : 'modal')}
                  className="btn-secondary flex items-center space-x-1"
                >
                  <Download className="w-4 h-4" />
                  <span>Exportar</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {exportMenuOpen === 'modal' && (
                  <div className="absolute bottom-full right-0 mb-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button onClick={() => exportAsTxt(selectedDoc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.txt</button>
                    <button onClick={() => exportAsMarkdown(selectedDoc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.md (Markdown)</button>
                    <button onClick={() => exportAsDocx(selectedDoc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.docx (Word)</button>
                    <button onClick={() => exportAsPdf(selectedDoc)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">.pdf</button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="btn-primary"
              >
                Fechar
              </button>
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
