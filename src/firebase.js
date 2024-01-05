// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWU1lgkC83ptw1QRIysx3rJho6frOsiUE",
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
