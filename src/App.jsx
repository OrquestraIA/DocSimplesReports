import { useState, useEffect, useCallback, useRef } from 'react'
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { FileText, FlaskConical, Code, Table2, Home, Menu, X, Loader2, LogOut, HelpCircle, BarChart3, FileSpreadsheet, ClipboardList, Calendar, CheckSquare, Moon, Sun, ChevronDown } from 'lucide-react'
import HomePage from './pages/HomePage'
import TestRegistrationPage from './pages/TestRegistrationPage'
import DocumentViewerPage from './pages/DocumentViewerPage'
import GherkinGeneratorPage from './pages/GherkinGeneratorPage'
import PartitionTablePage from './pages/PartitionTablePage'
import LoginPage from './pages/LoginPage'
import TutorialPage from './pages/TutorialPage'
import ReportsPage from './pages/ReportsPage'
import RequirementsPage from './pages/RequirementsPage'
import TestCasesPage from './pages/TestCasesPage'
import TestExecutionPage from './pages/TestExecutionPage'
import SprintsPage from './pages/SprintsPage'
import MyTasksPage from './pages/MyTasksPage'
import WhatsNewModal from './components/WhatsNewModal'
import NotificationsPanel from './components/NotificationsPanel'
import Footer from './components/Footer'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { APP_VERSION } from './version'
import { sendTaskAssignmentEmail } from './emailService'
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
  updateImportedRequirement,
  createTestCase,
  updateTestCase,
  deleteTestCase,
  subscribeToTestCases,
  createTestExecution,
  updateTestExecution,
  finishTestExecution,
  subscribeToAllTestExecutions,
  uploadTestEvidence,
  createSprint,
  updateSprint,
  deleteSprint,
  subscribeToSprints,
  createTask,
  updateTask,
  deleteTask,
  subscribeToTasks,
  createTaskFromFailedTest,
  createTaskFromFailedExecution
} from './firebase'

