'use client';

// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCMmzZugDXAUd-iWLUKUNlEGn16t-aD0U8',
  authDomain: 'almatakehome.firebaseapp.com',
  projectId: 'almatakehome',
  storageBucket: 'almatakehome.firebasestorage.app',
  messagingSenderId: '199222177465',
  appId: '1:199222177465:web:d2cb4ef4acf7ffd869f568',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const clientDb = getFirestore(app);
export const clientAuth = getAuth(app);
