import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxkZbovo-Yabijg_yeFmusKQFjPOFpurk",
  authDomain: "school-84cc6.firebaseapp.com",
  projectId: "school-84cc6",
  storageBucket: "school-84cc6.firebasestorage.app",
  messagingSenderId: "28471094720",
  appId: "1:28471094720:web:60d0c74f09fd49107d2c25",
  measurementId: "G-9X3WQRELR5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
