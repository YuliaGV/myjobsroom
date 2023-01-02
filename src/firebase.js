// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "myjobsroomapp.firebaseapp.com",
  projectId: "myjobsroomapp",
  storageBucket: "myjobsroomapp.appspot.com",
  messagingSenderId: "758868249217",
  appId: "1:758868249217:web:a4fa717ab4c67a744e1b80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()
export const storage = getStorage(app);