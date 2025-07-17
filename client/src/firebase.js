// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKfXTz_rc4TdwfgOIJGen9-sP8kQk3stw",
  authDomain: "laptop-store-auth.firebaseapp.com",
  projectId: "laptop-store-auth",
  storageBucket: "laptop-store-auth.firebasestorage.app",
  messagingSenderId: "1008318198386",
  appId: "1:1008318198386:web:7879e1eb638df8091c88eb"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
