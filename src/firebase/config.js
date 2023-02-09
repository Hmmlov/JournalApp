// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
/* Dependencia del firebase auth */
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFdU0V5bwMG37xy-o1Chva_U3yX3Y5GUA",
  authDomain: "react-cursos-de22b.firebaseapp.com",
  projectId: "react-cursos-de22b",
  storageBucket: "react-cursos-de22b.appspot.com",
  messagingSenderId: "672397550825",
  appId: "1:672397550825:web:002a37fb27e752b2a9fc78"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
