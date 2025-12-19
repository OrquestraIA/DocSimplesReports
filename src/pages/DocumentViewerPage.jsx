import { useState } from 'react'
import { FileText, Trash2, Eye, Download, Search, Filter, CheckCircle2, XCircle, Clock, ChevronDown } from 'lucide-react'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun } from 'docx'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'

export default function DocumentViewerPage({ documents, onUpdate, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [exportMenuOpen, setExportMenuOpen] = useState(null)

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
                        doc.status === 'reprovado' ? 'badge-error' : 'badge-warning'
                      }`}>
                        {doc.status}
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
              <h2 className="text-xl font-bold text-gray-900">{selectedDoc.title}</h2>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
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
                    selectedDoc.status === 'reprovado' ? 'badge-error' : 'badge-warning'
                  }`}>
                    {selectedDoc.status}
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
            </div>
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
          </div>
        </div>
      )}
    </div>
  )
}
