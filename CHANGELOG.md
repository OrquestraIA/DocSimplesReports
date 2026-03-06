# Changelog — TestWise

Todas as mudanças relevantes do projeto são documentadas aqui.
Formato: `[TIPO]` Novo | Melhoria | Correção | Infra

---

## [2.7.0] — 2026-03-06 · Roles, Fluxo QA e Gestão de Usuários

### Novo
- **Perfil no primeiro login** (`ProfileSetupModal`): ao entrar pela primeira vez (ou se `profileCompleted: false`), o sistema exibe um modal bloqueante pedindo nome e função (Desenvolvedor / Operação / QA). Admin e QA atribuídos manualmente pelo admin pulam o modal automaticamente.
- **Role `qa`**: terceiro papel adicionado ao sistema. QA recebe notificações de novas tarefas via Cloud Functions e aparece como etapa intermediária no fluxo de aprovação.
- **Role `admin`**: gerencia usuários e não passa pelo modal de perfil.
- **Fluxo de aprovação em 3 etapas** para tarefas standalone (sem requisito vinculado):
  - Dev → "Enviar para QA" (`status: in_review, reviewStage: 'qa'`)
  - QA → "Aprovar e Enviar para Operação" (`reviewStage: 'operacao'`) ou "Reprovar"
  - Operação → "Aprovar" (`status: done`) ou "Reprovar"
- **Fluxo em 3 etapas para documentos de teste**:
  - Dev → "Solicitar Reteste" (envia para QA, status `em_reteste`)
  - QA → "Aprovar e Enviar para Operação" (status `em_homologacao`) ou "Reprovar" (status `reprovado`)
  - Operação → "Aprovar Reteste" (status `aprovado`) ou "Reprovar Reteste"
- **Status `em_homologacao`**: novo status intermediário para documentos aguardando validação da Operação (badge teal).
- **Tipos de comentário**: `aprovado_qa` e `reprovado_qa` adicionados em `CommentsSection` e `DocumentViewerPage`.
- **Tela Gerenciar Usuários** (`UsersAdminPage`):
  - Lista todos os usuários com nome, email, role atual e status de perfil
  - Alterar role via select (Desenvolvedor / Operação / QA / Admin)
  - Botão "Resetar perfil" — força o usuário a preencher nome/função no próximo login
  - Detecção automática de usuários duplicados (mesmo email, IDs diferentes)
  - Botão "Remover duplicatas" com limpeza automática via `deduplicateUsers()`
  - Acessível apenas para `role: admin` na rota `/#/admin/usuarios`
- **Alertas QA via Cloud Functions** (`functions/index.js`):
  - `onDocumentCreated('testDocuments')` → cria notificação para todos os usuários QA
  - `onDocumentCreated('tasks')` → idem para tarefas criadas nos módulos
  - `onDocumentUpdated` → detecta novos comentários com `@menção` e notifica o usuário mencionado (server-side, sem depender do frontend)

### Notificações
- **Notificações clicáveis com deep link** (`NotificationsPanel`): clicar em uma notificação navega diretamente para o documento ou tarefa relacionada (`window.location.href = notification.link`) e marca como lida automaticamente. Cursor de mão só aparece quando há link.
- **Tipo `mencao`** (ícone `AtSign` roxo): gerado server-side via Cloud Function quando um `@usuario` é detectado em novos comentários. O usuário é notificado com trecho do comentário e link direto para o item.
- **Tipo `nova_tarefa`** (ícone `Plus` verde): QA recebe este alerta quando qualquer tarefa ou documento de teste é criado por outro papel.
- **Tipo `novo_documento`** (ícone `FileText` índigo): alerta para novos documentos de teste registrados.
- Cada tipo tem cor de borda lateral e ícone distintos no painel de notificações.

### Melhoria
- **Aprovação em cascata**: ao aprovar um documento de teste (`status → 'aprovado'`), todas as tarefas com `sourceId === docId` são fechadas (`done`) e o campo `statusHomolog` do requisito vinculado é atualizado para `'Aprovado'` automaticamente.
- **Badge de role em tempo real**: o badge no header (`Dev/QA/Op/Admin`) agora usa `user.role` do Firestore (não mais `user.department` ou fallback por email). Um listener `onSnapshot` no documento do usuário garante que qualquer alteração de role feita pelo admin apareça instantaneamente sem re-login.
- **Botões contextuais por role** em todos os módulos:
  - `CommentsSection` (documentos de teste)
  - `DocumentViewerPage` (visualização de documento)
  - `TaskViewModal` (Espaços/WorkspaceBoard)
  - `SprintsPage` (modal de tarefa)
  - `MyTasksPage` (Minhas Tarefas)
- **`syncUserToFirestore`**: novos usuários criados com `role: null, profileCompleted: false`. Re-login de usuários existentes não sobrescreve o `role` salvo no Firestore.
- **`subscribeToUserDoc(uid, callback)`**: nova função em `firebase.js` para escutar mudanças em tempo real no documento do usuário logado.
- **`deduplicateUsers()`**: nova função em `firebase.js` — agrupa usuários por email, mantém o documento cujo `docId === uid` e deleta os demais.

