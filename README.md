# TestWise

**Plataforma completa de QA e Gestão de Testes** com geração automática de Gherkin e Playwright.

## 🚀 Sobre o Projeto

TestWise é uma plataforma integrada para equipes de QA que combina:
- Registro e documentação de testes de homologação
- Gestão de sprints e backlog (estilo Jira/ClickUp)
- Casos de teste reutilizáveis com geração de código
- Execução de testes com cronômetro e evidências
- Fluxo completo de comunicação Dev ↔ QA

## ✨ Funcionalidades

### 📋 Registro de Testes
- Formulário completo para documentar testes de homologação
- Categorização: Bug, Regra de Negócio, Melhoria
- Upload de evidências (imagens e vídeos) com drag-and-drop e Ctrl+V
- Integração automática com Jira

### 📊 Gestão de Sprints e Backlog
- Importe testes pendentes/reprovados como tarefas
- Organize tarefas em sprints
- Atribua responsáveis e acompanhe o progresso
- Estatísticas por sprint e backlog

### ✅ Casos de Teste
- Crie casos de teste reutilizáveis
- Geração automática de código **Gherkin** (BDD)
- Geração automática de código **Playwright**
- Execute testes com cronômetro e registro de resultados

### 🔄 Fluxo Dev ↔ QA
- Sistema completo de comentários com menções (@)
- Reações com emojis e GIFs
- Solicitação e aprovação de reteste
- Notificações em tempo real
- Histórico completo de interações

### 📈 Relatórios e Métricas
- Dashboard com estatísticas
- Gráficos interativos (pizza, barras, evolução)
- Exportação em PDF e Excel
- Taxa de aprovação e tempo médio de resolução

### 🎨 Interface Moderna
- **Dark Mode** - Tema escuro para conforto visual
- Design responsivo
- Navegação intuitiva

### 🔐 Segurança
- Autenticação Firebase
- Expiração de sessão (8h inatividade / 24h absoluto)
- Controle de acesso por perfil

## 🛠️ Tecnologias

- **React 18** - Framework frontend
- **Vite** - Build tool
- **TailwindCSS** - Estilização
- **Firebase** - Auth, Firestore, Storage
- **Recharts** - Gráficos
- **Lucide React** - Ícones
- **jsPDF** - Geração de PDFs

## 📦 Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/testwise.git

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais Firebase

# Iniciar servidor de desenvolvimento
npm run dev
```

O sistema estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── App.jsx                      # Componente principal e rotas
├── firebase.js                  # Configuração Firebase
├── version.js                   # Versionamento e changelog
├── components/
│   ├── CommentsSection.jsx      # Sistema de comentários
│   ├── Footer.jsx               # Rodapé
│   ├── LoadingSpinner.jsx       # Spinner de carregamento
│   ├── MediaViewer.jsx          # Visualizador de mídia
│   ├── MentionInput.jsx         # Input com menções
│   ├── Navigation.jsx           # Menu de navegação
│   ├── ReactionPicker.jsx       # Seletor de emojis/GIFs
│   └── WhatsNewModal.jsx        # Modal de novidades
├── pages/
│   ├── HomePage.jsx             # Dashboard
│   ├── LoginPage.jsx            # Tela de login
│   ├── TestRegistrationPage.jsx # Registro de testes
│   ├── DocumentViewerPage.jsx   # Visualização de documentos
│   ├── TestCasesPage.jsx        # Casos de teste
│   ├── TestExecutionPage.jsx    # Execução de testes
│   ├── SprintsPage.jsx          # Gestão de sprints
│   ├── MyTasksPage.jsx          # Minhas tarefas
│   ├── RequirementsPage.jsx     # Gestão de requisitos
│   ├── ReportsPage.jsx          # Relatórios
│   └── TutorialPage.jsx         # Tutorial e ajuda
└── contexts/
    └── ThemeContext.jsx         # Contexto do Dark Mode
```

## 🔄 Fluxo de Uso

### Para QA (Operação)
1. **Registrar Teste** - Documente o teste com evidências
2. **Acompanhar** - Veja comentários e respostas do Dev
3. **Validar** - Aprove ou reprove o reteste

### Para Desenvolvedores
1. **Visualizar Tarefas** - Veja tarefas no Backlog ou Minhas Tarefas
2. **Analisar** - Leia descrição e evidências do problema
3. **Corrigir** - Implemente a correção
4. **Solicitar Reteste** - Adicione comentário/evidência e solicite reteste

### Para Gestão
1. **Criar Sprints** - Organize o trabalho em ciclos
2. **Atribuir Tarefas** - Defina responsáveis
3. **Acompanhar Métricas** - Use relatórios e dashboard

## 📝 Formato Gherkin Gerado

```gherkin
# language: pt

Funcionalidade: Autenticação

  Cenário: Validar login com credenciais válidas
    Dado que o usuário está na página de login
    Quando o usuário informa email válido
    E o usuário informa senha válida
    E clica no botão entrar
    Então o sistema deve redirecionar para o dashboard
```

## 🎭 Código Playwright Gerado

```typescript
import { test, expect } from '@playwright/test';

test.describe('Autenticação', () => {
  test('Validar login com credenciais válidas', async ({ page }) => {
    await page.goto('URL_DA_APLICACAO');
    
    // Passo 1: Informar email
    await page.fill('#email', 'usuario@email.com');
    
    // Passo 2: Informar senha
    await page.fill('#senha', '********');
    
    // Passo 3: Clicar no botão
    await page.click('#btn-login');
    
    // Verificar resultado
    await expect(page).toHaveURL('/dashboard');
  });
});
```

## 🏢 Powered by

**[OM30](https://om30.com.br)** - Tecnologia em Saúde

## 📄 Licença

MIT
