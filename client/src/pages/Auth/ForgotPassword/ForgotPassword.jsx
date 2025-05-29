// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './../AuthForm.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('אנא הכנס אימייל');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('נשלח קישור לאיפוס סיסמה לאימייל שלך');
      navigate('/auth/login');
    } catch (error) {
      console.error(error);
      toast.error('שגיאה בשליחת קישור: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>איפוס סיסמה</h1>
        <p>אנא הזן את כתובת האימייל שלך כדי לקבל קישור לאיפוס הסיסמה</p>

        <form onSubmit={handleReset}>
          <div className="input-container">
            <input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit">שלח קישור איפוס</button>
        </form>

        <p className="register-prompt">
          חזור ל
          <span className="register-link" onClick={() => navigate('/auth/login')}>
            התחברות
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
