import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { FileText, FlaskConical, Code, Table2, Home, Menu, X, Loader2 } from 'lucide-react'
import HomePage from './pages/HomePage'
import TestRegistrationPage from './pages/TestRegistrationPage'
import DocumentViewerPage from './pages/DocumentViewerPage'
import GherkinGeneratorPage from './pages/GherkinGeneratorPage'
import PartitionTablePage from './pages/PartitionTablePage'
import {
  addTestDocument as addTestDocumentDB,
  updateTestDocument as updateTestDocumentDB,
  deleteTestDocument as deleteTestDocumentDB,
  subscribeToTestDocuments,
  addRequirement as addRequirementDB,
  updateRequirement as updateRequirementDB,
  deleteRequirement as deleteRequirementDB,
  subscribeToRequirements
} from './firebase'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/registro', label: 'Registrar Teste', icon: FlaskConical },
    { path: '/documentos', label: 'Documentos', icon: FileText },
    { path: '/gherkin', label: 'Gerar Gherkin', icon: Code },
    { path: '/particao', label: 'Tabela Partição', icon: Table2 },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">DocSimples</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}

function App() {
  const [testDocuments, setTestDocuments] = useState([])
  const [requirements, setRequirements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let unsubscribeDocs, unsubscribeReqs
    
    try {
      unsubscribeDocs = subscribeToTestDocuments((docs) => {
        setTestDocuments(docs)
        setLoading(false)
      })
      
      unsubscribeReqs = subscribeToRequirements((reqs) => {
        setRequirements(reqs)
      })
    } catch (err) {
      console.error('Erro ao conectar com Firebase:', err)
      setError('Erro ao conectar com o banco de dados. Verifique a configuração do Firebase.')
      setLoading(false)
    }
    
    return () => {
      if (unsubscribeDocs) unsubscribeDocs()
      if (unsubscribeReqs) unsubscribeReqs()
    }
  }, [])

  const addTestDocument = async (doc) => {
    try {
      await addTestDocumentDB(doc)
    } catch (err) {
      console.error('Erro ao adicionar documento:', err)
      alert('Erro ao salvar. Verifique a conexão.')
    }
  }

  const updateTestDocument = async (id, updates) => {
    try {
      await updateTestDocumentDB(id, updates)
    } catch (err) {
      console.error('Erro ao atualizar documento:', err)
    }
  }

  const deleteTestDocument = async (id) => {
    try {
      await deleteTestDocumentDB(id)
    } catch (err) {
      console.error('Erro ao excluir documento:', err)
    }
  }

  const addRequirement = async (req) => {
    try {
      await addRequirementDB(req)
    } catch (err) {
      console.error('Erro ao adicionar requisito:', err)
    }
  }

  const updateRequirement = async (id, updates) => {
    try {
      await updateRequirementDB(id, updates)
    } catch (err) {
      console.error('Erro ao atualizar requisito:', err)
    }
  }

  const deleteRequirement = async (id) => {
    try {
      await deleteRequirementDB(id)
    } catch (err) {
      console.error('Erro ao excluir requisito:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-2" />
          <p className="text-gray-600">Conectando ao banco de dados...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <p className="text-gray-500 text-sm mt-2">Configure as credenciais do Firebase em src/firebase.js</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage testDocuments={testDocuments} requirements={requirements} />} />
            <Route 
              path="/registro" 
              element={<TestRegistrationPage onSave={addTestDocument} />} 
            />
            <Route 
              path="/documentos" 
              element={
                <DocumentViewerPage 
                  documents={testDocuments} 
                  onUpdate={updateTestDocument}
                  onDelete={deleteTestDocument}
                />
              } 
            />
            <Route 
              path="/gherkin" 
              element={<GherkinGeneratorPage documents={testDocuments} />} 
            />
            <Route 
              path="/particao" 
              element={
                <PartitionTablePage 
                  requirements={requirements}
                  onAdd={addRequirement}
                  onUpdate={updateRequirement}
                  onDelete={deleteRequirement}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
