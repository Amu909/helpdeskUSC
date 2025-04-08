// src/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCID6lucKdocF9zeOT1vizqe-QphO6-49M",
  authDomain: "helpdeskusc-8cb76.firebaseapp.com",
  projectId: "helpdeskusc-8cb76",
  storageBucket: "helpdeskusc-8cb76.firebasestorage.app",
  messagingSenderId: "858493419292",
  appId: "1:858493419292:web:50cf3479a6b4425d6484d9",
  measurementId: "G-NLWQHZGM9Z"
};

// ✅ Verifica si ya está inicializada
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
