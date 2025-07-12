import { useState, useEffect } from "react";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const useUserRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("🔥 المستخدم الحالي:", user);

      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      console.log("🔥 UID المستخدم الحالي:", user.uid);

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        console.log("👤 البيانات:", userDoc.data());
        setRole(userDoc.data().role || "nurse");
      } else {
        console.log("❌ لا يوجد مستند للمستخدم");
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { role, loading };
};

export default useUserRole;
