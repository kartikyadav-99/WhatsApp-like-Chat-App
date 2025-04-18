import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDh3LK_feznttoJ7K4DufYU4DviJZBQ7u8",
  authDomain: "whats-app-clone-ea9f2.firebaseapp.com",
  projectId: "whats-app-clone-ea9f2",
  storageBucket: "whats-app-clone-ea9f2.firebasestorage.app",
  messagingSenderId: "404206598931",
  appId: "1:404206598931:web:e9f951798ef4a33573f8e6",
  measurementId: "G-JQ8K054GK8"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;