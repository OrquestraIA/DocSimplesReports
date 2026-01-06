import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'
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

export const deleteTestDocument = async (id) => {
  const docRef = doc(db, 'testDocuments', id)
  await deleteDoc(docRef)
}

export const subscribeToTestDocuments = (callback) => {
  const q = query(testDocumentsCollection, orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(docs)
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

export const subscribeToRequirements = (callback) => {
  return onSnapshot(requirementsCollection, (snapshot) => {
    const docs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(docs)
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

export { db, storage, auth }
