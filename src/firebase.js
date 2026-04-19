// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_dXCLesOqVP3CjBtbTXky-utE3PN1itY",
  authDomain: "teeno-bhai-teeno-tabahi.firebaseapp.com",
  projectId: "teeno-bhai-teeno-tabahi",
  storageBucket: "teeno-bhai-teeno-tabahi.appspot.com",
  messagingSenderId: "347230107080",
  appId: "1:347230107080:web:45fe2bf383eff4f694bcfd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };