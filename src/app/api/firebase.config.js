import { initializeApp } from 'firebase/app';
import { getFirestore ,collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmWd1lLNe5ejXsjMUNv1LccIttRDQMG2U",
  authDomain: "test-14ad0.firebaseapp.com",
  databaseURL: "https://test-14ad0-default-rtdb.firebaseio.com",
  projectId: "test-14ad0",
  storageBucket: "test-14ad0.appspot.com",
  messagingSenderId: "132581581918",
  appId: "1:132581581918:web:143b5a758c09914ecd40cf",
  measurementId: "G-Q6F2R56XH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { db , auth ,storage ,collection, addDoc};
