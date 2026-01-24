import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, setDoc, getDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC7OMYC7enoEkTsBzliRWiyHklQ9H92EKk",
  authDomain: "docsimplesreports.firebaseapp.com",
  projectId: "docsimplesreports",
  storageBucket: "docsimplesreports.firebasestorage.app",
  messagingSenderId: "37293480302",
  appId: "1:37293480302:web:ffac0bdc2f2e69985a897f",
  measurementId: "G-S9FLRP8T6N"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

// Collections
const testDocumentsCollection = collection(db, 'testDocuments')
const requirementsCollection = collection(db, 'requirements')
const notificationsCollection = collection(db, 'notifications')
const usersCollection = collection(db, 'users')

// Funções para Test Documents
export const addTestDocument = async (data) => {
  const docData = {
    ...data,
    createdAt: new Date().toISOString()
  }
  const docRef = await addDoc(testDocumentsCollection, docData)
  return { id: docRef.id, ...docData }
}

export const updateTestDocument = async (id, data) => {
  const docRef = doc(db, 'testDocuments', id)
  await updateDoc(docRef, data)
}

// Adicionar comentário/interação a um documento de teste
export const addCommentToTestDocument = async (testId, comment) => {
  const docRef = doc(db, 'testDocuments', testId)
  const commentData = {
    ...comment,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  }
  // Buscar documento atual e adicionar comentário ao array
  const { getDoc: getDocFn } = await import('firebase/firestore')
  const docSnap = await getDocFn(docRef)
  const currentComments = docSnap.data()?.comments || []
  await updateDoc(docRef, {
    comments: [...currentComments, commentData]
  })
  return commentData
}

// Atualizar comentário existente
export const updateCommentInTestDocument = async (testId, commentId, updatedComment) => {
  const docRef = doc(db, 'testDocuments', testId)
  const { getDoc: getDocFn } = await import('firebase/firestore')
  const docSnap = await getDocFn(docRef)
  const currentComments = docSnap.data()?.comments || []
  
  const updatedComments = currentComments.map(comment => 
    comment.id === commentId 
      ? { ...comment, ...updatedComment, updatedAt: new Date().toISOString() }
      : comment
  )
  
  await updateDoc(docRef, { comments: updatedComments })
}

// Adicionar ou remover reação (emoji ou GIF) em um comentário
export const toggleReactionOnComment = async (testId, commentId, reaction, userId, userName) => {
  const docRef = doc(db, 'testDocuments', testId)
  const { getDoc: getDocFn } = await import('firebase/firestore')
  const docSnap = await getDocFn(docRef)
  const currentComments = docSnap.data()?.comments || []
  
  const updatedComments = currentComments.map(comment => {
    if (comment.id !== commentId) return comment
    
    const reactions = comment.reactions || []
    // Verificar se usuário já reagiu com este emoji/gif
    const existingReactionIndex = reactions.findIndex(
      r => r.type === reaction.type && r.value === reaction.value && r.userId === userId
    )
    
    let newReactions
    if (existingReactionIndex >= 0) {
      // Remover reação existente
      newReactions = reactions.filter((_, idx) => idx !== existingReactionIndex)
    } else {
      // Adicionar nova reação
      newReactions = [...reactions, {
        ...reaction,
        userId,
        userName,
        createdAt: new Date().toISOString()
      }]
    }
    
    return { ...comment, reactions: newReactions }
  })
  
  await updateDoc(docRef, { comments: updatedComments })
}

export const deleteTestDocument = async (id) => {
  const docRef = doc(db, 'testDocuments', id)
  await deleteDoc(docRef)
}

export const subscribeToTestDocuments = (callback, onError) => {
  const q = query(testDocumentsCollection, orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    console.log('[Firebase] Documentos carregados:', docs.length)
    callback(docs)
  }, (error) => {
    console.error('[Firebase] Erro ao carregar documentos:', error)
    if (onError) onError(error)
  })
}

// Funções para Requirements
export const addRequirement = async (data) => {
  const docRef = await addDoc(requirementsCollection, data)
  return { id: docRef.id, ...data }
}

