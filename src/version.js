// Sistema de Versionamento do TestWise

export const APP_VERSION = '2.7.0'

export const CHANGELOG = [
  {
    version: '2.7.0',
    date: '2026-03-06',
    title: 'Roles, Fluxo QA e Gestão de Usuários',
    changes: [
      {
        type: 'feature',
        description: '👤 Perfil no primeiro login — ao entrar pela primeira vez, o usuário escolhe seu nome e função (Desenvolvedor, Operação ou QA)'
      },
      {
        type: 'feature',
        description: '🔁 Fluxo de aprovação em 3 etapas — Dev corrige → QA valida → Operação homologa e fecha a tarefa'
      },
      {
        type: 'feature',
        description: '🛡️ Gerenciar Usuários — admins podem alterar o role de qualquer usuário, resetar perfil e remover duplicatas diretamente pela tela'
      },
      {
        type: 'feature',
        description: '🔔 Alertas para QA via Cloud Functions — QA é notificado sempre que uma nova tarefa ou documento de teste é criado por outro papel'
      },
      {
        type: 'improvement',
        description: '✅ Aprovação em cascata — ao aprovar um documento de teste, todas as tarefas vinculadas são fechadas e o requisito atualiza para "Aprovado" automaticamente'
      },
      {
        type: 'improvement',
        description: '⚡ Badge de role em tempo real — a badge no header (Dev/QA/Op/Admin) atualiza instantaneamente sem precisar fazer logout'
      },
      {
        type: 'bugfix',
        description: '🔧 Correção da badge de role que mostrava "Op" para todos os usuários independente do cargo real no Firestore'
      },
      {
        type: 'feature',
        description: '🔔 Notificações clicáveis com deep link — clicar em uma notificação leva diretamente ao documento ou tarefa relacionada, já marcando como lida'
      },
      {
        type: 'feature',
        description: '💬 Notificações de menção (@) em comentários — ao ser mencionado em qualquer comentário do sistema, o usuário recebe alerta em roxo'
      },
      {
        type: 'feature',
        description: '📋 Novos tipos de notificação: "Nova Tarefa Criada" (verde) e "Novo Teste Registrado" (índigo) com ícones distintos no painel'
      },
      {
        type: 'bugfix',
        description: '🧹 Remoção de usuários duplicados — ferramenta para limpar documentos duplicados gerados por versões antigas do sistema'
      }
    ]
  },
  {
    version: '2.6.0',
    date: '2026-02-12',
    title: 'Workspace Canvas em Tela Cheia',
    changes: [
      {
        type: 'feature',
        description: '🖥️ Canvas de trabalho agora ocupa 100% da tela com dock lateral fixo de módulos estilo FlashChart'
      },
      {
        type: 'improvement',
        description: '📌 Botões Salvar Layout e Resetar foram movidos para o dock para acesso rápido sem sair do fluxo'
      },
      {
        type: 'improvement',
        description: '🧼 Header simplificado: removemos textos auxiliares para destacar apenas o título principal'
      }
    ]
  },
  {
    version: '2.5.0',
    date: '2026-02-11',
    title: 'Exportações e IA em Todo Lugar',
    changes: [
      {
        type: 'feature',
        description: '📤 Exportação avançada da tabela de requisitos em CSV/Excel/Markdown com todos os campos formatados automaticamente'
      },
      {
        type: 'feature',
        description: '🧠 Geração de documentos de teste com IA direto do formulário de registro'
      },
      {
        type: 'feature',
        description: '⚡ Criação de tarefas com IA no módulo de Sprints e diretamente no fluxo de registro de documentos de teste'
      },
      {
        type: 'improvement',
        description: '📘 Tutorial e README atualizados com guias completos sobre exportações e recursos de IA'
      }
    ]
  },
  {
    version: '2.4.0',
    date: '2026-02-06',
    title: 'Testes Automatizados Integrados',
    changes: [
      {
        type: 'feature',
        description: '🤖 Testes Automatizados - Nova página dedicada para executar e monitorar testes Playwright'
      },
      {
        type: 'feature',
        description: '▶️ Execução de Testes - Dispare testes específicos ou suite completa direto do TestWise'
      },
      {
        type: 'feature',
        description: '🌍 Seleção de Ambiente - Escolha entre Homologação ou Produção'
      },
      {
        type: 'feature',
        description: '🤖 Status dos Runners - Veja em tempo real se os runners estão online, ocupados ou offline'
      },
      {
        type: 'feature',
        description: '📊 Histórico de Execuções - Lista completa com status, conclusão e informações detalhadas'
      },
      {
        type: 'feature',
        description: '📜 Logs Completos - Visualize logs de cada job após finalização da execução'
      },
      {
        type: 'feature',
        description: '📄 Relatório HTML Integrado - Dashboard customizado com estatísticas e documentação dos testes'
      },
      {
        type: 'feature',
        description: '🎨 Loading Personalizado - Logos OrquestraIA e OM30 durante execução'
      },
      {
        type: 'feature',
        description: '⚙️ Configuração de Token - GitHub Personal Access Token salvo localmente'
      },
      {
        type: 'improvement',
        description: '💡 Mensagens Informativas - Avisos claros sobre limitações da API e status dos testes'
      },
      {
        type: 'improvement',
        description: '🔄 Auto-refresh - Atualização automática de status durante execução'
      },
      {
        type: 'improvement',
        description: '📥 Download de Logs - Baixe logs em arquivo .txt para análise offline'
      }
    ]
  },
  {
    version: '2.3.0',
    date: '2026-02-03',
    title: 'Perfil de Usuário e Boas-vindas Personalizadas',
    changes: [
      {
        type: 'feature',
        description: '👤 Página de Perfil - Edite seu nome, foto, telefone, departamento e localização'
      },
      {
        type: 'feature',
        description: '📸 Upload de foto de perfil - Personalize seu avatar com uma foto sua'
      },
      {
        type: 'feature',
        description: '👋 Modal de Boas-vindas - Ao fazer login, veja suas tarefas prioritárias e estatísticas'
      },
      {
        type: 'feature',
        description: '😀 Reações em comentários - Reaja com emojis (👍❤️🎉😄🤔👀🚀) em Minhas Tarefas'
      },
      {
        type: 'feature',
        description: '🎨 Departamento personalizado - Seu departamento aparece na navbar com cores (QA=roxo, Op=verde, Dev=azul)'
      },
      {
        type: 'improvement',
        description: '💾 Persistência de perfil - Suas alterações de perfil são salvas e mantidas entre sessões'
      },
      {
        type: 'improvement',
        description: '🖱️ Drag-and-drop e Ctrl+V - Anexe evidências arrastando ou colando em Minhas Tarefas'
      },
      {
        type: 'bugfix',
        description: '🔧 Correção do erro de permissão ao fazer logout'
      }
    ]
  },
  {
    version: '2.2.0',
    date: '2026-02-02',
    title: 'Espaços de Trabalho e Abertura de Tarefas',
    changes: [
      {
        type: 'feature',
        description: '🏢 Espaços de Trabalho - Nova área com Kanban para Operação, Devs e QA'
      },
      {
        type: 'feature',
        description: '➕ Abertura de Tarefas - Crie bugs, melhorias e regras de negócio diretamente dos espaços Operação e QA'
      },
      {
        type: 'feature',
        description: '📎 Upload de evidências nas tarefas - Anexe prints e vídeos com drag & drop'
      },
      {
        type: 'feature',
        description: '💬 Comentários completos em Minhas Tarefas - Menções (@usuario), anexos e histórico'
      },
      {
        type: 'feature',
        description: '📋 Modal de detalhes com abas: Detalhes, Comentários e Evidências'
      },
      {
        type: 'feature',
        description: '🔄 Fluxo automático: Dev corrige → QA testa → Operação valida'
      },
      {
        type: 'improvement',
        description: '📊 Dashboard da Home agora usa dados da tabela de Requisitos'
      },
      {
        type: 'improvement',
        description: '🏷️ Novos labels: "Em Teste", "Aguardando", "Sugestões"'
      }
    ]
  },
  {
    version: '2.1.0',
    date: '2026-01-26',
    title: 'Estimativa de Entrega e Novos Status',
    changes: [
      {
        type: 'feature',
        description: '📅 Nova página Estimativa de Entrega - calcule quantos requisitos por dia precisam ser aprovados'
      },
      {
        type: 'feature',
        description: '📊 3 cenários de estimativa: Otimista (+25%), Realista e Pessimista (-30%)'
      },
      {
        type: 'feature',
        description: '📈 Barras de progresso visuais para Obrigatórios e Não Obrigatórios'
      },
      {
        type: 'feature',
        description: '🗓️ Tabela de Metas Semanais dinâmica baseada na data de entrega'
      },
      {
        type: 'feature',
        description: '💡 Dicas inteligentes para atingir a meta de entrega'
      },
      {
        type: 'feature',
        description: '➕ Novo status "Para Reteste Homolog" em Status Homolog'
      },
      {
        type: 'feature',
        description: '➕ Novo status "Para Reteste QA" em Status QA Dev e QA Homolog'
      },
      {
        type: 'feature',
        description: '📊 Novo gráfico comparativo Dev × QA Dev × QA Homolog'
      },
      {
        type: 'feature',
        description: '📊 Novo gráfico de Status Homologação detalhado em barras'
      },
      {
        type: 'improvement',
        description: '🎯 Meta automática: 100% obrigatórios + 85% não obrigatórios'
      }
    ]
  },
  {
    version: '2.0.0',
    date: '2026-01-24',
    title: 'TestWise 2.0 - Plataforma Completa de QA',
    changes: [
      {
        type: 'feature',
        description: '🎨 Nova identidade visual - Sistema renomeado para TestWise com novo design de login'
      },
      {
        type: 'feature',
        description: '📋 Gestão de Sprints e Backlog - Organize tarefas em sprints como no Jira/ClickUp'
      },
      {
        type: 'feature',
        description: '✅ Casos de Teste - Crie e gerencie casos de teste com geração automática de Gherkin e Playwright'
      },
      {
        type: 'feature',
        description: '▶️ Execução de Testes - Execute casos de teste com cronômetro, evidências e salvamento de progresso'
      },
      {
        type: 'feature',
        description: '📥 Importação automática - Testes pendentes/reprovados viram tarefas no backlog'
      },
      {
        type: 'feature',
        description: '🔄 Fluxo Dev ↔ QA - Desenvolvedores podem solicitar reteste diretamente das tarefas'
      },
      {
        type: 'feature',
        description: '💬 Comentários completos nas tarefas - Mesmo sistema da página de Documentos com emojis, menções e evidências'
      },
      {
        type: 'feature',
        description: '📱 Minhas Tarefas - Visualize todas as tarefas atribuídas a você em um só lugar'
      },
      {
        type: 'feature',
        description: '🌙 Dark Mode - Tema escuro em toda a aplicação'
      },
      {
        type: 'feature',
        description: '⏱️ Expiração de sessão - Segurança com logout automático após 8h de inatividade ou 24h'
      },
      {
        type: 'improvement',
        description: '🦶 Novo rodapé com "Powered by OM30"'
      },
      {
        type: 'improvement',
        description: '🔔 Notificações melhoradas para fluxo de reteste'
      }
    ]
  },
  {
    version: '1.9.0',
    date: '2026-01-23',
    title: 'Gestão de Requisitos da Planilha',
    changes: [
      {
        type: 'feature',
        description: 'Nova página de Requisitos - importe sua planilha Excel com os requisitos do projeto'
      },
      {
        type: 'feature',
        description: 'Edição inline de status diretamente na tabela: Status Dev, QA Dev, QA Homolog, Status Homolog'
      },
      {
        type: 'feature',
        description: 'Gráfico de Requisitos Obrigatórios - acompanhe quantos obrigatórios estão aprovados/pendentes'
      },
      {
        type: 'feature',
        description: 'Filtros avançados: Obrigatório, Status Homolog, Status Dev, QA Dev, QA Homolog, Módulo'
      },
      {
        type: 'feature',
        description: 'Paginação na tabela de requisitos (50 por página)'
      },
      {
        type: 'improvement',
        description: 'Campos editáveis: Versão Dev, Versão Homolog e Observação salvam automaticamente'
      },
      {
        type: 'improvement',
        description: 'Gráfico "Testes por Categoria" agora mostra barras empilhadas por status'
      }
    ]
  },
  {
    version: '1.8.0',
    date: '2026-01-22',
    title: 'Reações com Emojis e GIFs',
    changes: [
      {
        type: 'feature',
        description: 'Reaja aos comentários com emojis 😀👍❤️ - clique no ícone de smile ao lado de cada comentário'
      },
      {
        type: 'feature',
        description: 'Integração com GIPHY - busque e adicione GIFs animados como reação'
      },
      {
        type: 'feature',
        description: 'Emojis organizados por categorias: Frequentes, Gestos, Símbolos, Objetos e Rostos'
      },
      {
        type: 'feature',
        description: 'Reações agrupadas com contagem - veja quantas pessoas reagiram com cada emoji/GIF'
      },
      {
        type: 'improvement',
        description: 'Suas reações aparecem destacadas em azul para fácil identificação'
      },
      {
        type: 'improvement',
        description: 'Tooltip mostra quem reagiu ao passar o mouse sobre a reação'
      }
    ]
  },
  {
    version: '1.7.0',
    date: '2026-01-17',
    title: 'Upload de Evidências e Notificações Inteligentes',
    changes: [
      {
        type: 'feature',
        description: 'Drag-and-drop para anexar imagens e vídeos - arraste arquivos diretamente para a área de upload'
      },
      {
        type: 'feature',
        description: 'Ctrl+V para colar screenshots da área de transferência'
      },
      {
        type: 'feature',
        description: 'Suporte a upload de vídeos como evidências (MP4, WebM, MOV, etc.)'
      },
      {
        type: 'feature',
        description: 'Notificação automática para desenvolvedores quando novo teste é registrado'
      },
      {
        type: 'improvement',
        description: 'Notificações filtradas por usuário - você só vê o que é relevante para você'
      },
      {
        type: 'improvement',
        description: 'Player de vídeo integrado nos comentários e evidências'
      }
    ]
  },
  {
    version: '1.6.0',
    date: '2026-01-16',
    title: 'Menções e Perfis de Usuário',
    changes: [
      {
        type: 'feature',
        description: 'Sistema de menções nos comentários - digite @ para mencionar um colega'
      },
      {
        type: 'feature',
        description: 'Notificações personalizadas quando você é mencionado em um comentário'
      },
      {
        type: 'feature',
        description: 'Perfis de usuário sincronizados automaticamente (Desenvolvedor/Operação)'
      },
      {
        type: 'improvement',
        description: 'Menções destacadas em roxo nos comentários existentes'
      },
      {
        type: 'improvement',
        description: 'Autocomplete inteligente com nome, email e função do usuário'
      }
    ]
  },
  {
    version: '1.5.0',
    date: '2026-01-16',
    title: 'Relatórios e Métricas',
    changes: [
      {
        type: 'feature',
        description: 'Nova página de Relatórios com gráficos interativos (pizza, barras, evolução)'
      },
      {
        type: 'feature',
        description: 'Exportação de relatórios em PDF e Excel com filtros por período'
      },
      {
        type: 'feature',
        description: 'Métricas: taxa de aprovação, tempo médio de resolução, testes em andamento'
      },
      {
        type: 'feature',
        description: 'Filtros avançados por data, status e categoria'
      }
    ]
  },
  {
    version: '1.4.0',
    date: '2026-01-16',
    title: 'Sistema de Notificações',
    changes: [
      {
        type: 'feature',
        description: 'Sistema de notificações em tempo real para alertar sobre interações nos testes'
      },
      {
        type: 'feature',
        description: 'Ícone de sino com badge mostrando quantidade de notificações não lidas'
      },
      {
        type: 'feature',
        description: 'Alertas para: novos comentários, solicitações de reteste, aprovações e reprovações'
      },
      {
        type: 'improvement',
        description: 'Painel de notificações com opção de marcar como lida ou excluir'
      }
    ]
  },
  {
    version: '1.3.0',
    date: '2026-01-16',
    title: 'Tutorial e Versionamento',
    changes: [
      {
        type: 'feature',
        description: 'Nova página de Tutorial e Ajuda com guias passo a passo'
      },
      {
        type: 'feature',
        description: 'Sistema de versionamento com modal de novidades'
      },
      {
        type: 'feature',
        description: 'Versão do sistema visível no header e tela de login'
      },
      {
        type: 'improvement',
        description: 'Documentação do fluxo de interação entre Operação e Desenvolvimento'
      }
    ]
  },
  {
    version: '1.2.0',
    date: '2026-01-16',
    title: 'Integração com Jira e Categorias',
    changes: [
      {
        type: 'feature',
        description: 'Integração automática com Jira - ao registrar um teste, uma issue é criada automaticamente no projeto OH'
      },
      {
        type: 'feature',
        description: 'Novo campo obrigatório "Categoria" no formulário de registro (Regra de Negócio, Bug, Melhoria)'
      },
      {
        type: 'feature',
        description: 'Dashboard atualizado com contadores por categoria'
      },
      {
        type: 'feature',
        description: 'Filtro por categoria na listagem de documentos'
      },
      {
        type: 'feature',
        description: 'Botão "Reprovar Reteste" para a equipe de Operação'
      },
      {
        type: 'improvement',
        description: 'Separação de botões por contexto (Desenvolvedor vs Operação)'
      }
    ]
  },
  {
    version: '1.1.0',
    date: '2026-01-15',
    title: 'Melhorias no Sistema de Reteste',
    changes: [
      {
        type: 'feature',
        description: 'Sistema de solicitação e aprovação de reteste'
      },
      {
        type: 'feature',
        description: 'Comentários e interações nos documentos de teste'
      }
    ]
  },
  {
    version: '1.0.0',
    date: '2026-01-10',
    title: 'Lançamento Inicial',
    changes: [
      {
        type: 'feature',
        description: 'Registro de testes de homologação'
      },
      {
        type: 'feature',
        description: 'Dashboard com estatísticas'
      },
      {
        type: 'feature',
        description: 'Gestão de requisitos'
      },
      {
        type: 'feature',
        description: 'Upload de evidências (screenshots)'
      }
    ]
  }
]

// Verifica se o usuário já viu a versão atual
export const hasSeenVersion = (version) => {
  const seenVersions = JSON.parse(localStorage.getItem('seenVersions') || '[]')
  return seenVersions.includes(version)
}

// Marca a versão como vista
export const markVersionAsSeen = (version) => {
  const seenVersions = JSON.parse(localStorage.getItem('seenVersions') || '[]')
  if (!seenVersions.includes(version)) {
    seenVersions.push(version)
    localStorage.setItem('seenVersions', JSON.stringify(seenVersions))
  }
}

// Retorna as novidades da versão atual
export const getCurrentChangelog = () => {
  return CHANGELOG.find(c => c.version === APP_VERSION)
}