function Navigation({ user, onLogout, notifications = [], tasks = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const location = useLocation()
  const { darkMode, toggleDarkMode } = useTheme()

  // Contar tarefas atribuídas ao usuário atual (pendentes e em andamento)
  const userId = user?.id || user?.uid
  const myTasksCount = tasks.filter(t => 
    t.assignee === userId && 
    (t.status === 'pending' || t.status === 'in_progress')
  ).length

  // Itens principais (sempre visíveis)
  const mainNavItems = [
    { path: '/', label: 'Início', icon: Home, tooltip: 'Página Inicial' },
    { path: '/registro', label: 'Registro', icon: FlaskConical, tooltip: 'Registrar Novo Teste' },
    { path: '/documentos', label: 'Docs', icon: FileText, tooltip: 'Documentos de Teste' },
    { path: '/casos-de-teste', label: 'Casos', icon: ClipboardList, tooltip: 'Casos de Teste' },
    { path: '/minhas-tarefas', label: 'Tarefas', icon: CheckSquare, badge: myTasksCount, tooltip: 'Minhas Tarefas' },
    { path: '/sprints', label: 'Sprints', icon: Calendar, tooltip: 'Gestão de Sprints' },
  ]

  // Itens secundários (dropdown "Mais")
  const moreNavItems = [
    { path: '/requisitos', label: 'Requisitos', icon: FileSpreadsheet, tooltip: 'Gerenciar Requisitos' },
    { path: '/gherkin', label: 'Gerar Gherkin', icon: Code, tooltip: 'Gerar Código Gherkin' },
    { path: '/particao', label: 'Tabela Partição', icon: Table2, tooltip: 'Tabela de Partição' },
    { path: '/relatorios', label: 'Relatórios', icon: BarChart3, tooltip: 'Relatórios e Métricas' },
    { path: '/ajuda', label: 'Ajuda', icon: HelpCircle, tooltip: 'Central de Ajuda' },
  ]

  // Todos os itens para mobile
  const allNavItems = [...mainNavItems, ...moreNavItems]

  return (
    <nav className="bg-white dark:bg-slate-800/95 shadow-sm dark:shadow-slate-900/50 border-b border-gray-200 dark:border-slate-700/50 transition-colors backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/DocSimplesReports/logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900 dark:text-white whitespace-nowrap leading-tight">TestWise</span>
                <span className="text-xs text-gray-400">v{APP_VERSION}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={item.tooltip}
                  className={`group relative flex items-center space-x-1 px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                  {/* Tooltip customizado */}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.tooltip}
                  </span>
                </Link>
              )
            })}
            
            {/* Dropdown "Mais" */}
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  moreNavItems.some(i => location.pathname === i.path)
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white'
                }`}
              >
                <span>Mais</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMoreMenu ? 'rotate-180' : ''}`} />
              </button>
              {showMoreMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-600 py-2 z-50 min-w-[200px] backdrop-blur-sm">
                  {moreNavItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setShowMoreMenu(false)}
                        className={`flex items-center space-x-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                            : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white'
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
          </div>

          {/* User info, notifications, theme toggle and logout */}
          <div className="hidden lg:flex items-center space-x-2">
            <NotificationsPanel notifications={notifications} key={`notif-${notifications.length}`} />
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center space-x-2 pl-2 border-l dark:border-gray-700">
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[120px]">{user?.email?.split('@')[0]}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  getUserRole(user?.email) === 'desenvolvedor' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                    : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                }`}>
                  {getUserRole(user?.email) === 'desenvolvedor' ? 'Dev' : 'Op'}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
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
          <div className="lg:hidden pb-4">
            {allNavItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</span>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full"
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

// Configurações de expiração de sessão
const SESSION_TIMEOUT_INACTIVITY = 8 * 60 * 60 * 1000 // 8 horas de inatividade
const SESSION_TIMEOUT_ABSOLUTE = 24 * 60 * 60 * 1000 // 24 horas desde o login
const SESSION_CHECK_INTERVAL = 60 * 1000 // Verificar a cada 1 minuto

function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [testDocuments, setTestDocuments] = useState([])
  const [requirements, setRequirements] = useState([])
  const [importedRequirements, setImportedRequirements] = useState([])
  const [testCases, setTestCases] = useState([])
  const [testExecutions, setTestExecutions] = useState([])
  const [currentExecution, setCurrentExecution] = useState(null)
  const [sprints, setSprints] = useState([])
  const [tasks, setTasks] = useState([])
  const [notifications, setNotifications] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Refs para controle de sessão
  const lastActivityRef = useRef(Date.now())
  const loginTimeRef = useRef(null)
  const sessionCheckIntervalRef = useRef(null)

  // Atualizar última atividade
  const updateLastActivity = useCallback(() => {
    lastActivityRef.current = Date.now()
    localStorage.setItem('lastActivity', lastActivityRef.current.toString())
  }, [])

  // Verificar expiração de sessão
  const checkSessionExpiration = useCallback(async () => {
    if (!user) return
    
    const now = Date.now()
    const lastActivity = parseInt(localStorage.getItem('lastActivity') || now.toString())
    const loginTime = parseInt(localStorage.getItem('loginTime') || now.toString())
    
    const inactivityExpired = (now - lastActivity) > SESSION_TIMEOUT_INACTIVITY
    const absoluteExpired = (now - loginTime) > SESSION_TIMEOUT_ABSOLUTE
    
    if (inactivityExpired || absoluteExpired) {
      const reason = inactivityExpired ? 'inatividade' : 'tempo máximo de sessão'
      console.log(`[Session] Sessão expirada por ${reason}`)
      
      // Limpar dados de sessão
      localStorage.removeItem('lastActivity')
      localStorage.removeItem('loginTime')
      
      // Fazer logout
      await logout()
      alert(`Sua sessão expirou por ${reason}. Por favor, faça login novamente.`)
    }
  }, [user])

  // Configurar listeners de atividade do usuário
  useEffect(() => {
    if (!user) return

    // Eventos que indicam atividade do usuário
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click']
    
    activityEvents.forEach(event => {
      window.addEventListener(event, updateLastActivity, { passive: true })
    })

    // Verificar expiração periodicamente
    sessionCheckIntervalRef.current = setInterval(checkSessionExpiration, SESSION_CHECK_INTERVAL)

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, updateLastActivity)
      })
      if (sessionCheckIntervalRef.current) {
        clearInterval(sessionCheckIntervalRef.current)
      }
    }
  }, [user, updateLastActivity, checkSessionExpiration])

  useEffect(() => {
    const unsubscribeAuth = onAuthChange(async (currentUser) => {
      setUser(currentUser)
      // Sincronizar usuário com Firestore no login
      if (currentUser) {
        await syncUserToFirestore(currentUser)
        // Registrar tempo de login se for novo login
        if (!localStorage.getItem('loginTime')) {
          const now = Date.now()
          localStorage.setItem('loginTime', now.toString())
          localStorage.setItem('lastActivity', now.toString())
          loginTimeRef.current = now
        }
      } else {
        // Limpar dados de sessão no logout
        localStorage.removeItem('lastActivity')
        localStorage.removeItem('loginTime')
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

      // Casos de Teste
      const unsubscribeTestCases = subscribeToTestCases((cases) => {
        setTestCases(cases)
      }, (err) => {
        console.error('[App] Erro Firebase testCases:', err)
      })

      // Execuções de Teste
      const unsubscribeExecutions = subscribeToAllTestExecutions((execs) => {
        setTestExecutions(execs)
      }, (err) => {
        console.error('[App] Erro Firebase testExecutions:', err)
      })

      // Sprints
      const unsubscribeSprints = subscribeToSprints((sprintsList) => {
        setSprints(sprintsList)
      }, (err) => {
        console.error('[App] Erro Firebase sprints:', err)
      })

      // Tarefas
      const unsubscribeTasks = subscribeToTasks((tasksList) => {
        setTasks(tasksList)
      }, (err) => {
        console.error('[App] Erro Firebase tasks:', err)
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
      const docId = await addTestDocumentDB(doc)
      
      // Notificar todos os desenvolvedores sobre novo documento de teste
      await addNotification({
        testId: docId || null,
        testTitle: doc.title,
        type: 'novo_documento',
        message: `Novo teste registrado: "${doc.title}"`,
        author: doc.tester || 'Operação',
        authorEmail: user?.email || null,
        targetRole: 'desenvolvedor'
      })

      // Criar tarefa automaticamente se o teste for reprovado ou pendente
      if (doc.status === 'reprovado' || doc.status === 'pendente') {
        const taskType = doc.category === 'regra_negocio' ? 'business_rule' :
                         doc.category === 'melhoria' ? 'improvement' : 'bug'
        
        await createTaskFromFailedTest({
          id: docId,
          funcionalidade: doc.feature || doc.title,
          cenario: doc.module,
          resultado: doc.status,
          observacoes: doc.observations,
          responsavel: doc.tester
        }, taskType)
      }
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
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
        <Navigation user={user} onLogout={handleLogout} notifications={notifications} tasks={tasks} key={notifications.length} />
        <WhatsNewModal />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
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
            <Route 
              path="/casos-de-teste" 
              element={
                <TestCasesPage 
                  testCases={testCases}
                  executions={testExecutions}
                  onCreateTestCase={createTestCase}
                  onUpdateTestCase={updateTestCase}
                  onDeleteTestCase={deleteTestCase}
                  onStartExecution={async (testCase) => {
                    // Verificar se já existe uma execução em andamento para este caso de teste
                    const existingExecution = testExecutions.find(
                      e => e.testCaseId === testCase.id && !e.finishedAt
                    )
                    
                    if (existingExecution) {
                      // Continuar execução existente
                      setCurrentExecution({ id: existingExecution.id, testCaseId: testCase.id })
                      window.location.hash = `/execucao/${existingExecution.id}`
                    } else {
                      // Criar nova execução
                      const executionId = await createTestExecution({
                        testCaseId: testCase.id,
                        testCaseTitle: testCase.title,
                        executedBy: user?.email,
                        steps: testCase.steps.map(s => ({
                          ...s,
                          status: 'pending',
                          actualResult: '',
                          evidences: []
                        }))
                      })
                      setCurrentExecution({ id: executionId, testCaseId: testCase.id })
                      window.location.hash = `/execucao/${executionId}`
                    }
                  }}
                  currentUser={user}
                />
              } 
            />
            <Route 
              path="/execucao/:executionId" 
              element={
                <TestExecutionPage 
                  execution={testExecutions.find(e => e.id === window.location.hash.split('/execucao/')[1])}
                  testCase={testCases.find(tc => tc.id === testExecutions.find(e => e.id === window.location.hash.split('/execucao/')[1])?.testCaseId)}
                  onUpdateExecution={updateTestExecution}
                  onFinishExecution={async (executionId, data) => {
                    await finishTestExecution(executionId, data)
                    
                    // Se o teste foi reprovado, criar tarefa automaticamente
                    if (data.status === 'failed') {
                      const execution = testExecutions.find(e => e.id === executionId)
                      const testCase = testCases.find(tc => tc.id === execution?.testCaseId)
                      if (execution && testCase) {
                        await createTaskFromFailedExecution(
                          { ...execution, ...data, id: executionId },
                          testCase,
                          'bug'
                        )
                      }
                    }
                  }}
                  onUploadEvidence={uploadTestEvidence}
                  currentUser={user}
                />
              } 
            />
            <Route 
              path="/minhas-tarefas" 
              element={
                <MyTasksPage 
                  tasks={tasks}
                  sprints={sprints}
                  users={users}
                  currentUser={user}
                  onUpdateTask={updateTask}
                  onAddNotification={addNotification}
                  onUpdateDocumentStatus={async (docId, status) => {
                    await updateTestDocumentDB(docId, { status })
                  }}
                />
              } 
            />
            <Route 
              path="/sprints" 
              element={
                <SprintsPage 
                  sprints={sprints}
                  tasks={tasks}
                  users={users}
                  testDocuments={testDocuments}
                  onCreateSprint={createSprint}
                  onUpdateSprint={updateSprint}
                  onDeleteSprint={deleteSprint}
                  onCreateTask={createTask}
                  onUpdateTask={async (taskId, data) => {
                    const currentTask = tasks.find(t => t.id === taskId)
                    const isNewAssignment = data.assignee && data.assignee !== currentTask?.assignee
                    
                    await updateTask(taskId, data)
                    
                    if (isNewAssignment) {
                      const assignee = users.find(u => u.id === data.assignee)
                      if (assignee?.email) {
                        const updatedTask = { ...currentTask, ...data, id: taskId }
                        sendTaskAssignmentEmail(updatedTask, assignee, user?.name || user?.email)
                          .catch(err => console.error('Erro ao enviar email:', err))
                      }
                    }
                  }}
                  onDeleteTask={deleteTask}
                  onImportFromTestDocument={async (doc, taskType, assigneeId) => {
                    const taskId = await createTaskFromFailedTest(doc, taskType, assigneeId)
                    
                    if (assigneeId) {
                      const assignee = users.find(u => u.id === assigneeId)
                      if (assignee?.email) {
                        const task = tasks.find(t => t.id === taskId) || { 
                          title: `[${taskType === 'bug' ? 'Bug' : taskType === 'business_rule' ? 'RN' : 'Melhoria'}] ${doc.title || doc.feature}`,
                          type: taskType,
                          priority: doc.priority === 'alta' ? 'high' : 'medium'
                        }
                        sendTaskAssignmentEmail(task, assignee, user?.name || user?.email)
                          .catch(err => console.error('Erro ao enviar email:', err))
                      }
                    }
                  }}
                  onRequestRetest={async (task) => {
                    // Atualizar o documento de teste original para "Em Reteste"
                    if (task.sourceId && task.sourceType === 'test_document') {
                      // Sincronizar comentários e evidências do Dev com o documento de teste
                      const updateData = { 
                        status: 'em-reteste',
                        retestRequestedAt: new Date().toISOString(),
                        retestRequestedBy: user?.email || user?.name || 'Dev'
                      }
                      
                      // Se houver comentários do Dev, adicionar ao documento
                      if (task.comments?.length > 0) {
                        const testDoc = testDocuments.find(d => d.id === task.sourceId)
                        const existingComments = testDoc?.comments || []
                        updateData.comments = [...existingComments, ...task.comments.map(c => ({
                          ...c,
                          fromTask: true
                        }))]
                      }
                      
                      // Se houver evidências do Dev, adicionar ao documento
                      if (task.devEvidences?.length > 0) {
                        const testDoc = testDocuments.find(d => d.id === task.sourceId)
                        const existingScreenshots = testDoc?.screenshots || []
                        updateData.screenshots = [...existingScreenshots, ...task.devEvidences.map(e => ({
                          ...e,
                          fromDev: true
                        }))]
                      }
                      
                      await updateTestDocumentDB(task.sourceId, updateData)
                      
                      // Atualizar status da tarefa para "Em Revisão"
                      await updateTask(task.id, { 
                        status: 'in_review',
                        retestRequestedAt: new Date().toISOString()
                      })
                      
                      // Notificar o testador original
                      const testDoc = testDocuments.find(d => d.id === task.sourceId)
                      if (testDoc?.tester) {
                        const testerUser = users.find(u => u.email === testDoc.tester || u.name === testDoc.tester)
                        if (testerUser) {
                          await addNotification({
                            userId: testerUser.id,
                            type: 'retest_requested',
                            title: 'Reteste Solicitado',
                            message: `O desenvolvedor solicitou reteste para: ${task.title}`,
                            link: `/documentos?id=${task.sourceId}`,
                            read: false
                          })
                        }
                      }
                    }
                  }}
                  onAddTaskComment={async (taskId, comment) => {
                    const task = tasks.find(t => t.id === taskId)
                    const existingComments = task?.comments || []
                    await updateTask(taskId, { 
                      comments: [...existingComments, comment]
                    })
                  }}
                  onUploadTaskEvidence={async (taskId, file) => {
                    // Upload do arquivo para o Firebase Storage
                    const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage')
                    const { storage } = await import('./firebase')
                    
                    const fileName = `${Date.now()}_${file.name}`
                    const storageRef = ref(storage, `task-evidences/${taskId}/${fileName}`)
                    await uploadBytes(storageRef, file)
                    const url = await getDownloadURL(storageRef)
                    
                    const task = tasks.find(t => t.id === taskId)
                    const existingEvidences = task?.devEvidences || []
                    await updateTask(taskId, { 
                      devEvidences: [...existingEvidences, {
                        url,
                        name: file.name,
                        type: file.type.startsWith('video') ? 'video' : 'image',
                        uploadedAt: new Date().toISOString(),
                        uploadedBy: user?.email || user?.name || 'Dev'
                      }]
                    })
                  }}
                  onAddNotification={addNotification}
                  onUpdateDocumentStatus={async (docId, status) => {
                    await updateTestDocumentDB(docId, { status })
                  }}
                  currentUser={user}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

// Wrapper com ThemeProvider
function AppWithTheme() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

export default AppWithTheme
