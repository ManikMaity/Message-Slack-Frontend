// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FIREBASE_API_KEY } from "./clientConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "opendoor-db7d9.firebaseapp.com",
  projectId: "opendoor-db7d9",
  storageBucket: "opendoor-db7d9.appspot.com",
  messagingSenderId: "28724812891",
  appId: "1:28724812891:web:3887245038aa72c7a8f37e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