export const updateRequirement = async (id, data) => {
  const docRef = doc(db, 'requirements', id)
  await updateDoc(docRef, data)
}

export const deleteRequirement = async (id) => {
  const docRef = doc(db, 'requirements', id)
  await deleteDoc(docRef)
}

export const subscribeToRequirements = (callback, onError) => {
  return onSnapshot(requirementsCollection, (snapshot) => {
    const docs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    console.log('[Firebase] Requirements carregados:', docs.length)
    callback(docs)
  }, (error) => {
    console.error('[Firebase] Erro ao carregar requirements:', error)
    if (onError) onError(error)
  })
}

// Funções para Upload de Imagens
export const uploadScreenshot = async (file, testId) => {
  const timestamp = Date.now()
  const fileName = `screenshots/${testId}/${timestamp}_${file.name}`
  const storageRef = ref(storage, fileName)
  
  await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(storageRef)
  
  return {
    url: downloadURL,
    path: fileName,
    name: file.name,
    uploadedAt: new Date().toISOString()
  }
}

export const deleteScreenshot = async (path) => {
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}

// Funções de Autenticação
export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export const logout = async () => {
  await signOut(auth)
}

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// Função para determinar o perfil do usuário pelo email
export const getUserRole = (email) => {
  if (!email) return 'operacao'
  // Emails da OrquestraIA e OM30Tech são desenvolvedores
  if (email.includes('@orquestraia.com.br') || email.includes('@om30tech.com.br')) {
    return 'desenvolvedor'
  }
  return 'operacao'
}

// Funções para Notificações
export const addNotification = async (data) => {
  const notificationData = {
    ...data,
    read: false,
    createdAt: new Date().toISOString()
  }
  const docRef = await addDoc(notificationsCollection, notificationData)
  return { id: docRef.id, ...notificationData }
}

export const markNotificationAsRead = async (id) => {
  const docRef = doc(db, 'notifications', id)
  await updateDoc(docRef, { read: true })
}

export const markAllNotificationsAsRead = async () => {
  const { getDocs } = await import('firebase/firestore')
  const q = query(notificationsCollection)
  const snapshot = await getDocs(q)
  const updates = snapshot.docs.map(docSnap => {
    const docRef = doc(db, 'notifications', docSnap.id)
    return updateDoc(docRef, { read: true })
  })
  await Promise.all(updates)
}

export const deleteNotification = async (id) => {
  const docRef = doc(db, 'notifications', id)
  await deleteDoc(docRef)
}

// Funções para Requisitos Importados
const importedRequirementsCollection = collection(db, 'importedRequirements')

export const importRequirements = async (requirements) => {
  const { getDocs, writeBatch } = await import('firebase/firestore')
  
  // Limpar requisitos existentes antes de importar novos
  const snapshot = await getDocs(importedRequirementsCollection)
  const batch = writeBatch(db)
  snapshot.docs.forEach(docSnap => {
    batch.delete(docSnap.ref)
  })
  await batch.commit()
  
  // Importar novos requisitos em batches de 500 (limite do Firestore)
  const batchSize = 500
  for (let i = 0; i < requirements.length; i += batchSize) {
    const batchReqs = requirements.slice(i, i + batchSize)
    const newBatch = writeBatch(db)
    batchReqs.forEach(req => {
      const docRef = doc(importedRequirementsCollection)
      newBatch.set(docRef, {
        ...req,
        importedAt: new Date().toISOString()
      })
    })
    await newBatch.commit()
  }
  
  return requirements.length
}

export const clearImportedRequirements = async () => {
  const { getDocs, writeBatch } = await import('firebase/firestore')
  const snapshot = await getDocs(importedRequirementsCollection)
  const batch = writeBatch(db)
  snapshot.docs.forEach(docSnap => {
    batch.delete(docSnap.ref)
  })
  await batch.commit()
}

export const subscribeToImportedRequirements = (callback, onError) => {
  return onSnapshot(importedRequirementsCollection, (snapshot) => {
    const requirements = snapshot.docs.map(doc => ({
      firebaseId: doc.id,
      ...doc.data()
    }))
    callback(requirements)
  }, onError)
}

