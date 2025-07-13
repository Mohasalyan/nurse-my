import React, { useState } from "react";
import { auth, db } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    if (email !== "admin@nurse-my.com" || password !== "admin123") {
      toast.error("🚫 לא מורשה - פרטי התחברות שגויים");
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

      toast.success("✅ החשבון של האדמין נוצר בהצלחה!");
      setTimeout(() => navigate("/admin-dashboard"), 2000); // تأخير بسيط ليشوف التوست
    } catch (error) {
      toast.error("❌ יצירת החשבון נכשלה: " + error.message);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto", direction: "rtl" }}>
      <h2>⚙️ יצירת חשבון אדמין</h2>
      <form onSubmit={handleCreateAdmin}>
        <input
          type="text"
          placeholder="שם מלא"
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
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#1976d2", color: "#fff", border: "none", borderRadius: "4px" }}>
          צור אדמין
        </button>
      </form>
    </div>
  );
};

export default AdminSetup;
