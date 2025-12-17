import { useState } from 'react'
import { FileText, Trash2, Eye, Download, Search, Filter, CheckCircle2, XCircle, Clock } from 'lucide-react'

export default function DocumentViewerPage({ documents, onUpdate, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [selectedDoc, setSelectedDoc] = useState(null)

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.feature.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
    const matchesType = filterType === 'all' || doc.testType === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const exportDocument = (doc) => {
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
                  <button
                    onClick={() => exportDocument(doc)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg"
                    title="Exportar"
                  >
                    <Download className="w-4 h-4" />
                  </button>
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

              {/* Observations */}
              {selectedDoc.observations && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Observações</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDoc.observations}</p>
                </div>
              )}

              {/* Evidences */}
              {selectedDoc.evidences && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Evidências</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDoc.evidences}</p>
                </div>
              )}
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end space-x-2">
              <button
                onClick={() => exportDocument(selectedDoc)}
                className="btn-secondary flex items-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </button>
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
