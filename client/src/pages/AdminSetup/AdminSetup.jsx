import React, { useState } from "react";
import { auth, db } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    // فقط إذا الإيميل والباسورد مطابقين
    if (email !== "admin@nurse-my.com" || password !== "admin123") {
      alert("🚫 غير مسموح - بيانات غير صحيحة لإنشاء الأدمن");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        role: "admin",
        approvedAt: serverTimestamp()
      });

      alert("✅ تم إنشاء حساب الأدمن بنجاح!");
      navigate("/admin-dashboard");
    } catch (error) {
      alert("❌ فشل في إنشاء الأدمن: " + error.message);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>⚙️ إعداد حساب الأدمن</h2>
      <form onSubmit={handleCreateAdmin}>
        <input
          type="text"
          placeholder="الاسم الكامل"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "8px" }}
        />
        <input
          type="email"
          placeholder="admin@nurse-my.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="admin123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "8px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          إنشاء الأدمن
        </button>
      </form>
    </div>
  );
};

export default AdminSetup;
