# Sessão 05/03/2026 — Sistema de Alertas, Role QA e Tela de Gerenciamento de Usuários

## Objetivo

Implementar alertas server-side para usuários QA e melhorias no sistema de notificações do DocSimplesReports (TestWise).

---

## O que foi implementado

### 1. Role `qa` e role `admin`

- **`src/firebase.js`**
  - Adicionada função `updateUserRole(uid, role)` para alterar o role de usuários via admin
  - `subscribeToNotifications()` atualizado para usar `currentUser.role` do Firestore (em vez de recalcular pelo email), com fallback `getUserRole(email)`. Comparação de role agora é case-insensitive (`.toLowerCase()`)
  - `syncUserToFirestore()` já preservava o role no re-login — confirmado correto, sem alteração necessária

- **Roles disponíveis:** `desenvolvedor`, `operacao`, `qa`, `admin`
- **Primeiro admin:** definido manualmente no Firebase Console (`users/{uid}.role = 'admin'`)

---

### 2. Tela de Gerenciamento de Usuários (`/admin/usuarios`)

- **`src/pages/UsersAdminPage.jsx`** — novo arquivo
  - Lista todos os usuários (via `subscribeToUsers`)
  - Para cada usuário: avatar, nome, email, role atual (badge colorido) e select para alterar
  - Salva com `updateUserRole()` ao mudar o select — feedback inline de sucesso/erro
  - Exibe mensagem de acesso negado para não-admins

- **`src/App.jsx`**
  - Importado `Shield` do lucide-react e `UsersAdminPage`
  - Menu "Mais" ganha item **"Gerenciar Usuários"** visível **somente** para `user.role === 'admin'`
  - Rota `/#/admin/usuarios` adicionada

---

### 3. Cloud Functions — Alertas server-side

**`functions/index.js`** — 4 triggers Firestore adicionados:

| Trigger | Collection | Evento | Ação |
|---|---|---|---|
| `notifyQaOnNewTestDocument` | `testDocuments` | onCreate | Notifica todos os QA |
| `notifyQaOnNewTask` | `tasks` | onCreate | Notifica todos os QA |
| `notifyMentionInTestDocument` | `testDocuments` | onUpdate | Detecta `@menções` em comentários novos |
| `notifyMentionInTask` | `tasks` | onUpdate | Detecta `@menções` em comentários novos |

**Detalhes:**
- `getQaUsers()` busca roles `qa` e `QA` (case-insensitive, cobre variações)
- Notificações criadas com `targetUserId` + `targetEmail` + `link` para navegação
- Menções detectadas via regex `/@(\w+)/g` e lookup por `mentionName` na collection `users`
- Auto-exclusão: não notifica o próprio autor (por `authorId` ou `authorEmail`)

---

### 4. NotificationsPanel — ícone para `nova_tarefa`

- **`src/components/NotificationsPanel.jsx`**
  - Tipo `nova_tarefa`: ícone `Plus` verde, borda `border-l-green-500`, label "Nova Tarefa Criada"
  - Notificações com `link` agora são **clicáveis** — navegam para a origem e marcam como lida

---

### 5. Deep link — abrir tarefa diretamente da notificação

- **`src/pages/WorkspacesPage.jsx`** — lê `?taskId=` da URL via `useSearchParams` e passa para `WorkspaceBoard`
- **`src/components/WorkspaceBoard.jsx`** — aceita `autoOpenTaskId`, usa `useEffect` para auto-abrir a tarefa no modal quando o `taskId` está presente na URL
- **Cloud Functions** — links de notificação de tarefas incluem `?taskId=xxx` (ex: `/#/espacos?taskId=abc123`)

---

## Problemas encontrados e resolvidos durante a sessão

| Problema | Causa | Solução |
|---|---|---|
| Notificações QA não chegavam | Role salvo como `QA` (maiúsculo) no Firestore, query usava `qa` | `getQaUsers()` busca ambos; frontend usa `.toLowerCase()` |
| Dois usuários com mesmo `mentionName` | Admin e QA têm mesmo prefixo de email (`marcelo.salmeron`) | `mentionName` do QA definido como `salmeron` (baseado no perfil editado) |
| Função não disparava para comentários | Comentário não estava indo para collection `tasks` | Identificado que o item era de outra collection; trigger correto foi confirmado |
| Notificação não clicável | Sem handler de navegação no `NotificationsPanel` | Adicionado `handleNotificationClick` que navega para `notification.link` |

---

## Configuração necessária no Firebase Console

1. **Definir primeiro admin:** `users/{uid}.role = 'admin'` manualmente
2. **Usuário QA de teste criado:** `marcelo.salmeron@om30.com.br` (UID: `L90s1xg076Ss7aRyJXaeyDH9Tlu2`)
   - `mentionName: salmeron`
   - `role: qa`

---

## Como testar

| Cenário | Esperado |
|---|---|
| Login como admin → menu "Mais" | Item "Gerenciar Usuários" visível |
| Login como não-admin → `/#/admin/usuarios` | Mensagem de acesso negado |
| Criar tarefa como `operacao` | Usuário QA recebe notificação de `nova_tarefa` |
| Criar tarefa como `qa` | QA NÃO recebe (criador excluído) |
| Comentar com `@salmeron` | Usuário QA recebe notificação de `mencao` |
| Comentar com `@marcelosalmeron` | Admin recebe notificação de `mencao` |
| Clicar na notificação de tarefa | Navega para `/#/espacos?taskId=xxx` e abre tarefa automaticamente |

---

## Arquivos modificados

| Arquivo | Tipo |
|---|---|
| `src/firebase.js` | Modificado |
| `src/App.jsx` | Modificado |
| `src/pages/UsersAdminPage.jsx` | **Novo** |
| `src/components/NotificationsPanel.jsx` | Modificado |
| `src/components/WorkspaceBoard.jsx` | Modificado |
| `src/pages/WorkspacesPage.jsx` | Modificado |
| `functions/index.js` | Modificado |
| `functions/package-lock.json` | Modificado (npm install) |
