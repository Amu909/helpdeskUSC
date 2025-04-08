// src/scripts/firebaseconfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCID6lucKdocF9zeOT1vizqe-QphO6-49M",
  authDomain: "helpdeskusc-8cb76.firebaseapp.com",
  projectId: "helpdeskusc-8cb76",
  storageBucket: "helpdeskusc-8cb76.appspot.com", // ⚠️ corregido: storageBucket tenía `.app` en vez de `.appspot.com`
  messagingSenderId: "858493419292",
  appId: "1:858493419292:web:50cf3479a6b4425d6484d9",
  measurementId: "G-NLWQHZGM9Z"
};

// Inicializar Firebase
const appfirebase = initializeApp(firebaseConfig);
const auth = getAuth(appfirebase);

// Exportar
export { appfirebase, auth };
