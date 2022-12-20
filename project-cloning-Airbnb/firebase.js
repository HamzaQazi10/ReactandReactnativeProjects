//import {auth} from './firebase'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA768iHXpyUaklRglT6uC2pYBwwLpm-wJg",
  authDomain: "proj-95c47.firebaseapp.com",
  projectId: "proj-95c47",
  storageBucket: "proj-95c47.appspot.com",
  messagingSenderId: "728195552806",
  appId: "1:728195552806:web:c51b23e7820da47d9938e7"
};

// Initialize Firebase
//if(initializeApp.app.length===0){
  const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app);
  export const database = getDatabase(app);
  

  
