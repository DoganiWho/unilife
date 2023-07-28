// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// allows us to connect to Firestore db
import {getFirestore} from 'firebase/firestore'

// for auth
import {getAuth} from "firebase/auth"

// for storage
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpp6aiGYB47vONyYUX3FyD41iP4x5Vejc",
  authDomain: "blog-d8a74.firebaseapp.com",
  projectId: "blog-d8a74",
  storageBucket: "blog-d8a74.appspot.com",
  messagingSenderId: "538800357510",
  appId: "1:538800357510:web:16527514db528a9e3dd107"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// set up database and export it
export const db = getFirestore(app)

// set up auth and export it
export const auth = getAuth(app)

// set up storage and activate it
export const storage = getStorage(app)