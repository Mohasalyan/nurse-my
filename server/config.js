import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // إذا كنت تستعمل Firestore
import { getAuth } from "firebase/auth"; // للمصادقة
// import { getStorage } from "firebase/storage"; // إذا بدك ترفع ملفات


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
// const storage = getStorage(app); // إذا بدك تستعمله

export { db, auth };
