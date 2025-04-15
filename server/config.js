import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // إذا كنت تستعمل Firestore
import { getAuth } from "firebase/auth"; // للمصادقة
// import { getStorage } from "firebase/storage"; // إذا بدك ترفع ملفات

const firebaseConfig = {
  apiKey: "AIzaSyC4ehvvXdjOPUJO0ZaVq9lIMpO6do732h0",
  authDomain: "nurse-app-37fd2.firebaseapp.com",
  projectId: "nurse-app-37fd2",
  storageBucket: "nurse-app-37fd2.appspot.com",
  messagingSenderId: "545188114047",
  appId: "1:545188114047:web:34063223d48413a5f1d94a",
  measurementId: "G-0Z3SWVYK93"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
// const storage = getStorage(app); // إذا بدك تستعمله

export { db, auth };
