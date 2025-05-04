import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './pages/Login/Login.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import PatientRec from './pages/PatientRec/PatientRec.jsx';
import PastPatientsPage from './pages/PastPatientsPage/PastPatientsPage.jsx';
import DailyTest from './pages/DailyTest/DailyTest.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* إعادة توجيه من "/" إلى "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* الصفحات */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/patientrec" element={<PatientRec />} />
        <Route path="/pastrec" element={<PastPatientsPage />} />
        <Route path="/dailytest" element={<DailyTest />} />
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
