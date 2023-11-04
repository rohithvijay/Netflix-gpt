// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "netflixgpt-21177.firebaseapp.com",
  projectId: "netflixgpt-21177",
  storageBucket: "netflixgpt-21177.appspot.com",
  messagingSenderId: "89422774680",
  appId: "1:89422774680:web:bddcd7a9e5bbf1bd656bed",
  measurementId: "G-526YB0DC89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();