import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABjQqXCK7RpPZwKm6DnYeFFLElzSZP0FE",
  authDomain: "cc-admin-3092e.firebaseapp.com",
  projectId: "cc-admin-3092e",
  storageBucket: "cc-admin-3092e.appspot.com",
  messagingSenderId: "546916382995",
  appId: "1:546916382995:web:4b94ee90daef728b2142e6",
  measurementId: "G-9X555Z8GFF"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
