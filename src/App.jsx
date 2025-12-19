import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { FileText, FlaskConical, Code, Table2, Home, Menu, X, Loader2, LogOut } from 'lucide-react'
import HomePage from './pages/HomePage'
import TestRegistrationPage from './pages/TestRegistrationPage'
import DocumentViewerPage from './pages/DocumentViewerPage'
import GherkinGeneratorPage from './pages/GherkinGeneratorPage'
import PartitionTablePage from './pages/PartitionTablePage'
import LoginPage from './pages/LoginPage'
import {
  addTestDocument as addTestDocumentDB,
  updateTestDocument as updateTestDocumentDB,
  deleteTestDocument as deleteTestDocumentDB,
  subscribeToTestDocuments,
  addRequirement as addRequirementDB,
  updateRequirement as updateRequirementDB,
  deleteRequirement as deleteRequirementDB,
  subscribeToRequirements,
  onAuthChange,
  logout
} from './firebase'

function Navigation({ user, onLogout }) {
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
              <img src="/DocSimplesReports/logo.jpg" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
              <span className="font-bold text-xl text-gray-900">DocSimples Reports</span>
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

          {/* User info and logout */}
          <div className="hidden md:flex items-center space-x-3">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
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
            <div className="border-t border-gray-200 mt-2 pt-2">
              <p className="px-3 py-1 text-xs text-gray-500">{user?.email}</p>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [testDocuments, setTestDocuments] = useState([])
  const [requirements, setRequirements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribeAuth = onAuthChange((currentUser) => {
      setUser(currentUser)
      setAuthLoading(false)
    })
    return () => unsubscribeAuth()
  }, [])

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

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
  }, [user])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.error('Erro ao fazer logout:', err)
    }
  }

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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-2" />
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage onLogin={() => {}} />
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
        <Navigation user={user} onLogout={handleLogout} />
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
