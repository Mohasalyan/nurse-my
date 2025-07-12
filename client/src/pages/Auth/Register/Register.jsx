// 🔒 تعديل كامل لملف Register.jsx يشمل:
// - التحقق من الإيميل
// - إضافة المستخدم لـ users_pending
// - انتظار الموافقة من الأدمن

import React, { useState, useEffect } from 'react';
import './../AuthForm.css';
import loginImage from '../../../assets/login-illustration.png';
import { FaUser, FaLock } from 'react-icons/fa';
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

  const navigate = useNavigate();
  const setUsernameGlobal = useUserStore((state) => state.setUsername);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword)
      return toast.error('אנא מלא את כל השדות');

    if (password !== confirmPassword)
      return toast.error('הסיסמאות אינן תואמות');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: username,
      });

      await sendEmailVerification(userCredential.user);
      setUsernameGlobal(username);

      // 🔸 إضافة المستخدم إلى قائمة الانتظار
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
      toast.error('שגיאה בהרשמה: ' + err.message);
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
        // ✅ تحقق من إذا تم الموافقة من الأدمن
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
  }, []);

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={loginImage} alt="Register Illustration" />
      </div>

      <div className="login-form">
        <h1>הרשמה למערכת</h1>
        <p>!צור חשבון חדש כדי להתחיל</p>
        <form onSubmit={handleRegister}>
          <div className="input-container">
            <input
              type="text"
              placeholder="שם משתמש"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="input-icon" />
          </div>

          <div className="input-container">
            <input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="input-icon" />
          </div>

          <div className="input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            />
            <FaLock className="input-icon" />
          </div>

          <button type="submit">צור חשבון</button>
        </form>

        {needsVerification && (
          <div className="resend-verification">
            <p>לא קיבלת את קישור האימות?</p>
            <button onClick={resendVerification}>שלח שוב קישור אימות</button>
          </div>
        )}

        <p className="register-prompt">
          כבר יש לך חשבון?
          <span className="register-link" onClick={() => navigate('/auth/login')}>
            התחבר עכשיו
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;