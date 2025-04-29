import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// صحيح الآن
import Login from './pages/Login/Login.jsx';
import HomePage from './pages/HomePage/HomePage'; // أيضاً لو حابب تستخدمها
import PatientRec from './pages/PatientRec/PatientRec.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/patientrec" element={<PatientRec />} />
      </Routes>
    </Router>
  );
}

export default App;

// src/App.jsx
// import HomePage from './pages/HomePage';

// function App() {
//   return (
//     <div className="App">
//       <HomePage />
//     </div>
//   );
// }

// export default App;
