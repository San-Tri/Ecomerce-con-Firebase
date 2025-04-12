import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA6y_zzemKzA18RaTYJSW5ejSH46iXMmQM",
  authDomain: "ecomerce-25b42.firebaseapp.com",
  projectId: "ecomerce-25b42",
  storageBucket: "ecomerce-25b42.firebasestorage.app",
  messagingSenderId: "677864105064",
  appId: "1:677864105064:web:373cc541170fa30df0c7dd",
  measurementId: "G-9BMLTZEMBC",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
