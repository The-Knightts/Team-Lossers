// Import Firebase SDK modules for client-side functionality
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration object using environment variables
// These values should be set in your .env.local file
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,         // API key for Firebase services
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,  // Auth domain for Firebase Authentication
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,    // Firebase project ID
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,  // Storage bucket for Firebase Storage
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,  // Messaging sender ID
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,           // Firebase application ID
};

// Initialize Firebase application
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);      // Authentication service
export const db = getFirestore(app);   // Firestore database service
export const storage = getStorage(app); // Storage service

export default app;
