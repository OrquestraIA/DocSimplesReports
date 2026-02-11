// AI Service para TestWise - Integração com OpenAI API
// Em apps Vite, variáveis de ambiente precisam começar com VITE_
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:3001/api';

class AIService {
  // Gerar casos de teste a partir de requisitos
  static async generateTestCases(requirements, module = null) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/generate-test-cases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requirements,
          module,
          existingTestCases: [] // Poderia passar casos existentes para evitar duplicação
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar casos de teste');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na geração de casos de teste:', error);
      throw error;
    }
  }

  // Analisar evidências e classificar criticidade
  static async analyzeEvidence(evidenceData) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/analyze-evidence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ evidenceData })
      });

      if (!response.ok) {
        throw new Error('Falha ao analisar evidências');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na análise de evidências:', error);
      throw error;
    }
  }

  // Sugerir prioridades para tarefas
  static async suggestTaskPriorities(tasks, requirements = []) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/suggest-priorities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          tasks,
          requirements,
          teamCapacity: 5 // Poderia ser dinâmico
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao sugerir prioridades');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na sugestão de prioridades:', error);
      throw error;
    }
  }

  // Gerar passos de teste a partir de descrição
  static async generateTestSteps(description) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/generate-steps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description })
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar passos do teste');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na geração de passos:', error);
      throw error;
    }
  }

  // Gerar detalhes completos de tarefa (título, descrição, tags, estimativa)
  static async generateTaskDetails({ description, type = 'improvement', priority = 'medium', existingTasks = [] }) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/generate-task-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, type, priority, existingTasks })
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar tarefa com IA');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na geração de tarefa com IA:', error);
      throw error;
    }
  }

  // Gerar documento de teste completo
  static async generateTestDocument({ description, testType, priority }) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/generate-test-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, testType, priority })
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar documento de teste');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na geração de documento de teste:', error);
      throw error;
    }
  }
}

export default AIService;
