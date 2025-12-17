import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC7OMYC7enoEkTsBzliRWiyHkLQ9H92Ekk",
  authDomain: "docsimplesreports.firebaseapp.com",
  projectId: "docsimplesreports",
  storageBucket: "docsimplesreports.firebasestorage.app",
  messagingSenderId: "37293480302",
  appId: "1:37293480302:web:ffac0bdc2f2e69985a897f"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

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

export { db }
