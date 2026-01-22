const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fetch = require('node-fetch');

// Configurações do Jira (usar Firebase Config em produção)
const JIRA_CONFIG = {
  baseUrl: 'https://orquestraia.atlassian.net',
  projectKey: 'OH',
  email: process.env.JIRA_EMAIL || 'contato@orquestraia.com.br',
  apiToken: process.env.JIRA_API_TOKEN || ''
};

// Mapeamento de categoria para tipo de issue
const CATEGORY_TO_ISSUE_TYPE = {
  'bug': 'Bug',
  'melhoria': 'Task',
  'regra_negocio': 'Task'
};

/**
 * Cloud Function para criar issue no Jira
 */
exports.createJiraIssue = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const testData = req.body;
      
      if (!testData || !testData.title) {
        return res.status(400).json({ error: 'Dados do teste são obrigatórios' });
      }

      const issueType = CATEGORY_TO_ISSUE_TYPE[testData.category] || 'Task';
      const descriptionADF = buildDescriptionADF(testData);
      
      // Montar labels
      const labels = [];
      if (testData.category) labels.push(testData.category.replace('_', '-'));
      if (testData.status) labels.push(testData.status.replace('_', '-'));
      if (testData.module) labels.push(testData.module.toLowerCase().replace(/\s+/g, '-'));

      const issueData = {
        fields: {
          project: {
            key: JIRA_CONFIG.projectKey
          },
          summary: `[${(testData.category || 'TESTE').toUpperCase()}] ${testData.title}`,
          description: descriptionADF,
          issuetype: {
            name: issueType
          },
          labels: labels
        }
      };

      const auth = Buffer.from(`${JIRA_CONFIG.email}:${JIRA_CONFIG.apiToken}`).toString('base64');
      
      const response = await fetch(`${JIRA_CONFIG.baseUrl}/rest/api/3/issue`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(issueData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro Jira:', errorData);
        return res.status(response.status).json({ 
          error: 'Erro ao criar issue no Jira',
          details: errorData 
        });
      }

      const result = await response.json();
      
      return res.status(200).json({
        success: true,
        key: result.key,
        id: result.id,
        url: `${JIRA_CONFIG.baseUrl}/browse/${result.key}`
      });

    } catch (error) {
      console.error('Erro na função:', error);
      return res.status(500).json({ 
        error: 'Erro interno',
        message: error.message 
      });
    }
  });
});

/**
 * Cloud Function para adicionar comentário no Jira
 */
exports.addJiraComment = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { issueKey, comment } = req.body;
      
      if (!issueKey || !comment) {
        return res.status(400).json({ error: 'issueKey e comment são obrigatórios' });
      }

      const auth = Buffer.from(`${JIRA_CONFIG.email}:${JIRA_CONFIG.apiToken}`).toString('base64');
      
      const response = await fetch(`${JIRA_CONFIG.baseUrl}/rest/api/3/issue/${issueKey}/comment`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: comment
                  }
                ]
              }
            ]
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ 
          error: 'Erro ao adicionar comentário',
          details: errorData 
        });
      }

      const result = await response.json();
      return res.status(200).json({ success: true, data: result });

    } catch (error) {
      console.error('Erro na função:', error);
      return res.status(500).json({ 
        error: 'Erro interno',
        message: error.message 
      });
    }
  });
});

// Função auxiliar para criar um parágrafo ADF com texto
function createTextParagraph(text) {
  return {
    type: 'paragraph',
    content: [{ type: 'text', text: text }]
  };
}

// Função auxiliar para criar um link ADF
function createLink(text, url) {
  return {
    type: 'text',
    text: text,
    marks: [{ type: 'link', attrs: { href: url } }]
  };
}

// Função para construir a descrição em formato ADF (Atlassian Document Format)
function buildDescriptionADF(testData) {
  const content = [];
  
  // Informações básicas
  content.push(createTextParagraph(`📋 REQUISITO: ${testData.requirement || 'N/A'}`));
  if (testData.requirementDescription) {
    content.push(createTextParagraph(testData.requirementDescription));
  }
  
  content.push(createTextParagraph(`🏷️ CATEGORIA: ${getCategoryLabel(testData.category)}`));
  content.push(createTextParagraph(`📦 MÓDULO: ${testData.module || 'N/A'}`));
  content.push(createTextParagraph(`⚡ FEATURE: ${testData.feature || 'N/A'}`));
  content.push(createTextParagraph(`🔬 TIPO DE TESTE: ${testData.testType || 'N/A'}`));
  content.push(createTextParagraph(`⚠️ PRIORIDADE: ${testData.priority || 'N/A'}`));
  content.push(createTextParagraph(`👤 TESTADOR: ${testData.tester || 'N/A'}`));
  content.push(createTextParagraph(`🌐 AMBIENTE: ${testData.environment || 'N/A'}`));
  
  if (testData.category === 'bug' && testData.errorType) {
    content.push(createTextParagraph(`🐛 TIPO DE ERRO: ${testData.errorType}`));
  }
  
  if (testData.category === 'melhoria' && testData.improvement) {
    content.push(createTextParagraph(`💡 MELHORIA SUGERIDA: ${testData.improvement}`));
    if (testData.improvementJustification) {
      content.push(createTextParagraph(`📝 JUSTIFICATIVA: ${testData.improvementJustification}`));
    }
  }
  
  if (testData.preconditions) {
    content.push(createTextParagraph(`📌 PRÉ-CONDIÇÕES: ${testData.preconditions}`));
  }
  
  // Passos do teste
  if (testData.steps && testData.steps.length > 0) {
    content.push(createTextParagraph('📝 PASSOS DO TESTE:'));
    testData.steps.forEach((step, index) => {
      content.push(createTextParagraph(`${index + 1}. ${step.action || 'N/A'}`));
      content.push(createTextParagraph(`   ✅ Esperado: ${step.expectedResult || 'N/A'}`));
      content.push(createTextParagraph(`   📍 Obtido: ${step.actualResult || 'N/A'}`));
      content.push(createTextParagraph(`   Status: ${step.status || 'N/A'}`));
    });
  }
  
  if (testData.observations) {
    content.push(createTextParagraph(`📝 OBSERVAÇÕES: ${testData.observations}`));
  }
  
  // Evidências com links clicáveis
  if (testData.screenshots && testData.screenshots.length > 0) {
    content.push(createTextParagraph(`📎 EVIDÊNCIAS (${testData.screenshots.length}):`));
    
    testData.screenshots.forEach((media, index) => {
      const isVideo = media.mediaType === 'video' || 
        (media.name && /\.(mp4|webm|mov|avi|mkv|ogg)$/i.test(media.name)) ||
        (media.url && /\.(mp4|webm|mov|avi|mkv|ogg)/i.test(media.url));
      const icon = isVideo ? '🎬' : '🖼️';
      const type = isVideo ? 'Vídeo' : 'Imagem';
      const linkText = `${icon} ${type}: ${media.name || 'Evidência ' + (index + 1)}`;
      
      content.push({
        type: 'paragraph',
        content: [
          { type: 'text', text: `${index + 1}. ` },
          createLink(linkText, media.url)
        ]
      });
    });
  }
  
  return {
    type: 'doc',
    version: 1,
    content: content
  };
}

function getCategoryLabel(category) {
  const labels = {
    'bug': 'Bug',
    'melhoria': 'Melhoria',
    'regra_negocio': 'Regra de Negócio'
  };
  return labels[category] || category || 'N/A';
}
