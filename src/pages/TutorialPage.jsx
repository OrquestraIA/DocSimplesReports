import { useState } from 'react'
import { 
  BookOpen, 
  ChevronDown, 
  ChevronRight,
  FileText, 
  FlaskConical, 
  MessageSquare, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Users,
  Code,
  ArrowRight,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
  AtSign,
  Upload,
  Bell,
  Smile,
  FileSpreadsheet,
  Calendar,
  Play,
  ClipboardList,
  Timer,
  Moon,
  Calculator
} from 'lucide-react'

export default function TutorialPage() {
  const [expandedSection, setExpandedSection] = useState('registro')

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const sections = [
    {
      id: 'registro',
      title: 'Como Registrar um Teste',
      icon: FlaskConical,
      color: 'bg-blue-500',
      steps: [
        {
          title: 'Acesse "Registrar Teste"',
          description: 'No menu superior, clique em "Registrar Teste" para abrir o formulário de registro.',
          tip: 'Você também pode acessar pela página inicial clicando no botão "Novo Teste".'
        },
        {
          title: 'Preencha as Informações Básicas',
          description: 'Informe o título do teste, requisito relacionado, feature e módulo que está sendo testado.',
          tip: 'Use títulos descritivos que facilitem a identificação do teste posteriormente.'
        },
        {
          title: 'Selecione a Categoria',
          description: 'Escolha entre: Regra de Negócio (validação de requisitos), Bug (erro encontrado) ou Melhoria (sugestão de melhoria).',
          important: true,
          tip: 'A categoria é obrigatória e determina como o teste será classificado no Jira.'
        },
        {
          title: 'Defina Tipo, Prioridade e Status',
          description: 'Selecione o tipo de teste (funcional, exploratório, etc.), a prioridade e o status inicial.',
          tip: 'Para bugs críticos, use prioridade "Crítica" para destacar a urgência.'
        },
        {
          title: 'Adicione os Passos do Teste',
          description: 'Para cada passo, informe: a ação realizada, o resultado esperado e o resultado obtido.',
          tip: 'Seja detalhista nos passos para facilitar a reprodução do cenário pelo desenvolvedor.'
        },
        {
          title: 'Anexe Evidências',
          description: 'Faça upload de imagens ou vídeos: clique para selecionar, arraste arquivos ou cole com Ctrl+V.',
          tip: 'Vídeos são ótimos para demonstrar bugs de comportamento. Veja a seção "Upload de Evidências" para mais detalhes.'
        },
        {
          title: 'Salve o Teste',
          description: 'Clique em "Salvar Teste". Uma issue será criada automaticamente no Jira (projeto OH).',
          tip: 'O link da issue do Jira aparecerá na confirmação e ficará vinculado ao documento.'
        }
      ]
    },
    {
      id: 'fluxo',
      title: 'Fluxo de Interação: Operação ↔ Desenvolvimento',
      icon: Users,
      color: 'bg-purple-500',
      steps: [
        {
          title: '1. Operação Registra o Teste',
          description: 'A equipe de Operação (QA) registra o teste com todas as informações e evidências.',
          role: 'operacao'
        },
        {
          title: '2. Desenvolvedor Analisa',
          description: 'O desenvolvedor acessa "Documentos", visualiza o teste e analisa o problema reportado.',
          role: 'dev'
        },
        {
          title: '3. Desenvolvedor Responde',
          description: 'O dev pode adicionar comentários explicando a causa, solução ou pedindo mais informações.',
          role: 'dev',
          tip: 'Use o campo de comentários para manter o histórico da comunicação.'
        },
        {
          title: '4. Desenvolvedor Solicita Reteste',
          description: 'Após corrigir o problema, o dev clica em "Solicitar Reteste" para que a Operação valide.',
          role: 'dev',
          important: true
        },
        {
          title: '5. Operação Realiza o Reteste',
          description: 'A Operação testa novamente o cenário para verificar se a correção foi efetiva.',
          role: 'operacao'
        },
        {
          title: '6. Operação Aprova ou Reprova',
          description: 'Se OK, clica em "Aprovar Reteste" (status → Aprovado). Se não, clica em "Reprovar Reteste" (status → Reprovado).',
          role: 'operacao',
          important: true
        }
      ]
    },
    {
      id: 'status',
      title: 'Entendendo os Status',
      icon: FileText,
      color: 'bg-green-500',
      steps: [
        {
          title: 'Pendente',
          description: 'Teste registrado aguardando análise ou correção.',
          badge: 'bg-yellow-100 text-yellow-700'
        },
        {
          title: 'Em Reteste',
          description: 'Desenvolvedor solicitou reteste. Aguardando validação da Operação.',
          badge: 'bg-blue-100 text-blue-700'
        },
        {
          title: 'Aprovado',
          description: 'Teste passou! A funcionalidade está funcionando conforme esperado.',
          badge: 'bg-green-100 text-green-700'
        },
        {
          title: 'Reprovado',
          description: 'Teste falhou. O problema persiste ou um novo problema foi encontrado.',
          badge: 'bg-red-100 text-red-700'
        },
        {
          title: 'Bloqueado',
          description: 'Teste não pode ser executado por algum impedimento externo.',
          badge: 'bg-gray-100 text-gray-700'
        }
      ]
    },
    {
      id: 'categorias',
      title: 'Categorias de Teste',
      icon: Code,
      color: 'bg-indigo-500',
      steps: [
        {
          title: 'Regra de Negócio',
          description: 'Validação de requisitos e regras do sistema. Ex: "Usuário não pode fazer pedido sem endereço cadastrado".',
          badge: 'bg-indigo-100 text-indigo-700'
        },
        {
          title: 'Bug',
          description: 'Erro ou comportamento inesperado do sistema. Ex: "Botão de salvar não funciona", "Erro 500 ao acessar relatório".',
          badge: 'bg-red-100 text-red-700'
        },
        {
          title: 'Melhoria',
          description: 'Sugestão de melhoria na usabilidade ou funcionalidade. Ex: "Adicionar filtro por data no relatório".',
          badge: 'bg-emerald-100 text-emerald-700'
        }
      ]
    },
    {
      id: 'upload',
      title: 'Upload de Evidências (Imagens e Vídeos)',
      icon: Upload,
      color: 'bg-teal-500',
      steps: [
        {
          title: 'Clique para Selecionar',
          description: 'Clique na área de upload para abrir o seletor de arquivos. Você pode selecionar múltiplas imagens e vídeos de uma vez.',
          tip: 'Formatos suportados: PNG, JPG, GIF, MP4, WebM, MOV, AVI, MKV.'
        },
        {
          title: 'Arraste e Solte (Drag-and-Drop)',
          description: 'Arraste arquivos diretamente do seu computador para a área de upload tracejada. A borda ficará azul indicando que você pode soltar.',
          important: true,
          tip: 'Você pode arrastar vários arquivos de uma vez!'
        },
        {
          title: 'Cole da Área de Transferência (Ctrl+V)',
          description: 'Tire um print da tela (Print Screen) e cole diretamente na área de upload usando Ctrl+V.',
          important: true,
          tip: 'Ideal para capturar erros rapidamente sem precisar salvar o arquivo primeiro.'
        },
        {
          title: 'Vídeos como Evidência',
          description: 'Grave a tela mostrando o bug ou comportamento e faça upload do vídeo. Vídeos são exibidos com player integrado.',
          tip: 'Vídeos são especialmente úteis para bugs de comportamento ou animações.'
        },
        {
          title: 'Visualizando Evidências',
          description: 'Imagens podem ser ampliadas clicando nelas. Vídeos têm controles de play/pause e botão para abrir em nova aba.',
          tip: 'Use o botão "↗ Abrir" nos vídeos para visualizar em tela cheia.'
        }
      ]
    },
    {
      id: 'notificacoes',
      title: 'Sistema de Notificações',
      icon: Bell,
      color: 'bg-orange-500',
      steps: [
        {
          title: 'Notificações Personalizadas',
          description: 'Você só recebe notificações relevantes para você: menções diretas, ações do seu perfil oposto e novos testes (para devs).',
          important: true,
          tip: 'Desenvolvedores veem ações da Operação. Operação vê ações dos Desenvolvedores.'
        },
        {
          title: 'Novo Teste Registrado',
          description: 'Desenvolvedores recebem notificação automática quando um novo teste é registrado pela Operação.',
          tip: 'Fique atento ao sino para não perder novos testes!'
        },
        {
          title: 'Solicitação de Reteste',
          description: 'A Operação recebe notificação quando um desenvolvedor solicita reteste de um bug corrigido.',
          tip: 'Clique na notificação para ir direto ao documento.'
        },
        {
          title: 'Aprovação/Reprovação',
          description: 'Desenvolvedores recebem notificação quando a Operação aprova ou reprova um reteste.',
          tip: 'Notificações verdes = aprovado, vermelhas = reprovado.'
        },
        {
          title: 'Menções (@)',
          description: 'Quando alguém te menciona em um comentário, você recebe uma notificação destacada em roxo.',
          tip: 'Menções são úteis para chamar atenção de pessoas específicas.'
        }
      ]
    },
    {
      id: 'mencoes',
      title: 'Como Usar Menções (@)',
      icon: AtSign,
      color: 'bg-purple-500',
      steps: [
        {
          title: 'Mencionando um Colega',
          description: 'Nos comentários, digite @ seguido do nome do usuário. Uma lista de sugestões aparecerá automaticamente.',
          tip: 'Ex: "@marcelo você pode verificar isso?" ou "@adriana preciso de mais detalhes".'
        },
        {
          title: 'Autocomplete Inteligente',
          description: 'Ao digitar @, o sistema mostra todos os usuários disponíveis. Continue digitando para filtrar a lista.',
          tip: 'Você pode buscar pelo nome, email ou nome de menção do usuário.'
        },
        {
          title: 'Selecionando o Usuário',
          description: 'Use as setas ↑↓ para navegar e Enter para selecionar, ou clique diretamente no nome desejado.',
          tip: 'A menção será inserida automaticamente no formato @nomedousuario.'
        },
        {
          title: 'Notificação Automática',
          description: 'Quando você menciona alguém, essa pessoa recebe uma notificação destacada em roxo no sino.',
          important: true,
          tip: 'Use menções para chamar atenção de pessoas específicas sobre um teste.'
        },
        {
          title: 'Visualizando Menções',
          description: 'Menções aparecem destacadas em roxo nos comentários. Passe o mouse para ver o email do usuário.',
          tip: 'Menções facilitam identificar rapidamente quem foi envolvido na discussão.'
        }
      ]
    },
    {
      id: 'reacoes',
      title: 'Reações com Emojis e GIFs',
      icon: Smile,
      color: 'bg-pink-500',
      steps: [
        {
          title: 'Reagindo a um Comentário',
          description: 'Clique no ícone 😊 (smile) ao lado de qualquer comentário para abrir o seletor de reações.',
          tip: 'Reações são uma forma rápida de dar feedback sem precisar escrever um comentário.'
        },
        {
          title: 'Escolhendo um Emoji',
          description: 'Na aba "Emojis", escolha entre categorias: Frequentes, Gestos, Símbolos, Objetos e Rostos. Clique no emoji desejado.',
          tip: 'Use a barra de busca para encontrar emojis específicos rapidamente.'
        },
        {
          title: 'Adicionando GIFs',
          description: 'Clique na aba "GIFs" para buscar GIFs animados do GIPHY. Digite para buscar ou escolha dos trending.',
          important: true,
          tip: 'GIFs são ótimos para expressar reações de forma divertida!'
        },
        {
          title: 'Reações Agrupadas',
          description: 'Reações iguais são agrupadas com um contador. Passe o mouse para ver quem reagiu.',
          tip: 'Suas próprias reações aparecem destacadas em azul.'
        },
        {
          title: 'Removendo uma Reação',
          description: 'Clique novamente na mesma reação para removê-la. Você pode trocar sua reação a qualquer momento.',
          tip: 'Cada usuário pode ter múltiplas reações diferentes no mesmo comentário.'
        }
      ]
    },
    {
      id: 'requisitos',
      title: 'Gestão de Requisitos (Planilha)',
      icon: FileSpreadsheet,
      color: 'bg-emerald-500',
      steps: [
        {
          title: 'Acessando a Página de Requisitos',
          description: 'No menu lateral, clique em "Requisitos" para acessar a página de gestão de requisitos importados da planilha.',
          tip: 'Esta página permite acompanhar todos os requisitos do projeto em um só lugar.'
        },
        {
          title: 'Importando a Planilha Excel',
          description: 'Clique em "Importar Excel" e selecione sua planilha de requisitos. O sistema lê automaticamente as colunas: ID, Módulo, Descrição, Status Dev, Status Homolog, etc.',
          important: true,
          tip: 'A planilha deve ter uma aba chamada "Requisitos" ou o sistema usará a primeira aba.'
        },
        {
          title: 'Visualizando Gráficos',
          description: 'A página exibe gráficos de: Requisitos Obrigatórios (aprovados/pendentes), Status Homologação, Status Desenvolvimento e Top Módulos.',
          tip: 'O gráfico de Obrigatórios em vermelho mostra o progresso dos requisitos críticos.'
        },
        {
          title: 'Usando os Filtros',
          description: 'Use os filtros para encontrar requisitos específicos: Obrigatório (Sim/Não), Status Homolog, Status Dev, QA Dev, QA Homolog e Módulo.',
          tip: 'Combine múltiplos filtros para refinar sua busca.'
        },
        {
          title: 'Editando Status na Tabela',
          description: 'Clique nos dropdowns de status (Status Dev, QA Dev, QA Homolog, Status Homolog) para alterar diretamente. As alterações são salvas automaticamente.',
          important: true,
          tip: 'A coluna "Status Homolog" em roxo é o status principal de homologação.'
        },
        {
          title: 'Editando Versões e Observações',
          description: 'Os campos V. Dev, V. Homolog e Observação são editáveis. Digite o valor e clique fora do campo para salvar.',
          tip: 'Use a Observação para adicionar notas importantes sobre o requisito.'
        },
        {
          title: 'Navegando com Paginação',
          description: 'A tabela mostra 50 requisitos por página. Use os botões de navegação no rodapé para ver mais.',
          tip: 'O contador mostra quantos requisitos estão sendo exibidos do total filtrado.'
        }
      ]
    },
    {
      id: 'estimativa',
      title: 'Estimativa de Entrega',
      icon: Calculator,
      color: 'bg-teal-500',
      steps: [
        {
          title: 'Acessando a Estimativa de Entrega',
          description: 'No menu "Mais", clique em "Estimativa" para acessar a calculadora de prazo de entrega.',
          tip: 'Esta página ajuda a planejar quantos requisitos você precisa aprovar por dia.'
        },
        {
          title: 'Entendendo os Cards de Status',
          description: 'No topo, você vê: Obrigatórios Aprovados, Não Obrigatórios (Meta 85%), Obrigatórios Faltam e Total a Aprovar.',
          important: true,
          tip: 'A meta é aprovar 100% dos obrigatórios + 85% dos não obrigatórios.'
        },
        {
          title: 'Configurando a Data de Entrega',
          description: 'Selecione a data desejada para entrega e quantos dias você trabalha por semana (5, 6 ou 7 dias).',
          tip: 'O sistema calcula automaticamente os dias úteis até a data selecionada.'
        },
        {
          title: 'Cenário Otimista 🚀',
          description: 'Mostra o resultado se você aprovar 25% a mais por dia do que o necessário. Termina antes do prazo.',
          tip: 'Use este cenário como meta para ter folga no cronograma.'
        },
        {
          title: 'Cenário Realista 📊',
          description: 'Mostra exatamente quantos requisitos por dia você precisa aprovar para entregar na data selecionada.',
          important: true,
          tip: 'Este é o ritmo mínimo necessário para cumprir o prazo.'
        },
        {
          title: 'Cenário Pessimista ⚠️',
          description: 'Mostra o resultado se você aprovar 30% a menos por dia. Indica quanto tempo a mais seria necessário.',
          tip: 'Use para planejar contingências e comunicar riscos.'
        },
        {
          title: 'Barras de Progresso',
          description: 'Visualize o progresso atual de Obrigatórios e Não Obrigatórios com barras coloridas e percentuais.',
          tip: 'As barras atualizam em tempo real conforme você aprova requisitos na tabela.'
        },
        {
          title: 'Dicas para Atingir a Meta',
          description: 'O sistema mostra dicas personalizadas baseadas no seu cenário: ritmo necessário, prioridades e alertas.',
          tip: 'Preste atenção nos alertas vermelhos se a meta diária for muito alta.'
        },
        {
          title: 'Tabela de Metas Semanais',
          description: 'Veja um cronograma semanal com: Meta (requisitos por semana), Acumulado e Restante.',
          important: true,
          tip: 'Use esta tabela para acompanhar se você está no ritmo certo semana a semana.'
        },
        {
          title: 'Integração com Requisitos',
          description: 'Tudo é dinâmico! Quando você aprova um requisito na tabela de Requisitos, as estimativas atualizam automaticamente.',
          tip: 'Não precisa reimportar a planilha - os dados são sincronizados em tempo real.'
        }
      ]
    },
    {
      id: 'sprints',
      title: 'Gestão de Sprints e Backlog',
      icon: Calendar,
      color: 'bg-indigo-500',
      steps: [
        {
          title: 'Acessando a Gestão de Sprints',
          description: 'No menu superior, clique em "Sprints" para acessar a página de gestão de tarefas e sprints.',
          tip: 'Esta página funciona como um mini Jira/ClickUp dentro do TestWise.'
        },
        {
          title: 'Importando Testes para o Backlog',
          description: 'Testes pendentes e reprovados podem ser importados como tarefas. Clique em "Importar Testes" e selecione quais deseja trazer.',
          important: true,
          tip: 'As tarefas importadas mantêm o vínculo com o documento de teste original.'
        },
        {
          title: 'Criando Tarefas Manualmente',
          description: 'Clique em "Nova Tarefa" para criar uma tarefa do zero. Defina tipo (Bug, Regra de Negócio, Melhoria), prioridade e responsável.',
          tip: 'Você pode criar tarefas que não estão vinculadas a documentos de teste.'
        },
        {
          title: 'Criando Sprints',
          description: 'Clique em "Nova Sprint" para criar uma sprint. Defina nome, datas de início/fim e status (Planejamento, Ativa, Concluída).',
          tip: 'Apenas uma sprint pode estar ativa por vez.'
        },
        {
          title: 'Movendo Tarefas para Sprints',
          description: 'No menu de 3 pontinhos da tarefa, selecione "Mover para Sprint" e escolha a sprint desejada.',
          tip: 'Tarefas sem sprint ficam no Backlog.'
        },
        {
          title: 'Fluxo Dev ↔ QA nas Tarefas',
          description: 'Ao visualizar uma tarefa, você tem acesso ao sistema completo de comentários, evidências e solicitação de reteste.',
          important: true,
          tip: 'Tudo que você faz na tarefa é sincronizado com o documento de teste original.'
        }
      ]
    },
    {
      id: 'casos-teste',
      title: 'Casos de Teste',
      icon: ClipboardList,
      color: 'bg-cyan-500',
      steps: [
        {
          title: 'Acessando Casos de Teste',
          description: 'No menu superior, clique em "Casos de Teste" para acessar a página de gestão de casos de teste.',
          tip: 'Casos de teste são diferentes de documentos de teste - são cenários reutilizáveis.'
        },
        {
          title: 'Criando um Caso de Teste',
          description: 'Clique em "Novo Caso de Teste" e preencha: título, descrição, módulo, prioridade e os passos do teste.',
          tip: 'Defina passos claros com ação e resultado esperado.'
        },
        {
          title: 'Geração Automática de Gherkin',
          description: 'O sistema gera automaticamente o código Gherkin (Given/When/Then) baseado nos passos do caso de teste.',
          important: true,
          tip: 'Use o botão "Copiar Gherkin" para usar em ferramentas de automação.'
        },
        {
          title: 'Geração de Código Playwright',
          description: 'O sistema também gera código Playwright para automação de testes. Copie e adapte para seu projeto.',
          tip: 'O código gerado é um ponto de partida - ajuste seletores e lógica conforme necessário.'
        },
        {
          title: 'Executando um Caso de Teste',
          description: 'Clique no botão ▶️ (Play) para iniciar a execução do caso de teste. Você será levado para a tela de execução.',
          important: true,
          tip: 'A execução permite registrar o resultado de cada passo.'
        }
      ]
    },
    {
      id: 'execucao',
      title: 'Execução de Testes',
      icon: Play,
      color: 'bg-green-500',
      steps: [
        {
          title: 'Iniciando uma Execução',
          description: 'Na página de Casos de Teste, clique no botão ▶️ de um caso de teste para iniciar a execução.',
          tip: 'O cronômetro inicia automaticamente ao entrar na execução.'
        },
        {
          title: 'Executando os Passos',
          description: 'Para cada passo, registre o resultado obtido e marque como Passou ✓ ou Falhou ✗.',
          important: true,
          tip: 'Você pode adicionar evidências (imagens/vídeos) em cada passo.'
        },
        {
          title: 'Cronômetro de Execução',
          description: 'O cronômetro mostra o tempo total da execução. Ele para automaticamente ao finalizar todos os passos.',
          tip: 'O tempo é salvo junto com a execução para métricas de performance.'
        },
        {
          title: 'Salvando Progresso',
          description: 'Clique em "Salvar Progresso" para salvar a execução parcial. Você pode continuar depois de onde parou.',
          tip: 'O progresso é salvo automaticamente ao mudar de passo também.'
        },
        {
          title: 'Finalizando a Execução',
          description: 'Após executar todos os passos, clique em "Finalizar Execução". O status final (Passou/Falhou) é calculado automaticamente.',
          important: true,
          tip: 'Se qualquer passo falhou, a execução é marcada como Falhou.'
        }
      ]
    },
    {
      id: 'minhas-tarefas',
      title: 'Minhas Tarefas',
      icon: Users,
      color: 'bg-violet-500',
      steps: [
        {
          title: 'Acessando Minhas Tarefas',
          description: 'No menu superior, clique em "Minhas Tarefas" para ver todas as tarefas atribuídas a você.',
          tip: 'Esta página mostra apenas tarefas onde você é o responsável.'
        },
        {
          title: 'Visualizando Estatísticas',
          description: 'No topo da página, veja quantas tarefas você tem em cada status: Pendentes, Em Andamento, Em Revisão e Concluídas.',
          tip: 'Use essas métricas para priorizar seu trabalho.'
        },
        {
          title: 'Atualizando Status',
          description: 'Clique no dropdown de status de qualquer tarefa para atualizar rapidamente. Ou abra a tarefa para mais opções.',
          tip: 'Mantenha os status atualizados para que a equipe saiba o progresso.'
        },
        {
          title: 'Interagindo nas Tarefas',
          description: 'Ao abrir uma tarefa, você tem acesso ao sistema completo de comentários, evidências e solicitação de reteste.',
          important: true,
          tip: 'Tudo é sincronizado com o documento de teste original.'
        }
      ]
    },
    {
      id: 'darkmode',
      title: 'Dark Mode',
      icon: Moon,
      color: 'bg-slate-700',
      steps: [
        {
          title: 'Ativando o Dark Mode',
          description: 'Clique no ícone de sol/lua no canto superior direito da tela para alternar entre tema claro e escuro.',
          tip: 'Sua preferência é salva automaticamente.'
        },
        {
          title: 'Benefícios do Dark Mode',
          description: 'O tema escuro reduz a fadiga ocular em ambientes com pouca luz e pode economizar bateria em telas OLED.',
          tip: 'Experimente usar o Dark Mode à noite!'
        }
      ]
    },
    {
      id: 'dicas',
      title: 'Dicas e Boas Práticas',
      icon: Lightbulb,
      color: 'bg-amber-500',
      steps: [
        {
          title: 'Seja Específico no Título',
          description: 'Use títulos que descrevam exatamente o que foi testado. Ex: "Login com email inválido deve exibir mensagem de erro".',
          tip: 'Evite títulos genéricos como "Teste de login" ou "Bug na tela".'
        },
        {
          title: 'Documente o Ambiente',
          description: 'Sempre informe em qual ambiente o teste foi realizado (Homologação, Produção, etc.).',
          tip: 'Bugs podem se comportar diferente em ambientes distintos.'
        },
        {
          title: 'Anexe Evidências Claras',
          description: 'Screenshots devem mostrar claramente o problema. Destaque áreas importantes se necessário.',
          tip: 'Uma boa evidência vale mais que mil palavras.'
        },
        {
          title: 'Mantenha Comunicação no Sistema',
          description: 'Use os comentários e menções para toda comunicação sobre o teste. Isso mantém o histórico centralizado.',
          tip: 'Evite discutir detalhes do teste por outros canais (WhatsApp, email).'
        },
        {
          title: 'Atualize o Status Corretamente',
          description: 'Sempre atualize o status após cada ação. Isso mantém o dashboard e relatórios precisos.',
          tip: 'Status desatualizado gera confusão e retrabalho.'
        }
      ]
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tutorial e Ajuda</h1>
            <p className="text-gray-600">Aprenda a usar o TestWise</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon
          const isExpanded = expandedSection === section.id

          return (
            <div key={section.id} className="card overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${section.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">{section.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="mt-4 space-y-4">
                    {section.steps.map((step, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg ${step.important ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'}`}
                      >
                        <div className="flex items-start gap-3">
                          {section.id === 'fluxo' && step.role && (
                            <div className={`px-2 py-1 rounded text-xs font-medium ${
                              step.role === 'operacao' 
                                ? 'bg-purple-100 text-purple-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {step.role === 'operacao' ? 'Operação' : 'Dev'}
                            </div>
                          )}
                          {section.id === 'status' || section.id === 'categorias' ? (
                            <span className={`px-2 py-1 rounded text-xs font-medium ${step.badge}`}>
                              {step.title}
                            </span>
                          ) : (
                            <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-primary-600">{index + 1}</span>
                            </div>
                          )}
                          <div className="flex-1">
                            {section.id !== 'status' && section.id !== 'categorias' && (
                              <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
                            )}
                            <p className="text-gray-600 text-sm">{step.description}</p>
                            {step.tip && (
                              <div className="mt-2 flex items-start gap-2 text-sm">
                                <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span className="text-amber-700">{step.tip}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick Reference Card */}
      <div className="mt-8 card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 dark:from-primary-900/30 dark:to-primary-800/40 dark:border-primary-700/50">
        <div className="p-6">
          <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Referência Rápida
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span><strong>Aprovar Reteste:</strong> Correção validada com sucesso</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span><strong>Reprovar Reteste:</strong> Problema ainda persiste</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-500" />
              <span><strong>Solicitar Reteste:</strong> Dev pede nova validação</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-500" />
              <span><strong>Comentários:</strong> Comunicação entre equipes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
