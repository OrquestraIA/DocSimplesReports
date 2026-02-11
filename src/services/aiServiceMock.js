// Versão Mock da AIService para testes imediatos
class AIServiceMock {
  // Gerar casos de teste simulados
  static async generateTestCases(requirements, module = null) {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockTestCases = requirements.map((req, index) => ({
      title: `CT-${String(index + 1).padStart(3, '0')}: ${req}`,
      description: `Validar o funcionamento do requisito: ${req}`,
      preconditions: `Usuário logado no sistema com permissões adequadas`,
      priority: index % 3 === 0 ? 'high' : index % 2 === 0 ? 'medium' : 'low',
      steps: [
        {
          action: `Acessar a funcionalidade de ${req}`,
          expectedResult: "Tela é carregada corretamente"
        },
        {
          action: `Preencher os campos obrigatórios para ${req}`,
          expectedResult: "Sistema aceita os dados informados"
        },
        {
          action: `Confirmar a operação de ${req}`,
          expectedResult: `${req} é executado com sucesso e mensagem de confirmação é exibida`
        }
      ]
    }));
    
    return mockTestCases;
  }

  // Gerar documento de teste completo com IA
  static async generateTestDocument({ description, testType, priority }) {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Extrair informações da descrição
    const keywords = description.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const hasLogin = keywords.some(k => ['login', 'acesso', 'senha', 'autenticação'].includes(k));
    const hasError = keywords.some(k => ['erro', 'inválido', 'incorreto', 'falha'].includes(k));
    const hasRecovery = keywords.some(k => ['recuperação', 'esqueci', 'redefinir'].includes(k));
    
    // Gerar título baseado no tipo e descrição
    let title = '';
    let requirement = '';
    let feature = '';
    let module = '';
    
    if (hasLogin) {
      title = `Teste de Autenticação - Login e Acesso ao Sistema`;
      requirement = 'REQ-001: Usuário deve poder acessar o sistema com credenciais válidas';
      feature = 'Autenticação de Usuários';
      module = 'Segurança';
    } else if (hasRecovery) {
      title = `Teste de Recuperação de Senha`;
      requirement = 'REQ-002: Usuário deve poder recuperar senha de acesso';
      feature = 'Recuperação de Conta';
      module = 'Segurança';
    } else {
      title = `Teste de ${testType.charAt(0).toUpperCase() + testType.slice(1)} - ${description.substring(0, 50).trim()}...`;
      requirement = `REQ-${String(Math.floor(Math.random() * 900) + 100)}: ${description.substring(0, 80).trim()}...`;
      feature = keywords[0] ? keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1) : 'Funcionalidade';
      module = keywords[1] ? keywords[1].charAt(0).toUpperCase() + keywords[1].slice(1) : 'Geral';
    }

    // Gerar passos de teste baseados no contexto
    let steps = [];
    if (hasLogin) {
      steps = [
        {
          action: 'Acessar página de login do sistema',
          expectedResult: 'Página de login é exibida com campos de email e senha',
          actualResult: '',
          status: 'pendente'
        },
        {
          action: 'Preencher email válido e senha correta',
          expectedResult: 'Campos são preenchidos sem erros',
          actualResult: '',
          status: 'pendente'
        },
        {
          action: 'Clicar no botão "Entrar"',
          expectedResult: 'Usuário é autenticado e redirecionado para o dashboard',
          actualResult: '',
          status: 'pendente'
        }
      ];
      
      if (hasError) {
        steps.push({
          action: 'Tentar login com senha incorreta',
          expectedResult: 'Mensagem de erro é exibida informando credenciais inválidas',
          actualResult: '',
          status: 'pendente'
        });
      }
      
      if (hasRecovery) {
        steps.push({
          action: 'Clicar em "Esqueci minha senha"',
          expectedResult: 'Formulário de recuperação de senha é exibido',
          actualResult: '',
          status: 'pendente'
        });
      }
    } else {
      steps = [
        {
          action: `Acessar funcionalidade de ${feature}`,
          expectedResult: 'Tela é carregada corretamente',
          actualResult: '',
          status: 'pendente'
        },
        {
          action: 'Executar ação principal do teste',
          expectedResult: 'Ação é executada conforme esperado',
          actualResult: '',
          status: 'pendente'
        },
        {
          action: 'Validar resultado da operação',
          expectedResult: 'Sistema apresenta resultado esperado',
          actualResult: '',
          status: 'pendente'
        }
      ];
    }