### Correção
- Badge no header mostrava "Op" para todos os usuários por usar `user.department` (campo inexistente) com fallback para `getUserRole(email)`, que retorna `'operacao'` para domínios `@om30.com.br`. Corrigido para ler `user.role` diretamente.
- Migração de usuários antigos (`profileCompleted`) era muito agressiva — marcava como completo qualquer usuário com role definido, incluindo os auto-atribuídos. Agora só auto-completa `admin` e `qa` (nunca atribuídos automaticamente).
- `WorkspacesPage` não recebia as props `onRequestRetest`, `onUpdateDocumentStatus` e handlers de comentário/evidência — adicionados no `App.jsx`.

---

## [2.6.0] — 2026-02-12 · Workspace Canvas em Tela Cheia

- Canvas de trabalho ocupa 100% da tela com dock lateral fixo de módulos
- Botões Salvar Layout e Resetar movidos para o dock
- Header simplificado

---

## [2.5.0] — 2026-02-11 · Exportações e IA em Todo Lugar

- Exportação da tabela de requisitos em CSV / Excel / Markdown
- Geração de documentos de teste com IA no formulário de registro
- Criação de tarefas com IA no módulo de Sprints

---

## [2.4.0] — 2026-02-06 · Testes Automatizados Integrados

- Nova página para executar e monitorar testes Playwright
- Seleção de ambiente (Homologação / Produção)
- Status dos runners em tempo real
- Histórico de execuções, logs completos e relatório HTML integrado
- Configuração de GitHub Personal Access Token

---

## [2.3.0] — 2026-02-03 · Perfil de Usuário e Boas-vindas Personalizadas

- Página de Perfil: nome, foto, telefone, departamento, localização
- Upload de foto de perfil
- Modal de Boas-vindas com tarefas prioritárias e estatísticas
- Reações com emojis em Minhas Tarefas

---

## [2.2.0] — 2026-02-02 · Espaços de Trabalho e Abertura de Tarefas

- Espaços de Trabalho com Kanban para Operação, Devs e QA
- Criação de bugs, melhorias e regras de negócio diretamente nos espaços
- Upload de evidências nas tarefas (drag & drop)
- Comentários com menções, anexos e histórico em Minhas Tarefas
- Fluxo automático: Dev → QA → Operação

---

## [2.1.0] — 2026-01-26 · Estimativa de Entrega e Novos Status

- Nova página Estimativa de Entrega com 3 cenários (Otimista / Realista / Pessimista)
- Tabela de metas semanais dinâmica
- Novos status: "Para Reteste Homolog", "Para Reteste QA"
- Novos gráficos comparativos

---

## [2.0.0] — 2026-01-24 · TestWise 2.0 — Plataforma Completa de QA

- Nova identidade visual (TestWise)
- Gestão de Sprints e Backlog
- Casos de Teste com Gherkin e Playwright
- Execução de Testes com cronômetro e evidências
- Dark Mode
- Expiração de sessão (8h inatividade / 24h total)

---

## [1.9.0] — 2026-01-23 · Gestão de Requisitos da Planilha

- Importação de planilha Excel
- Edição inline de status na tabela
- Filtros avançados e paginação
- Gráficos de requisitos obrigatórios

---

## [1.8.0] — 2026-01-22 · Reações com Emojis e GIFs

- Reações em comentários com emojis e GIFs (GIPHY)
- Reações agrupadas com contagem e tooltip

---

## [1.7.0] — 2026-01-17 · Upload de Evidências e Notificações

- Drag-and-drop e Ctrl+V para evidências
- Suporte a vídeos (MP4, WebM, MOV)
- Notificações automáticas para desenvolvedores ao registrar teste

---

## [1.6.0] — 2026-01-16 · Menções e Perfis

- Sistema de menções com @usuario nos comentários
- Notificações ao ser mencionado
- Perfis sincronizados com Firestore

---

## [1.5.0] — 2026-01-16 · Relatórios e Métricas

- Página de relatórios com gráficos interativos
- Exportação em PDF e Excel

---

## [1.4.0] — 2026-01-16 · Notificações em Tempo Real

- Sistema de notificações com badge no sino
- Alertas para comentários, retestes, aprovações e reprovações

---

## [1.3.0] — 2026-01-16 · Tutorial e Versionamento

- Página de Tutorial com guias passo a passo
- Modal de novidades por versão

---

## [1.2.0] — 2026-01-16 · Integração com Jira e Categorias

- Criação automática de issue no Jira ao registrar teste
- Campo Categoria obrigatório (Regra de Negócio / Bug / Melhoria)

---

## [1.1.0] — 2026-01-15 · Reteste

- Solicitação e aprovação de reteste
- Comentários e interações nos documentos

---

## [1.0.0] — 2026-01-10 · Lançamento Inicial

- Registro de testes de homologação
- Dashboard com estatísticas
- Upload de evidências (screenshots)
