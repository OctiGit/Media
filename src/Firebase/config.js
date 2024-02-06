import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPsRRu71uKDMI8XRXp645PFpG1JE12wMo",
  authDomain: "react-toolkit-query-media.firebaseapp.com",
  projectId: "react-toolkit-query-media",
  storageBucket: "react-toolkit-query-media.appspot.com",
  messagingSenderId: "116685863011",
  appId: "1:116685863011:web:4b017ae531473dd1c62056",
  measurementId: "G-TC7YLXYDTY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
