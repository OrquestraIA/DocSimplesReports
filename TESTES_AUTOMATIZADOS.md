# Integração com Testes Automatizados Playwright

Este documento explica como configurar e usar a integração com os testes automatizados do repositório [OrquestraIA/TestsDoc-Simples](https://github.com/OrquestraIA/TestsDoc-Simples).

## 📋 Pré-requisitos

1. **GitHub Personal Access Token** com permissões:
   - `repo` (acesso completo ao repositório)
   - `workflow` (disparar GitHub Actions)

## 🔧 Configuração

### 1. Criar GitHub Personal Access Token

1. Acesse: https://github.com/settings/tokens/new
2. Selecione os escopos:
   - ✅ `repo` - Full control of private repositories
   - ✅ `workflow` - Update GitHub Action workflows
3. Clique em "Generate token"
4. **Copie o token** (você não poderá vê-lo novamente!)

### 2. Configurar Token no TestWise

O token precisa ser armazenado de forma segura. Você pode:

**Opção A: Variável de Ambiente (Recomendado)**
```bash
# No arquivo .env.local
VITE_GITHUB_TOKEN=seu_token_aqui
```

**Opção B: Firebase (para compartilhar entre usuários)**
- Armazenar em uma coleção `settings` no Firestore
- Criptografar o token antes de armazenar

**Opção C: localStorage (apenas para desenvolvimento)**
```javascript
localStorage.setItem('githubToken', 'seu_token_aqui')
```

### 3. Ajustar URL do GitHub Pages

No arquivo `src/services/githubActions.js`, ajuste a função `getReportUrl` conforme a estrutura do seu GitHub Pages:

```javascript
export function getReportUrl(runNumber) {
  // Ajuste conforme a estrutura do seu GitHub Pages
  return `https://orquestraia.github.io/TestsDoc-Simples/reports/run-${runNumber}/index.html`
}
```

## 🚀 Como Usar

### 1. Adicionar Botão em Qualquer Lugar

```jsx
import TestAutomationButton from './components/TestAutomationButton'

// Em um componente
<TestAutomationButton 
  githubToken={githubToken}
  requirement={requirement} // opcional
  variant="default" // 'default', 'icon', 'small'
/>
```

### 2. Executar Testes

1. Clique no botão "Testes Automatizados"
2. No campo "Caminho do teste":
   - Deixe vazio para rodar **todos os testes**
   - Ou especifique um caminho: `tests/auth/login.spec.ts`
3. Selecione o ambiente (Homologação ou Produção)
4. Clique em "Executar"

### 3. Acompanhar Execução

- A lista de execuções é atualizada automaticamente a cada 10 segundos
- Status possíveis:
  - 🕐 **Na Fila** - Aguardando início
  - 🔄 **Executando** - Testes em andamento
  - ✅ **Sucesso** - Todos os testes passaram
  - ❌ **Falhou** - Algum teste falhou
  - ⚠️ **Cancelado** - Execução cancelada

### 4. Visualizar Resultados

Quando uma execução é concluída com sucesso:
1. Clique na execução na lista
2. Clique em "Ver Report HTML" para abrir o relatório completo
3. Ou visualize o preview diretamente no painel

## 📊 Estrutura de Dados

### Workflow Run
```javascript
{
  id: 123456789,
  runNumber: 42,
  status: 'completed', // queued, in_progress, completed
  conclusion: 'success', // success, failure, cancelled
  createdAt: '2026-02-06T14:45:00Z',
  updatedAt: '2026-02-06T14:50:00Z',
  htmlUrl: 'https://github.com/OrquestraIA/TestsDoc-Simples/actions/runs/123456789',
  actor: 'marcelo-om30',
  headBranch: 'main'
}
```

## 🔗 Integrações Sugeridas

### 1. Vincular Testes a Requisitos

Adicione o botão no modal de requisitos:

```jsx
// Em TaskDetailModal.jsx
import TestAutomationButton from './TestAutomationButton'

// No footer do modal
<TestAutomationButton 
  githubToken={githubToken}
  requirement={requirement}
  variant="small"
/>
```

### 2. Dashboard de Testes

Crie uma página dedicada para visualizar todas as execuções:

```jsx
// Em TestsPage.jsx
import TestRunsPanel from './components/TestRunsPanel'

export default function TestsPage({ githubToken }) {
  return (
    <div className="p-6">
      <h1>Testes Automatizados</h1>
      <TestRunsPanel 
        githubToken={githubToken}
        onClose={() => {}}
      />
    </div>
  )
}
```

### 3. Notificações de Testes

Integre com o sistema de notificações quando testes falharem:

```javascript
// Webhook do GitHub Actions para Firebase
// Quando um teste falhar, criar notificação para o time
```

## 🔒 Segurança

⚠️ **IMPORTANTE**: Nunca commite o token do GitHub no código!

- Use variáveis de ambiente
- Armazene de forma criptografada no Firebase
- Considere usar GitHub Apps ao invés de Personal Access Tokens para produção

## 📝 Workflow do GitHub Actions

O workflow atual (`playwright-custom-report-test.yml`) aceita os seguintes inputs:

```yaml
inputs:
  test_path:
    description: 'Caminho do teste (ex: tests/auth/login.spec.ts)'
    required: false
    default: ''
  environment:
    description: 'Ambiente (homolog ou prod)'
    required: false
    default: 'homolog'
```

## 🐛 Troubleshooting

### Token inválido ou sem permissões
- Verifique se o token tem os escopos `repo` e `workflow`
- Regenere o token se necessário

### Report não disponível
- O GitHub Pages pode levar alguns minutos para publicar
- Verifique se o workflow está configurado para publicar no Pages
- Confirme a URL do Pages nas configurações do repositório

### Testes não iniciam
- Verifique se o runner está ativo no Senha Segura
- Confirme que o workflow está habilitado no repositório
- Verifique os logs no GitHub Actions

## 📚 Próximos Passos

- [ ] Armazenar histórico de execuções no Firebase
- [ ] Vincular execuções a requisitos específicos
- [ ] Criar dashboard com métricas de testes
- [ ] Implementar notificações automáticas
- [ ] Adicionar filtros e busca nas execuções
- [ ] Integrar com sistema de sprints
