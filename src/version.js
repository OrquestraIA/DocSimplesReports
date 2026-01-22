// Sistema de Versionamento do DocSimples Reports

export const APP_VERSION = '1.8.0'

export const CHANGELOG = [
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
