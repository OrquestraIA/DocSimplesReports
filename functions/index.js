const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const fetch = require('node-fetch');

// Inicializar firebase-admin (uma única vez)
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

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

// Configuração do Nodemailer (usar variáveis de ambiente)
const nodemailer = require('nodemailer');

// Configuração padrão para Outlook/Office 365
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
};

/**
 * Cloud Function para enviar email de notificação de tarefa atribuída
 */
exports.sendTaskAssignmentEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { task, assignee, assignedBy } = req.body;
      
      if (!task || !assignee || !assignee.email) {
        return res.status(400).json({ error: 'task e assignee.email são obrigatórios' });
      }

      // Criar transporter
      const transporter = nodemailer.createTransport(EMAIL_CONFIG);

      // Tipo da tarefa
      const taskTypeLabels = {
        'bug': '🐛 Bug',
        'business_rule': '📋 Regra de Negócio',
        'improvement': '💡 Melhoria'
      };
      const taskTypeLabel = taskTypeLabels[task.type] || task.type;

      // Prioridade
      const priorityLabels = {
        'low': '🟢 Baixa',
        'medium': '🟡 Média',
        'high': '🟠 Alta',
        'critical': '🔴 Crítica'
      };
      const priorityLabel = priorityLabels[task.priority] || task.priority;

      // HTML do email
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .task-card { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-right: 8px; }
            .badge-bug { background: #fee2e2; color: #dc2626; }
            .badge-improvement { background: #dbeafe; color: #2563eb; }
            .badge-business_rule { background: #f3e8ff; color: #9333ea; }
            .badge-priority { background: #fef3c7; color: #d97706; }
            .description { background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 15px 0; white-space: pre-wrap; }
            .footer { padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
            .btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📋 Nova Tarefa Atribuída</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">DocSimples Reports - Gestão de Tarefas</p>
            </div>
            <div class="content">
              <p>Olá <strong>${assignee.name || assignee.email}</strong>,</p>
              <p>Uma nova tarefa foi atribuída a você${assignedBy ? ` por <strong>${assignedBy}</strong>` : ''}:</p>
              
              <div class="task-card">
                <h2 style="margin: 0 0 15px 0; color: #1f2937;">${task.title}</h2>
                <div style="margin-bottom: 15px;">
                  <span class="badge badge-${task.type}">${taskTypeLabel}</span>
                  <span class="badge badge-priority">${priorityLabel}</span>
                </div>
                ${task.description ? `<div class="description">${task.description}</div>` : ''}
              </div>

              <p>Acesse o sistema para ver mais detalhes e atualizar o status da tarefa.</p>
              
              <a href="https://orquestraia.github.io/DocSimplesReports/#/minhas-tarefas" class="btn">
                Ver Minhas Tarefas
              </a>
            </div>
            <div class="footer">
              <p>Este é um email automático do DocSimples Reports.</p>
              <p>© ${new Date().getFullYear()} OrquestraIA - Todos os direitos reservados</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Enviar email
      const mailOptions = {
        from: `"DocSimples Reports" <${EMAIL_CONFIG.auth.user}>`,
        to: assignee.email,
        subject: `📋 Nova Tarefa: ${task.title}`,
        html: htmlContent
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ 
        success: true, 
        message: 'Email enviado com sucesso' 
      });

    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return res.status(500).json({
        error: 'Erro ao enviar email',
        message: error.message
      });
    }
  });
});

// ============================================================
// Helpers para triggers Firestore
// ============================================================

/**
 * Busca todos os usuários com role === 'qa'
 */
async function getQaUsers() {
  // Buscar role 'qa' e 'QA' para cobrir variações de capitalização
  const [snapLower, snapUpper] = await Promise.all([
    db.collection('users').where('role', '==', 'qa').get(),
    db.collection('users').where('role', '==', 'QA').get()
  ]);
  const seen = new Set();
  const users = [];
  for (const snap of [snapLower, snapUpper]) {
    for (const d of snap.docs) {
      if (!seen.has(d.id)) {
        seen.add(d.id);
        users.push({ id: d.id, ...d.data() });
      }
    }
  }
  return users;
}

/**
 * Cria uma notificação de nova_tarefa para um usuário QA
 */
async function createNovaTarefaNotification({ targetUserId, targetEmail, authorEmail, taskId, title, sourceCollection }) {
  const link = sourceCollection === 'testDocuments'
    ? `/#/documentos`
    : `/#/espacos?taskId=${taskId}`;
  await db.collection('notifications').add({
    type: 'nova_tarefa',
    message: `Nova tarefa criada: "${title}"`,
    targetUserId,
    targetEmail,
    authorEmail: authorEmail || '',
    taskId: taskId || '',
    sourceCollection: sourceCollection || '',
    link,
    read: false,
    createdAt: new Date().toISOString()
  });
}

/**
 * Cria uma notificação de mencao para um usuário mencionado
 */
async function createMencaoNotification({ targetUserId, targetEmail, authorEmail, taskId, commentText, sourceCollection }) {
  const preview = (commentText || '').slice(0, 100);
  const link = sourceCollection === 'testDocuments'
    ? `/#/documentos`
    : `/#/espacos?taskId=${taskId}`;
  await db.collection('notifications').add({
    type: 'mencao',
    message: `${authorEmail} mencionou você: "${preview}"`,
    targetUserId,
    targetEmail,
    authorEmail: authorEmail || '',
    taskId: taskId || '',
    sourceCollection: sourceCollection || '',
    link,
    read: false,
    createdAt: new Date().toISOString()
  });
}

/**
 * Extrai menções (@palavra) de um texto
 */
function extractMentions(text) {
  const matches = [];
  const regex = /@(\w+)/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    matches.push(m[1].toLowerCase());
  }
  return [...new Set(matches)];
}

