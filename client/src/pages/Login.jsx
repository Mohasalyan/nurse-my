// src/pages/Login.jsx
import React from 'react';
import './Login.css';
import loginImage from '../assets/login-illustration.png';

const Login = () => {
  return (
    <div className="login-container">
      {/* Left - Image */}
      <div className="login-image">
        <img src={loginImage} alt="Login Illustration" />
      </div>

      {/* Right - Form */}
      <div className="login-form">
        <div className="login-form-content">
          <h1>עמותת ותיקי מטה יהודה</h1>
          <p>הזדהות וכניסה למערכת !</p>
          <form>
            <input type="text" placeholder="שם משתמש" />
            <input type="password" placeholder="סיסמה" />
            <button type="submit">כניסה</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
