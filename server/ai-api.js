// Backend API para integração com OpenAI
require('dotenv').config(); // Carregar variáveis de ambiente do .env
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Função para gerar casos de teste
async function generateTestCases(requirements, module = null) {
  const prompt = `
Como especialista em QA, gere casos de teste detalhados para os seguintes requisitos:

${requirements.map((req, index) => `${index + 1}. ${req}`).join('\n')}

${module ? `Módulo: ${module}` : ''}

Para cada requisito, crie um caso de teste completo com:
- Título claro e descritivo
- Descrição do objetivo
- Pré-condições (se aplicável)
- Passos detalhados (mínimo 3 passos)
- Resultado esperado para cada passo
- Prioridade (critical, high, medium, low)

Retorne em formato JSON array:
[
  {
    "title": "Título do caso de teste",
    "description": "Descrição do objetivo",
    "preconditions": "Pré-condições se aplicável",
    "priority": "medium",
    "steps": [
      {
        "action": "Ação a ser executada",
        "expectedResult": "Resultado esperado"
      }
    ]
  }
]
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em Quality Assurance com vasta experiência em criação de casos de teste para sistemas web. Sempre gere casos de teste completos, detalhados e executáveis."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_completion_tokens: 2000
    });

    const response = completion.choices[0].message.content;
    
    // Extrair JSON da resposta
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Não foi possível extrair JSON da resposta');
  } catch (error) {
    console.error('Erro na API OpenAI:', error);
    throw error;
  }
}

// Função para analisar evidências
async function analyzeEvidence(evidenceData) {
  const prompt = `
Como especialista em QA, analise as seguintes evidências de teste e classifique sua criticidade:

Evidências: ${JSON.stringify(evidenceData, null, 2)}

Classifique cada evidência como:
- critical: Falha crítica que impede o funcionamento principal
- high: Falha importante com impacto significativo
- medium: Falha moderada com impacto limitado
- low: Falha menor ou questão estética

Retorne em formato JSON:
{
  "analysis": [
    {
      "evidenceId": "id",
      "severity": "critical|high|medium|low",
      "category": "functional|ui|performance|security",
      "description": "Descrição da análise",
      "recommendation": "Recomendação de ação"
    }
  ],
  "summary": "Resumo geral das evidências"
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em análise de defeitos de software com foco em avaliação de impacto e criticidade."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_completion_tokens: 1000
    });

    const response = completion.choices[0].message.content;
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Não foi possível extrair JSON da resposta');
  } catch (error) {
    console.error('Erro na análise de evidências:', error);
    throw error;
  }
}

// Função para sugerir prioridades
async function suggestTaskPriorities(tasks, requirements = [], teamCapacity = 5) {
  const prompt = `
Como gerente de projetos ágeis, analise as seguintes tarefas e sugira prioridades baseadas em:

Tarefas: ${JSON.stringify(tasks, null, 2)}
Requisitos: ${JSON.stringify(requirements, null, 2)}
Capacidade da equipe: ${teamCapacity} pessoas/sprint

Considere:
- Impacto no negócio
- Dependências entre tarefas
- Esforço estimado
- Riscos associados
- Valor para o cliente

Retorne em formato JSON:
{
  "prioritizedTasks": [
    {
      "taskId": "id",
      "suggestedPriority": "critical|high|medium|low",
      "reason": "Motivo da prioridade",
      "estimatedEffort": "horas",
      "suggestedSprint": "número do sprint"
    }
  ],
  "recommendations": "Recomendações gerais para o sprint"
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        {
          role: "system",
          content: "Você é um gerente de projetos experiente com especialização em metodologias ágeis e gestão de backlog."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.4,
      max_completion_tokens: 1500
    });

    const response = completion.choices[0].message.content;
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Não foi possível extrair JSON da resposta');
  } catch (error) {
    console.error('Erro na sugestão de prioridades:', error);
    throw error;
  }
}

// Função para gerar passos de teste
async function generateTestSteps(description) {
  const prompt = `
Como especialista em QA, gere passos detalhados para o seguinte caso de teste:

Descrição: ${description}

Crie passos que sejam:
- Claros e objetivos
- Executáveis
- Com resultados esperados mensuráveis
- Em ordem lógica

Retorne em formato JSON:
{
  "title": "Título sugerido",
  "preconditions": "Pré-condições necessárias",
  "steps": [
    {
      "action": "Ação específica",
      "expectedResult": "Resultado esperado claro"
    }
  ]
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em criação de casos de teste com foco em clareza e executabilidade."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
      max_completion_tokens: 1000
    });

    const response = completion.choices[0].message.content;
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Não foi possível extrair JSON da resposta');
  } catch (error) {
    console.error('Erro na geração de passos:', error);
    throw error;
  }
}

