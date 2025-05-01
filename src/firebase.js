// Firebase setup
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC4Hzhs7AcdfHOhrXwcE4MtouUJfunTK7g",
  authDomain: "ws-pet-track.firebaseapp.com",
  projectId: "ws-pet-track",
  storageBucket: "ws-pet-track.firebasestorage.app",
  messagingSenderId: "136775643938",
  appId: "1:136775643938:web:2b878d5b2b9c7b8f3b6b7b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