    // Determinar ambiente baseado no tipo de teste
    let environment = '';
    switch (testType) {
      case 'funcional':
        environment = 'Chrome 120+ / Windows 11 / Ambiente de Homologação';
        break;
      case 'performance':
        environment = 'Chrome 120+ / Windows 11 / Network throttling 3G';
        break;
      case 'seguranca':
        environment = 'Chrome 120+ / Windows 11 / OWASP ZAP integration';
        break;
      case 'usabilidade':
        environment = 'Chrome 120+ / Windows 11 / Screen reader enabled';
        break;
      default:
        environment = 'Chrome 120+ / Windows 11 / Ambiente de Teste';
    }

    return {
      title: title,
      requirement: requirement,
      requirementDescription: description,
      feature: feature,
      module: module,
      testType: testType,
      priority: priority,
      environment: environment,
      category: testType === 'funcional' ? 'regra_negocio' : 'melhoria',
      errorType: hasError ? 'funcional' : '',
      improvement: testType === 'performance' ? 'Otimizar performance da funcionalidade' : '',
      improvementJustification: testType === 'performance' ? 'Melhorar experiência do usuário' : '',
      preconditions: `Usuário deve ter acesso ao ambiente de teste\nSistema deve estar online e funcional\nDados de teste devem estar disponíveis`,
      steps: steps,
      observations: `Teste automatizado validando ${testType} da funcionalidade.\n\nObservações importantes:\n- Validar comportamento em diferentes navegadores\n- Verificar responsividade em dispositivos móveis\n- Testar com diferentes perfis de usuário\n- Validar tratamento de erros e exceções`,
      evidences: 'Prints de tela de cada passo\nVídeo da execução completa\nLogs do console do navegador',
      elements: [
        { name: 'Botão Entrar', selector: '#btn-login', type: 'button' },
        { name: 'Campo Email', selector: '#email', type: 'input' },
        { name: 'Campo Senha', selector: '#password', type: 'input' }
      ]
    };
  }

  // Gerar detalhes de tarefa com IA
  static async generateTaskDetails({ description, type, priority, existingTasks = [] }) {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Extrair palavras-chave da descrição
    const keywords = description.toLowerCase().match(/\b\w{4,}\b/g) || [];
    
    // Gerar título baseado no tipo e descrição
    let title = '';
    if (type === 'bug') {
      title = `[Bug] ${description.substring(0, 60).trim()}...`;
    } else if (type === 'improvement') {
      title = `[Melhoria] ${description.substring(0, 60).trim()}...`;
    } else {
      title = `[Regra] ${description.substring(0, 60).trim()}...`;
    }

    // Gerar tags baseadas em keywords
    const tags = keywords.slice(0, 3).map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
    // Estimativa de horas baseada na complexidade
    const complexity = description.length > 200 ? 'high' : description.length > 100 ? 'medium' : 'low';
    const estimatedHours = complexity === 'high' ? 8 : complexity === 'medium' ? 4 : 2;

    // Gerar descrição detalhada
    const detailedDescription = `**Descrição Original:**\n${description}\n\n**Contexto:**\nTarefa identificada como necessária para melhoria do sistema. Análise baseada em padrões observados em tarefas similares.\n\n**Critérios de Aceitação:**\n- [ ] Funcionalidade implementada conforme descrito\n- [ ] Testes realizados e aprovados\n- [ ] Documentação atualizada\n- [ ] Deploy em ambiente de homologação\n\n**Notas Técnicas:**\nPrioridade definida como ${priority} baseada no impacto no negócio. Estimativa de ${estimatedHours} horas para conclusão.`;

    return {
      title: title,
      description: detailedDescription,
      tags: tags,
      estimatedHours: estimatedHours,
      priority: priority
    };
  }

  // Outros métodos mock...
  static async analyzeEvidence(evidenceData) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      analysis: [
        {
          evidenceId: evidenceData[0]?.id || 'mock',
          severity: 'medium',
          category: 'functional',
          description: 'Análise simulada da evidência',
          recommendation: 'Revisar implementação'
        }
      ],
      summary: 'Análise mock concluída'
    };
  }

  static async suggestTaskPriorities(tasks, requirements = [], teamCapacity = 5) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      prioritizedTasks: tasks.map((task, index) => ({
        taskId: task.id,
        suggestedPriority: index % 3 === 0 ? 'high' : 'medium',
        reason: 'Prioridade baseada em análise mock',
        estimatedEffort: 8,
        suggestedSprint: 1
      })),
      recommendations: 'Prioridades mock sugeridas'
    };
  }

  static async generateTestSteps(description) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      title: `Teste: ${description}`,
      preconditions: "Sistema disponível e usuário logado",
      steps: [
        {
          action: `Executar ação principal: ${description}`,
          expectedResult: "Ação é executada com sucesso"
        },
        {
          action: "Validar resultado da ação",
          expectedResult: "Resultado conforme esperado"
        }
      ]
    };
  }
}

export default AIServiceMock;