// Função para gerar detalhes completos de tarefas
async function generateTaskDetails({ description, type = 'improvement', priority = 'medium', existingTasks = [] }) {
  const prompt = `
Como especialista em gestão ágil, gere uma tarefa detalhada a partir das informações abaixo.

Descrição informada:
${description}

Tipo da tarefa: ${type}
Prioridade: ${priority}

Contexto (últimas tarefas do backlog):
${JSON.stringify(existingTasks.slice(0, 5), null, 2)}

Produza um JSON com:
{
  "title": "Título curto e claro seguindo o padrão [Bug], [Melhoria] ou [Regra]",
  "description": "Descrição estruturada com contexto, critérios de aceitação e notas técnicas em Markdown",
  "tags": ["lista de 2-4 palavras-chave"],
  "estimatedHours": número inteiro de horas (2, 4, 8 ou 16),
  "priority": "critical|high|medium|low"
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em planejamento ágil e criação de tarefas detalhadas para times de desenvolvimento de software."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.6,
      max_completion_tokens: 1200
    });

    const response = completion.choices[0].message.content;
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Não foi possível extrair JSON da resposta');
  } catch (error) {
    console.error('Erro na geração de detalhes da tarefa:', error);
    throw error;
  }
}

// Função para gerar documento de teste completo
async function generateTestDocument(description, testType, priority) {
  const prompt = `
Como especialista em QA, gere um documento de teste completo e detalhado com base nas seguintes informações:

Descrição do teste: ${description}
Tipo de teste: ${testType}
Prioridade: ${priority}

Crie um documento completo com:
1. Título claro e descritivo
2. Requisito associado (formato REQ-XXX)
3. Funcionalidade e módulo
4. Pré-condições detalhadas
5. Passos de teste (mínimo 3 passos)
6. Ambiente de teste adequado
7. Categoria apropriada
8. Observações relevantes
9. Elementos de teste (botões, campos, etc.)

Retorne em formato JSON:
{
  "title": "Título do teste",
  "requirement": "REQ-XXX: Descrição do requisito",
  "requirementDescription": "Descrição detalhada do requisito",
  "feature": "Funcionalidade testada",
  "module": "Módulo do sistema",
  "testType": "tipo de teste",
  "priority": "prioridade",
  "environment": "Ambiente de teste",
  "category": "categoria",
  "errorType": "tipo de erro (se aplicável)",
  "improvement": "descrição da melhoria (se aplicável)",
  "improvementJustification": "justificativa (se aplicável)",
  "preconditions": "Pré-condições detalhadas",
  "steps": [
    {
      "action": "Ação a ser executada",
      "expectedResult": "Resultado esperado",
      "actualResult": "",
      "status": "pendente"
    }
  ],
  "observations": "Observações importantes",
  "evidences": "Tipos de evidências necessárias",
  "elements": [
    {
      "name": "Nome do elemento",
      "selector": "seletor CSS",
      "type": "tipo de elemento"
    }
  ]
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em Quality Assurance com vasta experiência em criação de documentos de teste completos e detalhados para sistemas web. Sempre gere documentos profissionais e executáveis."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_completion_tokens: 2500
    });

    const response = completion.choices[0].message.content;
    
    // Extrair JSON da resposta
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Não foi possível extrair JSON da resposta');
  } catch (error) {
    console.error('Erro na geração de documento de teste:', error);
    throw error;
  }
}

// Endpoints da API
app.post('/api/ai/generate-test-cases', async (req, res) => {
  try {
    const { requirements, module } = req.body;
    
    if (!requirements || requirements.length === 0) {
      return res.status(400).json({ error: 'Requisitos são obrigatórios' });
    }

    const testCases = await generateTestCases(requirements, module);
    res.json(testCases);
  } catch (error) {
    console.error('Erro ao gerar casos de teste:', error);
    res.status(500).json({ error: 'Erro ao gerar casos de teste' });
  }
});

app.post('/api/ai/analyze-evidence', async (req, res) => {
  try {
    const { evidenceData } = req.body;
    
    if (!evidenceData) {
      return res.status(400).json({ error: 'Dados da evidência são obrigatórios' });
    }

    const analysis = await analyzeEvidence(evidenceData);
    res.json(analysis);
  } catch (error) {
    console.error('Erro ao analisar evidências:', error);
    res.status(500).json({ error: 'Erro ao analisar evidências' });
  }
});

app.post('/api/ai/suggest-priorities', async (req, res) => {
  try {
    const { tasks, requirements, teamCapacity } = req.body;
    
    if (!tasks || tasks.length === 0) {
      return res.status(400).json({ error: 'Tarefas são obrigatórias' });
    }

    const priorities = await suggestTaskPriorities(tasks, requirements, teamCapacity);
    res.json(priorities);
  } catch (error) {
    console.error('Erro ao sugerir prioridades:', error);
    res.status(500).json({ error: 'Erro ao sugerir prioridades' });
  }
});

app.post('/api/ai/generate-steps', async (req, res) => {
  try {
    const { description } = req.body;
    
    if (!description) {
      return res.status(400).json({ error: 'Descrição é obrigatória' });
    }

    const steps = await generateTestSteps(description);
    res.json(steps);
  } catch (error) {
    console.error('Erro ao gerar passos:', error);
    res.status(500).json({ error: 'Erro ao gerar passos' });
  }
});

app.post('/api/ai/generate-test-document', async (req, res) => {
  try {
    const { description, testType, priority } = req.body;
    
    if (!description) {
      return res.status(400).json({ error: 'Descrição é obrigatória' });
    }

    const testDocument = await generateTestDocument(description, testType, priority);
    res.json(testDocument);
  } catch (error) {
    console.error('Erro ao gerar documento de teste:', error);
    res.status(500).json({ error: 'Erro ao gerar documento de teste' });
  }
});

app.post('/api/ai/generate-task-details', async (req, res) => {
  try {
    const { description, type, priority, existingTasks } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Descrição é obrigatória' });
    }

    const taskDetails = await generateTaskDetails({ description, type, priority, existingTasks });
    res.json(taskDetails);
  } catch (error) {
    console.error('Erro ao gerar tarefa com IA:', error);
    res.status(500).json({ error: 'Erro ao gerar tarefa com IA' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor AI API rodando na porta ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
