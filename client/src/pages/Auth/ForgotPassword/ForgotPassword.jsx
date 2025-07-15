// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import loginImage from '../../../assets/login-illustration.png';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('אנא הכנס כתובת אימייל');
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('נשלח קישור לאיפוס סיסמה לאימייל שלך');
      navigate('/auth/login');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/user-not-found') {
        toast.error('לא נמצא משתמש עם כתובת אימייל זו');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('כתובת אימייל לא תקינה');
      } else {
        toast.error('שגיאה בשליחת קישור: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>שחזור סיסמה</h1>
        <p>הזן את כתובת האימייל שלך כדי לקבל קישור לשחזור הסיסמה</p>

        <form onSubmit={handleReset}>
          <div className="input-container">
            <input
              type="email"
              placeholder="כתובת אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <FaEnvelope className="input-icon" />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "שולח קישור..." : "שלח קישור לשחזור"}
          </button>
        </form>

        <div className="register-prompt">
          זוכר את הסיסמה?
          <span className="register-link" onClick={() => navigate('/auth/login')}>
            חזור להתחברות
          </span>
        </div>
      </div>

      <div className="login-image">
        <img src={loginImage} alt="איור שחזור סיסמה" />
      </div>
    </div>
  );
};

export default ForgotPassword;
