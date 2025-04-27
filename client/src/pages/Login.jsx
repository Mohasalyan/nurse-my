// src/pages/Login.jsx
import React from 'react';
import './Login.css'; // We will create this file
import loginImage from '../assets/login-illustration.png'; // update the path

const Login = () => {
  return (
    <div className="login-container">
      {/* Left Side - Image */}
      <div className="login-image">
        <img src={loginImage} alt="Login Illustration" />
      </div>

      {/* Right Side - Form */}
      <div className="login-form">
        <h1>עמותת ותיקי מטה יהודה</h1>
        <p>הזדהות וכניסה למערכת !</p>
        <form>
          <input type="text" placeholder="שם משתמש" />
          <input type="password" placeholder="סיסמה" />
          <button type="submit">כניסה</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
