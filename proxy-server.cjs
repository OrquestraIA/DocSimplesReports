// Servidor proxy local para integração com Jira
// Executa: node proxy-server.js

const http = require('http');
const https = require('https');

const JIRA_CONFIG = {
  baseUrl: 'orquestraia.atlassian.net',
  projectKey: 'OH',
  email: process.env.JIRA_EMAIL || 'contato@orquestraia.com.br',
  apiToken: process.env.JIRA_API_TOKEN || ''
};

const CATEGORY_TO_ISSUE_TYPE = {
  'bug': 'Bug',
  'melhoria': 'Task',
  'regra_negocio': 'Task'
};

function buildDescription(testData) {
  let desc = '';
  desc += `📋 REQUISITO: ${testData.requirement || 'N/A'}\n`;
  if (testData.requirementDescription) desc += `${testData.requirementDescription}\n`;
  desc += '\n';
  desc += `🏷️ CATEGORIA: ${testData.category || 'N/A'}\n`;
  desc += `📦 MÓDULO: ${testData.module || 'N/A'}\n`;
  desc += `⚡ FEATURE: ${testData.feature || 'N/A'}\n`;
  desc += `🔬 TIPO DE TESTE: ${testData.testType || 'N/A'}\n`;
  desc += `⚠️ PRIORIDADE: ${testData.priority || 'N/A'}\n`;
  desc += `👤 TESTADOR: ${testData.tester || 'N/A'}\n`;
  desc += `🌐 AMBIENTE: ${testData.environment || 'N/A'}\n\n`;
  
  if (testData.category === 'bug' && testData.errorType) {
    desc += `🐛 TIPO DE ERRO: ${testData.errorType}\n\n`;
  }
  if (testData.category === 'melhoria' && testData.improvement) {
    desc += `💡 MELHORIA: ${testData.improvement}\n`;
    if (testData.improvementJustification) desc += `📝 JUSTIFICATIVA: ${testData.improvementJustification}\n`;
    desc += '\n';
  }
  if (testData.preconditions) desc += `📌 PRÉ-CONDIÇÕES:\n${testData.preconditions}\n\n`;
  if (testData.steps && testData.steps.length > 0) {
    desc += `📝 PASSOS DO TESTE:\n`;
    testData.steps.forEach((step, i) => {
      desc += `${i+1}. ${step.action || 'N/A'}\n   ✅ Esperado: ${step.expectedResult || 'N/A'}\n   📍 Obtido: ${step.actualResult || 'N/A'}\n`;
    });
  }
  if (testData.observations) desc += `\n📝 OBSERVAÇÕES:\n${testData.observations}\n`;
  return desc;
}

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/createJiraIssue') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const testData = JSON.parse(body);
        const issueType = CATEGORY_TO_ISSUE_TYPE[testData.category] || 'Task';
        const description = buildDescription(testData);
        
        const labels = [];
        if (testData.category) labels.push(testData.category.replace('_', '-'));
        if (testData.module) labels.push(testData.module.toLowerCase().replace(/\s+/g, '-'));

        const issueData = JSON.stringify({
          fields: {
            project: { key: JIRA_CONFIG.projectKey },
            summary: `[${(testData.category || 'TESTE').toUpperCase()}] ${testData.title}`,
            description: {
              type: 'doc',
              version: 1,
              content: [{ type: 'paragraph', content: [{ type: 'text', text: description }] }]
            },
            issuetype: { name: issueType },
            labels: labels
          }
        });

        const auth = Buffer.from(`${JIRA_CONFIG.email}:${JIRA_CONFIG.apiToken}`).toString('base64');
        
        const options = {
          hostname: JIRA_CONFIG.baseUrl,
          port: 443,
          path: '/rest/api/3/issue',
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(issueData)
          }
        };

        const jiraReq = https.request(options, (jiraRes) => {
          let data = '';
          jiraRes.on('data', chunk => data += chunk);
          jiraRes.on('end', () => {
            try {
              const result = JSON.parse(data);
              if (jiraRes.statusCode >= 200 && jiraRes.statusCode < 300) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                  success: true,
                  key: result.key,
                  id: result.id,
                  url: `https://${JIRA_CONFIG.baseUrl}/browse/${result.key}`
                }));
                console.log(`✅ Issue criada: ${result.key}`);
              } else {
                res.writeHead(jiraRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Erro no Jira', details: result }));
                console.log(`❌ Erro Jira:`, result);
              }
            } catch (e) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Erro ao parsear resposta', message: e.message }));
            }
          });
        });

        jiraReq.on('error', (e) => {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Erro de conexão', message: e.message }));
          console.log(`❌ Erro conexão:`, e.message);
        });

        jiraReq.write(issueData);
        jiraReq.end();
        
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'JSON inválido', message: e.message }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = 5001;
server.listen(PORT, () => {
  console.log(`🚀 Proxy Jira rodando em http://localhost:${PORT}`);
  console.log(`   POST /createJiraIssue - Cria issue no Jira`);
});
