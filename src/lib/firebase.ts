// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWNHL-dQZayHhVS51U1z_0u1V1uLKtzkA",
  authDomain: "barber-booking-bf41f.firebaseapp.com",
  projectId: "barber-booking-bf41f",
  storageBucket: "barber-booking-bf41f.firebasestorage.app",
  messagingSenderId: "265481537358",
  appId: "1:265481537358:web:93c5b6f36e8258dc5e401f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Check if we're in development mode and if we should use emulators
const useEmulators = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true';

// If we're in development and emulators are enabled, connect to them
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && useEmulators) {
  // Connect to Firestore emulator
  connectFirestoreEmulator(db, 'localhost', 8080);
  // Connect to Auth emulator
  connectAuthEmulator(auth, 'http://localhost:9099');
  console.log('Using Firebase emulators');
}

export { db, auth };

// Define the return type for the connection check
interface FirebaseConnectionStatus {
  connected: boolean;
  error: string;
}

// Helper function to check if Firebase is blocked
export const checkFirebaseConnection = async (): Promise<FirebaseConnectionStatus> => {
  try {
    // Attempt a simple operation
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Firebase connection timeout')), 5000)
    );
    
    // This will be rejected if blocked by client
    await Promise.race([
      fetch(`https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2F${firebaseConfig.projectId}%2Fdatabases%2F(default)`, {
        method: 'HEAD',
        mode: 'no-cors'
      }),
      timeout
    ]);
    
    return { connected: true, error: '' };
  } catch (error) {
    console.error('Firebase connection check failed:', error);
    return { 
      connected: false, 
      error: 'Firebase connection blocked. Please disable ad blockers or privacy extensions for this site.'
    };
  }
}; 