export const updateImportedRequirement = async (firebaseId, data) => {
  const docRef = doc(db, 'importedRequirements', firebaseId)
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString()
  })
}

export const subscribeToNotifications = (callback, onError, currentUser = null) => {
  const q = query(notificationsCollection, orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    let docs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    // Filtrar notificações para o usuário atual
    if (currentUser) {
      const userRole = getUserRole(currentUser.email)
      const userEmail = currentUser.email
      const userId = currentUser.uid
      
      docs = docs.filter(notification => {
        // Notificação direcionada por email específico (menções)
        if (notification.targetEmail && notification.targetEmail === userEmail) {
          return true
        }
        // Notificação direcionada por userId específico (menções)
        if (notification.targetUserId && notification.targetUserId === userId) {
          return true
        }
        // Notificação direcionada por role (ex: operacao, desenvolvedor)
        if (notification.targetRole && notification.targetRole === userRole) {
          // Não mostrar notificações que o próprio usuário criou
          if (notification.authorEmail === userEmail) {
            return false
          }
          return true
        }
        // Notificações sem target específico não são mostradas
        return false
      })
    }
    
    callback(docs)
  }, (error) => {
    console.error('[Firebase] Erro ao carregar notificações:', error)
    if (onError) onError(error)
  })
}

// Funções para Usuários
// Sincroniza usuário do Auth com Firestore (chamado no login)
export const syncUserToFirestore = async (authUser) => {
  if (!authUser) return null
  
  const userRef = doc(db, 'users', authUser.uid)
  const userSnap = await getDoc(userRef)
  
  // Extrair nome do email (parte antes do @)
  const emailName = authUser.email.split('@')[0]
  const displayName = emailName.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const mentionName = emailName.toLowerCase().replace(/[._]/g, '')
  
  if (!userSnap.exists()) {
    // Criar novo usuário
    const userData = {
      uid: authUser.uid,
      email: authUser.email,
      displayName: displayName,
      mentionName: mentionName, // nome para @menção
      role: getUserRole(authUser.email),
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }
    await setDoc(userRef, userData)
    return userData
  } else {
    // Atualizar último login
    await updateDoc(userRef, { lastLogin: new Date().toISOString() })
    return { id: userSnap.id, ...userSnap.data() }
  }
}

// Buscar todos os usuários (para autocomplete de menções)
export const subscribeToUsers = (callback, onError) => {
  const q = query(usersCollection, orderBy('displayName', 'asc'))
  return onSnapshot(q, (snapshot) => {
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(users)
  }, (error) => {
    console.error('[Firebase] Erro ao carregar usuários:', error)
    if (onError) onError(error)
  })
}

// Atualizar perfil do usuário
export const updateUserProfile = async (uid, data) => {
  const userRef = doc(db, 'users', uid)
  await updateDoc(userRef, data)
}

// Função para criar usuário manualmente (para usuários que ainda não logaram)
export const createUserManually = async (email) => {
  const emailName = email.split('@')[0]
  const displayName = emailName.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const mentionName = emailName.toLowerCase().replace(/[._]/g, '')
  const uniqueId = email.replace(/[@.]/g, '_')
  
  const userRef = doc(db, 'users', uniqueId)
  const userSnap = await getDoc(userRef)
  
  if (!userSnap.exists()) {
    const userData = {
      uid: uniqueId,
      email: email,
      displayName: displayName,
      mentionName: mentionName,
      role: getUserRole(email),
      createdAt: new Date().toISOString(),
      lastLogin: null
    }
    await setDoc(userRef, userData)
    return userData
  }
  return { id: userSnap.id, ...userSnap.data() }
}

// Função para popular usuários iniciais
export const populateInitialUsers = async () => {
  const emails = [
    'cesar.hebling@om30.com.br',
    'paulo.reis@orquestraia.com.br',
    'lucas.oliveira@om30tech.com.br',
    'gabriel.reis@om30tech.com.br',
    'adriana.silva@om30.com.br'
  ]
  
  for (const email of emails) {
    await createUserManually(email)
  }
  console.log('Usuários iniciais criados!')
}

