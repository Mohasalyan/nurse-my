// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import "./App.css";

import Auth from "./pages/Auth/Auth";
import HomePage from "./pages/HomePage/HomePage.jsx";
import PatientRec from "./pages/PatientRec/PatientRec.jsx";
import PastPatientsPage from "./pages/PastPatientsPage/PastPatientsPage.jsx";
import DailyTest from "./pages/DailyTest/DailyTest.jsx";
import Register from "./pages/Auth/Register/Register";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      {/* ✅ Toastify Container */}
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Navigate to={user ? "/home" : "/auth/login"} replace />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/register" element={<Register />} />

        {user ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/patientrec" element={<PatientRec />} />
            <Route path="/pastrec" element={<PastPatientsPage />} />
            <Route path="/dailytest" element={<DailyTest />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        )}

        <Route
          path="*"
          element={
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h1>404 - הדף לא נמצא</h1>
              <p>הדף שאתה מחפש לא קיים.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
