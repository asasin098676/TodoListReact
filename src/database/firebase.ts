// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEf7nqoZiBqVoY0gBdfHJeGWRT9z018pc",
  authDomain: "todolistreact-ca3cc.firebaseapp.com",
  projectId: "todolistreact-ca3cc",
  storageBucket: "todolistreact-ca3cc.firebasestorage.app",
  messagingSenderId: "294465113578",
  appId: "1:294465113578:web:708fa275e61263e6ff7693",
  measurementId: "G-4RTZMWREGP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider()


