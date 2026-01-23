import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { FileText, FlaskConical, Code, Table2, Home, Menu, X, Loader2, LogOut, HelpCircle, BarChart3, FileSpreadsheet } from 'lucide-react'
import HomePage from './pages/HomePage'
import TestRegistrationPage from './pages/TestRegistrationPage'
import DocumentViewerPage from './pages/DocumentViewerPage'
import GherkinGeneratorPage from './pages/GherkinGeneratorPage'
import PartitionTablePage from './pages/PartitionTablePage'
import LoginPage from './pages/LoginPage'
import TutorialPage from './pages/TutorialPage'
import ReportsPage from './pages/ReportsPage'
import RequirementsPage from './pages/RequirementsPage'
import WhatsNewModal from './components/WhatsNewModal'
import NotificationsPanel from './components/NotificationsPanel'
import { APP_VERSION } from './version'
import {
  addTestDocument as addTestDocumentDB,
  updateTestDocument as updateTestDocumentDB,
  deleteTestDocument as deleteTestDocumentDB,
  subscribeToTestDocuments,
  addRequirement as addRequirementDB,
  updateRequirement as updateRequirementDB,
  deleteRequirement as deleteRequirementDB,
  subscribeToRequirements,
  subscribeToNotifications,
  subscribeToUsers,
  syncUserToFirestore,
  getUserRole,
  onAuthChange,
  logout,
  addNotification,
  importRequirements,
  clearImportedRequirements,
  subscribeToImportedRequirements,
  updateImportedRequirement
} from './firebase'

function Navigation({ user, onLogout, notifications = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/registro', label: 'Registrar Teste', icon: FlaskConical },
    { path: '/documentos', label: 'Documentos', icon: FileText },
    { path: '/requisitos', label: 'Requisitos', icon: FileSpreadsheet },
    { path: '/gherkin', label: 'Gerar Gherkin', icon: Code },
    { path: '/particao', label: 'Tabela Partição', icon: Table2 },
    { path: '/relatorios', label: 'Relatórios', icon: BarChart3 },
    { path: '/ajuda', label: 'Ajuda', icon: HelpCircle },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/DocSimplesReports/logo.jpg" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900 whitespace-nowrap leading-tight">DocSimples Reports</span>
                <span className="text-xs text-gray-400">v{APP_VERSION}</span>
              </div>
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

          {/* User info, notifications and logout */}
          <div className="hidden md:flex items-center space-x-3">
            <NotificationsPanel notifications={notifications} key={`notif-${notifications.length}`} />
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                getUserRole(user?.email) === 'desenvolvedor' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {getUserRole(user?.email) === 'desenvolvedor' ? 'Desenvolvedor' : 'Operação'}
              </span>
            </div>
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
  const [importedRequirements, setImportedRequirements] = useState([])
  const [notifications, setNotifications] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribeAuth = onAuthChange(async (currentUser) => {
      setUser(currentUser)
      // Sincronizar usuário com Firestore no login
      if (currentUser) {
        await syncUserToFirestore(currentUser)
      }
      setAuthLoading(false)
    })
    return () => unsubscribeAuth()
  }, [])

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    let unsubscribeDocs, unsubscribeReqs, unsubscribeNotifs, unsubscribeUsers, unsubscribeImportedReqs
    
    try {
      unsubscribeDocs = subscribeToTestDocuments((docs) => {
        setTestDocuments(docs)
        setLoading(false)
      }, (err) => {
        console.error('[App] Erro Firebase testDocuments:', err)
        setError(`Erro ao carregar documentos: ${err.message}`)
        setLoading(false)
      })
      
      unsubscribeReqs = subscribeToRequirements((reqs) => {
        setRequirements(reqs)
      }, (err) => {
        console.error('[App] Erro Firebase requirements:', err)
      })

      unsubscribeNotifs = subscribeToNotifications((notifs) => {
        setNotifications(notifs)
      }, (err) => {
        console.error('[App] Erro Firebase notifications:', err)
      }, user)

      unsubscribeUsers = subscribeToUsers((usersList) => {
        setUsers(usersList)
      }, (err) => {
        console.error('[App] Erro Firebase users:', err)
      })

      unsubscribeImportedReqs = subscribeToImportedRequirements((reqs) => {
        setImportedRequirements(reqs)
      }, (err) => {
        console.error('[App] Erro Firebase importedRequirements:', err)
      })
    } catch (err) {
      console.error('Erro ao conectar com Firebase:', err)
      setError('Erro ao conectar com o banco de dados. Verifique a configuração do Firebase.')
      setLoading(false)
    }
    
    return () => {
      if (unsubscribeDocs) unsubscribeDocs()
      if (unsubscribeUsers) unsubscribeUsers()
      if (unsubscribeReqs) unsubscribeReqs()
      if (unsubscribeNotifs) unsubscribeNotifs()
      if (unsubscribeImportedReqs) unsubscribeImportedReqs()
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
      
      // Notificar todos os desenvolvedores sobre novo documento de teste
      await addNotification({
        testId: doc.id || null,
        testTitle: doc.title,
        type: 'novo_documento',
        message: `Novo teste registrado: "${doc.title}"`,
        author: doc.tester || 'Operação',
        authorEmail: user?.email || null,
        targetRole: 'desenvolvedor'
      })
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
        <Navigation user={user} onLogout={handleLogout} notifications={notifications} key={notifications.length} />
        <WhatsNewModal />
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
                  users={users}
                  currentUser={user}
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
            <Route path="/ajuda" element={<TutorialPage />} />
            <Route path="/relatorios" element={<ReportsPage testDocuments={testDocuments} />} />
            <Route 
              path="/requisitos" 
              element={
                <RequirementsPage 
                  requirements={importedRequirements}
                  onImport={importRequirements}
                  onClear={clearImportedRequirements}
                  onUpdateRequirement={updateImportedRequirement}
                  testDocuments={testDocuments}
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
