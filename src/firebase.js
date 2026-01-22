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

export { db, storage, auth }
