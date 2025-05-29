import React, { useState } from 'react';
import './../AuthForm.css';
import loginImage from '../../../assets/login-illustration.png';
import { FaUser, FaLock } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCloseCircle } from 'react-icons/ai';

import { auth } from '../../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/userStore';

import { toast } from 'react-toastify';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const setUsernameGlobal = useUserStore((state) => state.setUsername);

  const togglePassword = () => setShowPassword(!showPassword);
  const clearEmail = () => setEmail('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('אנא מלא את כל השדות');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const username = user.displayName || user.email;
      setUsernameGlobal(username);

      toast.success('התחברת בהצלחה!');
      navigate('/home');
    } catch (err) {
      console.error(err);
      toast.error('שגיאה בעת הכניסה: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={loginImage} alt="Login Illustration" />
      </div>

      <div className="login-form">
        <h1>עמותת ותיקי מטה יהודה</h1>
        <p>!הזדהות וכניסה למערכת</p>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
            <FaLock className="input-icon" />
            <span className="toggle-password" onClick={togglePassword}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button type="submit">כניסה</button>
        </form>
<p className="register-prompt">
  אין לך חשבון?
  <span className="register-link" onClick={() => navigate('/auth/register')}>
    הרשם עכשיו
  </span>
</p>
<p className="register-prompt">
  שכחת סיסמה?
  <span className="register-link" onClick={() => navigate('/auth/forgot')}>
    לחץ כאן
  </span>
</p>
      </div>
    </div>
  );
};

export default Login;