// Função para atualizar role de usuários existentes e recriar com emails corretos
export const updateUsersRoles = async () => {
  const { getDocs } = await import('firebase/firestore')
  
  // Deletar usuários antigos com emails om30tec (sem h)
  const snapshot = await getDocs(usersCollection)
  for (const docSnap of snapshot.docs) {
    const userData = docSnap.data()
    if (userData.email?.includes('@om30tec.com.br')) {
      await deleteDoc(doc(db, 'users', docSnap.id))
      console.log(`Deletado usuário antigo: ${userData.email}`)
    }
  }
  
  // Criar usuários com emails corretos om30tech (com h)
  await createUserManually('lucas.oliveira@om30tech.com.br')
  await createUserManually('gabriel.reis@om30tech.com.br')
  
  console.log('Usuários atualizados com emails corretos!')
}

// Função para migrar registros com categoria 'melhoria' que estão com status 'pendente'
export const migrateMelhoriaStatus = async () => {
  const { getDocs } = await import('firebase/firestore')
  const snapshot = await getDocs(testDocumentsCollection)
  
  let updatedCount = 0
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data()
    // Se categoria é 'melhoria' e status é 'pendente', atualizar para 'melhoria'
    if (data.category === 'melhoria' && data.status === 'pendente') {
      const docRef = doc(db, 'testDocuments', docSnap.id)
      await updateDoc(docRef, { status: 'melhoria' })
      updatedCount++
      console.log(`Atualizado documento ${docSnap.id}: status alterado de 'pendente' para 'melhoria'`)
    }
  }
  
  console.log(`Migração concluída! ${updatedCount} documento(s) atualizado(s).`)
  return updatedCount
}

// ==========================================
// Funções para Casos de Teste (Estilo Zephyr)
// ==========================================
const testCasesCollection = collection(db, 'testCases')
const testExecutionsCollection = collection(db, 'testExecutions')

// Criar novo caso de teste
export const createTestCase = async (testCase) => {
  const docRef = await addDoc(testCasesCollection, {
    ...testCase,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft' // draft, ready, deprecated
  })
  return docRef.id
}

// Atualizar caso de teste
export const updateTestCase = async (id, data) => {
  const docRef = doc(db, 'testCases', id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString()
  })
}

// Deletar caso de teste
export const deleteTestCase = async (id) => {
  const docRef = doc(db, 'testCases', id)
  await deleteDoc(docRef)
}

// Buscar caso de teste por ID
export const getTestCase = async (id) => {
  const docRef = doc(db, 'testCases', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  }
  return null
}

// Inscrever-se para atualizações de casos de teste
export const subscribeToTestCases = (callback, onError) => {
  const q = query(testCasesCollection, orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const testCases = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(testCases)
  }, onError)
}

// Criar nova execução de teste
export const createTestExecution = async (execution) => {
  const docRef = await addDoc(testExecutionsCollection, {
    ...execution,
    startedAt: new Date().toISOString(),
    status: 'in_progress' // in_progress, passed, failed, blocked
  })
  return docRef.id
}

// Atualizar execução de teste
export const updateTestExecution = async (id, data) => {
  const docRef = doc(db, 'testExecutions', id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString()
  })
}

// Finalizar execução de teste
export const finishTestExecution = async (id, data) => {
  const docRef = doc(db, 'testExecutions', id)
  await updateDoc(docRef, {
    steps: data.steps,
    status: data.status,
    notes: data.notes || '',
    elapsedTime: data.elapsedTime || 0,
    finishedAt: new Date().toISOString()
  })
}

// Buscar execuções de um caso de teste
export const subscribeToTestExecutions = (testCaseId, callback, onError) => {
  const q = query(
    testExecutionsCollection, 
    where('testCaseId', '==', testCaseId),
    orderBy('startedAt', 'desc')
  )
  return onSnapshot(q, (snapshot) => {
    const executions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(executions)
  }, onError)
}

// Buscar todas as execuções
export const subscribeToAllTestExecutions = (callback, onError) => {
  const q = query(testExecutionsCollection, orderBy('startedAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const executions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(executions)
  }, onError)
}

