// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  {getFirestore} from 'firebase/firestore';
import {getStorage}  from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyAcUdswphw0djdx2NSKA9Mq4RO4QDq6z2Y",
  authDomain: "foodapp-1662c.firebaseapp.com",
  projectId: "foodapp-1662c",
  storageBucket: "foodapp-1662c.appspot.com",
  messagingSenderId: "286927336496",
  appId: "1:286927336496:web:c5d108639c9c62b8e2a9f5",
  measurementId: "G-9ZYF5QHJWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);
const storage =getStorage(app);
const analytics = getAnalytics(app);


export {db,storage};