import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realtor-web-app-ccc49.firebaseapp.com",
  projectId: "realtor-web-app-ccc49",
  storageBucket: "realtor-web-app-ccc49.appspot.com",
  messagingSenderId: "826121930268",
  appId: "1:826121930268:web:f38f01ee33d08cf7f301d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
