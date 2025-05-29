import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import useUserStore from '../../store/userStore';
import './Exit.css';

import ConfirmLogoutModal from '../ConfirmLogoutModal/ConfirmLogoutModal'; // ✅

const Exit = ({ title = "יציאה" }) => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.setUsername);
  const [showModal, setShowModal] = useState(false);

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
    <>
      <div className="exit" onClick={() => setShowModal(true)}>
        <span className="exit-title">{title}</span>
      </div>

      {showModal && (
        <ConfirmLogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Exit;
