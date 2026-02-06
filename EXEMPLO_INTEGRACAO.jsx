// EXEMPLO: Como integrar o botão de testes automatizados no seu sistema

import TestAutomationButton from './components/TestAutomationButton'

// ============================================
// 1. No Header/Navbar - Acesso Global
// ============================================
function Navbar({ githubToken }) {
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <Logo />
        <NavLinks />
      </div>
      
      {/* Botão de testes no navbar */}
      <TestAutomationButton 
        githubToken={githubToken}
        variant="default"
      />
    </nav>
  )
}

// ============================================
// 2. No Modal de Requisitos - Vinculado ao Requisito
// ============================================
function TaskDetailModal({ requirement, githubToken, ...props }) {
  return (
    <div className="modal">
      <div className="modal-header">
        <h2>{requirement.id} - {requirement.descricao}</h2>
      </div>
      
      <div className="modal-body">
        {/* Conteúdo do requisito */}
      </div>
      
      <div className="modal-footer">
        {/* Outros botões */}
        
        {/* Botão de testes vinculado ao requisito */}
        <TestAutomationButton 
          githubToken={githubToken}
          requirement={requirement}
          variant="small"
        />
      </div>
    </div>
  )
}

// ============================================
// 3. No WorkspaceBoard - Ação Rápida
// ============================================
function WorkspaceBoard({ githubToken, ...props }) {
  return (
    <div className="workspace">
      <div className="workspace-header">
        <h1>Espaço de Desenvolvimento</h1>
        
        <div className="actions">
          <button>Nova Tarefa</button>
          
          {/* Botão de testes no workspace */}
          <TestAutomationButton 
            githubToken={githubToken}
            variant="default"
          />
        </div>
      </div>
      
      {/* Conteúdo do workspace */}
    </div>
  )
}

// ============================================
// 4. Página Dedicada de Testes
// ============================================
import TestRunsPanel from './components/TestRunsPanel'

function TestsPage({ githubToken }) {
  const [showPanel, setShowPanel] = useState(true)
  
  return (
    <div className="page">
      <h1>Testes Automatizados</h1>
      
      {showPanel && (
        <TestRunsPanel
          githubToken={githubToken}
          onClose={() => setShowPanel(false)}
        />
      )}
    </div>
  )
}

// ============================================
// 5. No App.jsx - Gerenciar Token
// ============================================
import { useState, useEffect } from 'react'

function App() {
  const [githubToken, setGithubToken] = useState(null)
  
  // Carregar token (escolha uma das opções)
  useEffect(() => {
    // Opção A: De variável de ambiente
    const token = import.meta.env.VITE_GITHUB_TOKEN
    
    // Opção B: Do localStorage
    // const token = localStorage.getItem('githubToken')
    
    // Opção C: Do Firebase/Firestore
    // const token = await loadTokenFromFirebase()
    
    setGithubToken(token)
  }, [])
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home githubToken={githubToken} />} />
        <Route path="/workspaces" element={<WorkspacesPage githubToken={githubToken} />} />
        <Route path="/tests" element={<TestsPage githubToken={githubToken} />} />
      </Routes>
    </Router>
  )
}

// ============================================
// 6. Configuração de Token - Modal de Settings
// ============================================
function SettingsModal({ onSave }) {
  const [token, setToken] = useState('')
  
  const handleSave = () => {
    // Salvar no localStorage
    localStorage.setItem('githubToken', token)
    
    // Ou salvar no Firebase
    // await saveTokenToFirebase(token)
    
    onSave(token)
  }
  
  return (
    <div className="modal">
      <h2>Configurações</h2>
      
      <div className="form-group">
        <label>GitHub Personal Access Token</label>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ghp_xxxxxxxxxxxx"
        />
        <small>
          Token com permissões: repo, workflow
          <a href="https://github.com/settings/tokens/new?scopes=repo,workflow" target="_blank">
            Criar token
          </a>
        </small>
      </div>
      
      <button onClick={handleSave}>Salvar</button>
    </div>
  )
}

// ============================================
// 7. Integração com Sistema de Notificações
// ============================================
import { listWorkflowRuns } from './services/githubActions'

// Verificar testes falhados periodicamente
async function checkFailedTests(githubToken, onNotification) {
  const runs = await listWorkflowRuns(githubToken, 5)
  
  const failedRuns = runs.filter(run => 
    run.status === 'completed' && 
    run.conclusion === 'failure'
  )
  
  failedRuns.forEach(run => {
    onNotification({
      type: 'error',
      title: 'Teste Automatizado Falhou',
      message: `Execução #${run.runNumber} falhou`,
      link: run.htmlUrl
    })
  })
}

// Usar em um useEffect
useEffect(() => {
  if (!githubToken) return
  
  // Verificar a cada 5 minutos
  const interval = setInterval(() => {
    checkFailedTests(githubToken, addNotification)
  }, 5 * 60 * 1000)
  
  return () => clearInterval(interval)
}, [githubToken])

// ============================================
// 8. Badge de Status em Requisitos
// ============================================
function RequirementCard({ requirement, lastTestRun }) {
  const getTestBadge = () => {
    if (!lastTestRun) return null
    
    if (lastTestRun.status === 'in_progress') {
      return <span className="badge badge-blue">🔄 Testando...</span>
    }
    
    if (lastTestRun.conclusion === 'success') {
      return <span className="badge badge-green">✅ Passou</span>
    }
    
    if (lastTestRun.conclusion === 'failure') {
      return <span className="badge badge-red">❌ Falhou</span>
    }
  }
  
  return (
    <div className="card">
      <div className="card-header">
        <h3>{requirement.id}</h3>
        {getTestBadge()}
      </div>
      <p>{requirement.descricao}</p>
    </div>
  )
}

export default App