// Upload de evidência para execução de teste
export const uploadTestEvidence = async (file, executionId, stepIndex) => {
  const timestamp = Date.now()
  const fileName = `${timestamp}_${file.name}`
  const storageRef = ref(storage, `test-evidences/${executionId}/step-${stepIndex}/${fileName}`)
  
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  
  return url
}

// ==========================================
// SPRINTS E TAREFAS
// ==========================================

const sprintsCollection = collection(db, 'sprints')
const tasksCollection = collection(db, 'tasks')

// Tipos de tarefa
export const TASK_TYPES = {
  'bug': { label: 'Bug', color: 'red' },
  'business_rule': { label: 'Regra de Negócio', color: 'purple' },
  'improvement': { label: 'Melhoria', color: 'blue' }
}

// Status de tarefa
export const TASK_STATUS = {
  'pending': { label: 'Pendente', color: 'gray' },
  'in_progress': { label: 'Em Andamento', color: 'blue' },
  'in_review': { label: 'Em Revisão', color: 'yellow' },
  'done': { label: 'Concluído', color: 'green' }
}

// --- SPRINTS ---

// Criar sprint
export const createSprint = async (sprintData) => {
  const docRef = await addDoc(sprintsCollection, {
    ...sprintData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
  return docRef.id
}

// Atualizar sprint
export const updateSprint = async (sprintId, data) => {
  const docRef = doc(db, 'sprints', sprintId)
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString()
  })
}

// Deletar sprint
export const deleteSprint = async (sprintId) => {
  const docRef = doc(db, 'sprints', sprintId)
  await deleteDoc(docRef)
}

// Buscar sprints
export const subscribeToSprints = (callback, onError) => {
  const q = query(sprintsCollection, orderBy('startDate', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const sprints = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(sprints)
  }, onError)
}

// --- TAREFAS ---

// Criar tarefa
export const createTask = async (taskData) => {
  const docRef = await addDoc(tasksCollection, {
    ...taskData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
  return docRef.id
}

// Atualizar tarefa
export const updateTask = async (taskId, data) => {
  const docRef = doc(db, 'tasks', taskId)
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString()
  })
}

// Deletar tarefa
export const deleteTask = async (taskId) => {
  const docRef = doc(db, 'tasks', taskId)
  await deleteDoc(docRef)
}

// Buscar tarefas
export const subscribeToTasks = (callback, onError) => {
  const q = query(tasksCollection, orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(tasks)
  }, onError)
}

