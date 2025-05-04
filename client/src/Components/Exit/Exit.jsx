// src/Components/Exit/Exit.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import useUserStore from '../../store/userStore';
import './Exit.css'; // ✅ ربط ملف التنسيق

const Exit = ({ title = "יציאה" }) => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.setUsername);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearUser("");
      navigate('/auth/login');
    } catch (error) {
      console.error("שגיאה ביציאה:", error);
    }
  };

  return (
    <div className="exit" onClick={handleLogout}>
      <span className="exit-title">{title}</span>
    </div>
  );
};

export default Exit;
