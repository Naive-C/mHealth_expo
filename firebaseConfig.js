import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACqqji_b5OL8yyWiM8jlWcUn3XcbtPUx0",
  authDomain: "expo-7bf3e.firebaseapp.com",
  projectId: "expo-7bf3e",
  storageBucket: "expo-7bf3e.appspot.com",
  messagingSenderId: "225536151587",
  appId: "1:225536151587:web:eac3ce615f61de9a4d6196"
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app,{
  experimentalForceLongPolling: true,
})

export {db}