// Criar tarefa automaticamente a partir de teste reprovado
export const createTaskFromFailedTest = async (testDocument, type = 'bug', assigneeId = null) => {
  // Formatar passos do teste
  const stepsText = testDocument.steps?.map((step, i) => {
    let stepText = `${i + 1}. ${step.action || 'Ação não informada'}`
    if (step.expectedResult) stepText += `\n   Esperado: ${step.expectedResult}`
    if (step.actualResult) stepText += `\n   Obtido: ${step.actualResult}`
    if (step.status) stepText += `\n   Status: ${step.status}`
    return stepText
  }).join('\n\n') || ''

  // Montar descrição completa similar ao Jira
  let description = ''
  
  if (testDocument.requirement) {
    description += `📋 REQUISITO: ${testDocument.requirement}\n`
    if (testDocument.requirementDescription) {
      description += `${testDocument.requirementDescription}\n`
    }
    description += '\n'
  }

  if (testDocument.category) {
    const categoryLabel = testDocument.category === 'regra_negocio' ? 'Regra de Negócio' : 
                          testDocument.category === 'bug' ? 'Bug' : 
                          testDocument.category === 'melhoria' ? 'Melhoria' : testDocument.category
    description += `🏷️ CATEGORIA: ${categoryLabel}\n`
  }
  
  if (testDocument.module) description += `📁 MÓDULO: ${testDocument.module}\n`
  if (testDocument.feature) description += `⚡ FEATURE: ${testDocument.feature}\n`
  if (testDocument.testType) description += `🧪 TIPO DE TESTE: ${testDocument.testType}\n`
  if (testDocument.priority) description += `🎯 PRIORIDADE: ${testDocument.priority}\n`
  if (testDocument.tester) description += `👤 TESTADOR: ${testDocument.tester}\n`
  if (testDocument.environment) description += `🌐 AMBIENTE: ${testDocument.environment}\n`
  
  if (testDocument.errorType) description += `❌ TIPO DE ERRO: ${testDocument.errorType}\n`
  
  if (testDocument.preconditions) {
    description += `\n📝 PRÉ-CONDIÇÕES:\n${testDocument.preconditions}\n`
  }
  
  if (stepsText) {
    description += `\n🔢 PASSOS DO TESTE:\n${stepsText}\n`
  }
  
  if (testDocument.observations) {
    description += `\n💬 OBSERVAÇÕES:\n${testDocument.observations}\n`
  }

  if (testDocument.improvement) {
    description += `\n💡 MELHORIA SUGERIDA:\n${testDocument.improvement}\n`
    if (testDocument.improvementJustification) {
      description += `Justificativa: ${testDocument.improvementJustification}\n`
    }
  }

  if (testDocument.screenshots?.length > 0) {
    description += `\n📸 EVIDÊNCIAS: ${testDocument.screenshots.length} arquivo(s) anexado(s)\n`
  }

  // Remover campos undefined do sourceData (Firestore não aceita undefined)
  const sourceData = {
    title: testDocument.title || '',
    requirement: testDocument.requirement || '',
    requirementDescription: testDocument.requirementDescription || '',
    feature: testDocument.feature || '',
    module: testDocument.module || '',
    testType: testDocument.testType || '',
    category: testDocument.category || '',
    errorType: testDocument.errorType || '',
    tester: testDocument.tester || '',
    environment: testDocument.environment || '',
    preconditions: testDocument.preconditions || '',
    steps: testDocument.steps || [],
    observations: testDocument.observations || '',
    improvement: testDocument.improvement || '',
    improvementJustification: testDocument.improvementJustification || '',
    status: testDocument.status || '',
    screenshots: testDocument.screenshots || [],
    jiraKey: testDocument.jiraKey || '',
    jiraUrl: testDocument.jiraUrl || ''
  }

  const taskData = {
    title: `[${type === 'bug' ? 'Bug' : type === 'business_rule' ? 'RN' : 'Melhoria'}] ${testDocument.title || testDocument.feature || 'Correção necessária'}`,
    description: description.trim(),
    type: type,
    status: 'pending',
    priority: testDocument.priority === 'alta' ? 'high' : testDocument.priority === 'baixa' ? 'low' : 'medium',
    sprintId: null,
    sourceType: 'test_document',
    sourceId: testDocument.id,
    sourceData: sourceData,
    assignee: assigneeId || null,
    createdBy: testDocument.tester || 'Sistema'
  }
  
  return await createTask(taskData)
}

// Criar tarefa a partir de execução de caso de teste reprovado
export const createTaskFromFailedExecution = async (execution, testCase, type = 'bug') => {
  // Encontrar os passos que falharam
  const failedSteps = execution.steps?.filter(s => s.status === 'failed') || []
  const failedStepsText = failedSteps.map((s, i) => `- Passo ${i + 1}: ${s.action}`).join('\n')
  
  const taskData = {
    title: `[${type === 'bug' ? 'Bug' : type === 'business_rule' ? 'RN' : 'Melhoria'}] ${testCase?.title || 'Caso de Teste Reprovado'}`,
    description: `Caso de teste reprovado.\n\nPassos que falharam:\n${failedStepsText}\n\nObservações: ${execution.notes || 'Nenhuma'}`,
    type: type,
    status: 'pending',
    priority: 'high',
    sprintId: null,
    sourceType: 'test_execution',
    sourceId: execution.id,
    testCaseId: testCase?.id,
    sourceData: {
      testCaseTitle: testCase?.title,
      module: testCase?.module,
      failedSteps: failedSteps,
      executedBy: execution.executedBy,
      finishedAt: execution.finishedAt
    },
    assignee: null,
    createdBy: execution.executedBy?.name || 'Sistema'
  }
  
  return await createTask(taskData)
}

export { db, storage, auth }