/**
 * Detecta comentários novos comparando before/after
 */
function getNewComments(beforeComments, afterComments) {
  const beforeIds = new Set((beforeComments || []).map(c => c.id));
  return (afterComments || []).filter(c => !beforeIds.has(c.id));
}

/**
 * Processa menções nos comentários novos de um documento
 */
async function processMentions(newComments, docId, sourceCollection) {
  for (const comment of newComments) {
    const text = comment.text || comment.content || comment.message || '';
    console.log(`[processMentions] texto do comentário: "${text}"`);

    const mentions = extractMentions(text);
    console.log(`[processMentions] menções encontradas:`, mentions);

    if (mentions.length === 0) continue;

    const authorEmail = comment.authorEmail || comment.userEmail || '';
    const authorId = comment.authorId || comment.userId || '';

    for (const mentionName of mentions) {
      console.log(`[processMentions] buscando usuário com mentionName: "${mentionName}"`);
      const snap = await db.collection('users').where('mentionName', '==', mentionName).limit(1).get();
      console.log(`[processMentions] resultado da busca: ${snap.size} usuário(s)`);

      if (snap.empty) {
        console.log(`[processMentions] nenhum usuário encontrado para @${mentionName}`);
        continue;
      }

      const mentionedUser = snap.docs[0].data();
      const mentionedUid = snap.docs[0].id;
      console.log(`[processMentions] usuário encontrado: ${mentionedUser.email} (uid: ${mentionedUid})`);

      if (authorEmail && mentionedUser.email === authorEmail) {
        console.log(`[processMentions] pulando auto-menção por email`);
        continue;
      }
      if (authorId && mentionedUid === authorId) {
        console.log(`[processMentions] pulando auto-menção por uid`);
        continue;
      }

      console.log(`[processMentions] criando notificação para ${mentionedUser.email}`);
      await createMencaoNotification({
        targetUserId: mentionedUid,
        targetEmail: mentionedUser.email,
        authorEmail: authorEmail || comment.author || '',
        taskId: docId,
        commentText: text,
        sourceCollection
      });
      console.log(`[processMentions] notificação criada com sucesso`);
    }
  }
}

// ============================================================
// Trigger 1: Nova tarefa criada em testDocuments → notificar QA
// ============================================================
exports.notifyQaOnNewTestDocument = functions.firestore
  .document('testDocuments/{docId}')
  .onCreate(async (snap, context) => {
    try {
      const data = snap.data();
      const title = data.title || data.feature || 'Documento de Teste';
      const authorEmail = data.tester || data.authorEmail || data.createdBy || '';
      const docId = context.params.docId;

      const qaUsers = await getQaUsers();
      const notifyPromises = qaUsers
        .filter(u => u.email !== authorEmail) // não notificar o próprio criador se for QA
        .map(u => createNovaTarefaNotification({
          targetUserId: u.id || u.uid,
          targetEmail: u.email,
          authorEmail,
          taskId: docId,
          title,
          sourceCollection: 'testDocuments'
        }));

      await Promise.all(notifyPromises);
      console.log(`[notifyQaOnNewTestDocument] ${notifyPromises.length} notificações criadas para doc ${docId}`);
    } catch (err) {
      console.error('[notifyQaOnNewTestDocument] Erro:', err);
    }
  });

// ============================================================
// Trigger 2: Nova tarefa criada em tasks → notificar QA
// ============================================================
exports.notifyQaOnNewTask = functions.firestore
  .document('tasks/{taskId}')
  .onCreate(async (snap, context) => {
    try {
      const data = snap.data();
      const title = data.title || 'Tarefa';
      const authorEmail = data.createdBy || data.authorEmail || '';
      const taskId = context.params.taskId;

      const qaUsers = await getQaUsers();
      const notifyPromises = qaUsers
        .filter(u => u.email !== authorEmail)
        .map(u => createNovaTarefaNotification({
          targetUserId: u.id || u.uid,
          targetEmail: u.email,
          authorEmail,
          taskId,
          title,
          sourceCollection: 'tasks'
        }));

      await Promise.all(notifyPromises);
      console.log(`[notifyQaOnNewTask] ${notifyPromises.length} notificações criadas para task ${taskId}`);
    } catch (err) {
      console.error('[notifyQaOnNewTask] Erro:', err);
    }
  });

// ============================================================
// Trigger 3: Comentário com @menção em testDocuments → notificar usuário
// ============================================================
exports.notifyMentionInTestDocument = functions.firestore
  .document('testDocuments/{docId}')
  .onUpdate(async (change, context) => {
    try {
      const before = change.before.data();
      const after = change.after.data();
      const docId = context.params.docId;

      const newComments = getNewComments(before.comments, after.comments);
      if (newComments.length === 0) return;

      await processMentions(newComments, docId, 'testDocuments');
      console.log(`[notifyMentionInTestDocument] Processados ${newComments.length} comentário(s) em ${docId}`);
    } catch (err) {
      console.error('[notifyMentionInTestDocument] Erro:', err);
    }
  });

// ============================================================
// Trigger 4: Comentário com @menção em tasks → notificar usuário
// ============================================================
exports.notifyMentionInTask = functions.firestore
  .document('tasks/{taskId}')
  .onUpdate(async (change, context) => {
    try {
      const before = change.before.data();
      const after = change.after.data();
      const taskId = context.params.taskId;

      const newComments = getNewComments(before.comments, after.comments);
      if (newComments.length === 0) return;

      await processMentions(newComments, taskId, 'tasks');
      console.log(`[notifyMentionInTask] Processados ${newComments.length} comentário(s) em ${taskId}`);
    } catch (err) {
      console.error('[notifyMentionInTask] Erro:', err);
    }
  });
