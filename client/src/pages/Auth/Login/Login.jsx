import React, { useState } from 'react';
import './Login.css';

import loginImage from '../../../assets/login-illustration.png';
import { FaUser, FaLock } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCloseCircle } from 'react-icons/ai';

import { auth, db } from '../../../firebase/firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDoc, doc, getDocs, collection } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/userStore';
import DisclaimerModal from '../../../Components/DisclaimerModal/DisclaimerModal';
import { toast } from 'react-toastify';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setUsernameGlobal = useUserStore((state) => state.setUsername);

  const togglePassword = () => setShowPassword(!showPassword);
  const clearEmail = () => setEmail('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (!email || !password) {
      toast.error('אנא מלא את כל השדות');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        toast.info("✅ האימות בוצע בהצלחה, החשבון שלך כעת בבדיקה על ידי מנהל המערכת.");
        await signOut(auth);
        return;
      }

      const userData = userDoc.data();

      if (userData.role === "admin") {
        toast.success("ברוך הבא מנהל");
        navigate("/admin-dashboard");
        return;
      }

      if (!user.emailVerified) {
        toast.warning("📧 יש לאמת את כתובת האימייל לפני התחברות.");
        await signOut(auth);
        return;
      }

      if (userData.role === "nurse") {
        if (!userData.approvedAt) {
          toast.warning("🕒 החשבון אומת אך ממתין לאישור מנהל.");
          await signOut(auth);
          return;
        }

        const username = user.displayName || user.email;
        setUsernameGlobal(username);
        toast.success(`התחברת בהצלחה (${user.email})!`);
        setShowDisclaimer(true);
        return;
      }

      toast.error("סוג משתמש לא תקין.");
      await signOut(auth);

    } catch (err) {
      console.error(err);

   if (
  err.code === "auth/user-not-found" ||
  err.code === "auth/invalid-credential"
) {
  const pendingSnapshot = await getDocs(collection(db, "users_pending"));
  const isPending = pendingSnapshot.docs.some(
    doc => doc.data().email.toLowerCase() === email.toLowerCase()
  );

  if (isPending) {
    toast.info("🕒 החשבון שלך עדיין בבדיקה – נא להמתין לאישור מנהל.");
  } else {
    toast.error("❌ אין חשבון כזה במערכת – אנא פנה למנהל או הרשם");
  }

      } else if (err.code === "auth/wrong-password") {
        toast.error("🔒 סיסמה שגויה.");
      } else if (err.code === "auth/too-many-requests") {
        toast.error("🚫 ניסית יותר מדי פעמים. נסה שוב מאוחר יותר.");
      } else {
        toast.error("שגיאה: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDisclaimerClose = () => {
    setShowDisclaimer(false);
    navigate('/home');
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1>עמותת ותיקי מטה יהודה</h1>
          <p>הזדהות וכניסה למערכת!</p>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="email"
                placeholder="כתובת אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <FaUser className="input-icon" />
              {email && (
                <span className="clear-input" onClick={clearEmail}>
                  <AiOutlineCloseCircle />
                </span>
              )}
            </div>

            <div className="input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <FaLock className="input-icon" />
              <span className="toggle-password" onClick={togglePassword}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "מתחבר..." : "כניסה למערכת"}
            </button>
          </form>

          <div className="register-prompt">
            אין לך חשבון?
            <span className="register-link" onClick={() => navigate('/auth/register')}>
              הרשם עכשיו
            </span>
          </div>
          <div className="register-prompt">
            שכחת סיסמה?
            <span className="register-link" onClick={() => navigate('/auth/forgot')}>
              לחץ כאן לשחזור
            </span>
          </div>
        </div>

        <div className="login-image">
          <img src={loginImage} alt="איור התחברות" />
        </div>
      </div>

      <DisclaimerModal 
        isOpen={showDisclaimer} 
        onClose={handleDisclaimerClose}
      />
    </>
  );
};

export default Login;
