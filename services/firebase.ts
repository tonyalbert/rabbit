import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD6UAXi9tTkXtrerTeH1cQDVYfGj-8Alqg",
    authDomain: "rabbit-743e0.firebaseapp.com",
    projectId: "rabbit-743e0",
    storageBucket: "rabbit-743e0.firebasestorage.app",
    messagingSenderId: "783174990248",
    appId: "1:783174990248:web:11baa7a10d4f95b1c9459d",
    measurementId: "G-T1QZ2L5RYC"  
};
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
