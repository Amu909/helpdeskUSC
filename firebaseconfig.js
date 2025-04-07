// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCID6lucKdocF9zeOT1vizqe-QphO6-49M",
  authDomain: "helpdeskusc-8cb76.firebaseapp.com",
  projectId: "helpdeskusc-8cb76",
  storageBucket: "helpdeskusc-8cb76.firebasestorage.app",
  messagingSenderId: "858493419292",
  appId: "1:858493419292:web:50cf3479a6b4425d6484d9",
  measurementId: "G-NLWQHZGM9Z"
};

// Initialize Firebase
const appfirebase = initializeApp(firebaseConfig);


export default appfirebase;