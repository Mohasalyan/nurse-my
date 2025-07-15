// Register.jsx - Updated for RTL and clean design
import React, { useState, useEffect } from 'react';
import './Register.css';
import loginImage from '../../../assets/login-illustration.png';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { auth, db } from '../../../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/userStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setUsernameGlobal = useUserStore((state) => state.setUsername);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      return toast.error('אנא מלא את כל השדות');
    }

    if (password.length < 6) {
      return toast.error('הסיסמה חייבת להכיל לפחות 6 תווים');
    }

    if (password !== confirmPassword) {
      return toast.error('הסיסמאות אינן תואמות');
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: username,
      });

      await sendEmailVerification(userCredential.user);
      setUsernameGlobal(username);

      // הוספת המשתמש לרשימת ההמתנה
      await setDoc(doc(db, "users_pending", userCredential.user.uid), {
        name: username,
        email: email,
        role: "nurse",
        createdAt: new Date(),
      });

      toast.success('✔️ נשלח קישור לאימות הדוא"ל. בדוק את תיבת הדואר שלך.');
      setNeedsVerification(true);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        toast.error('כתובת האימייל כבר רשומה במערכת');
      } else if (err.code === 'auth/weak-password') {
        toast.error('הסיסמה חלשה מדי. אנא בחר סיסמה חזקה יותר');
      } else if (err.code === 'auth/invalid-email') {
        toast.error('כתובת אימייל לא תקינה');
      } else {
        toast.error('שגיאה בהרשמה: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser);
        toast.success('🔁 קישור האימות נשלח מחדש');
      } catch (error) {
        toast.error('שגיאה בשליחה מחדש: ' + error.message);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && !user.emailVerified) {
        setNeedsVerification(true);
      } else if (user && user.emailVerified) {
        // בדיקה אם המשתמש אושר על ידי המנהל
        const approvedDoc = await getDoc(doc(db, "users", user.uid));
        if (approvedDoc.exists()) {
          toast.success("🚀 החשבון אושר על ידי האדמין. כניסה מוצלחת");
          navigate("/home");
        } else {
          toast.info("⌛ החשבון ממתין לאישור האדמין.");
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>הרשמה למערכת</h1>
        <p>צור חשבון חדש כדי להתחיל!</p>
        <form onSubmit={handleRegister}>
          <div className="input-container">
            <input
              type="text"
              placeholder="שם מלא"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="name"
            />
            <FaUser className="input-icon" />
          </div>

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

          <div className="input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="סיסמה (לפחות 6 תווים)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <FaLock className="input-icon" />
            <span className="toggle-password" onClick={togglePassword}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <div className="input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="אימות סיסמה"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            <FaLock className="input-icon" />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "יוצר חשבון..." : "צור חשבון חדש"}
          </button>
        </form>

        {needsVerification && (
          <div className="resend-verification">
            <p>לא קיבלת את קישור האימות?</p>
            <button type="button" onClick={resendVerification}>
              שלח שוב קישור אימות
            </button>
          </div>
        )}

        <div className="register-prompt">
          כבר יש לך חשבון?
          <span className="register-link" onClick={() => navigate('/auth/login')}>
            התחבר עכשיו
          </span>
        </div>
      </div>

      <div className="login-image">
        <img src={loginImage} alt="איור הרשמה" />
      </div>
    </div>
  );
};

export default Register;