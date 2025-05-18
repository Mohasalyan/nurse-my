// src/App.jsx
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Auth from './pages/Auth/Auth';
import Register from './pages/Auth/Register/Register';
import HomePage from './pages/HomePage/HomePage';
import DailyTest from './pages/DailyTest/DailyTest';
import PatientRec from './pages/PatientRec/PatientRec';
import PastPatientsPage from './pages/PastPatientsPage/PastPatientsPage';
import TestList from './pages/TestList/TestList';
import MiniMentalForm from './pages/MiniMental/MiniMentalForm';
import MiniMentalHistory from './pages/MiniMental/MiniMentalHistory';
import MedicationTracking from './pages/MedicationTracking/MedicationTracking';


function RequireAuth({ children }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>טוען...</div>;

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      {/* Toastify */}
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED */}
        {/* תומך גם ב־/minimental ללא פרמטר */}
        <Route
          path="/minimental"
          element={
            <RequireAuth>
              <MiniMentalForm />
            </RequireAuth>
          }
        />

        <Route
          path="/home"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/dailytest"
          element={
            <RequireAuth>
              <DailyTest />
            </RequireAuth>
          }
        />
        <Route
          path="/patientrec"
          element={
            <RequireAuth>
              <PatientRec />
            </RequireAuth>
          }
        />
        <Route
          path="/pastrec"
          element={
            <RequireAuth>
              <PastPatientsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/testlist"
          element={
            <RequireAuth>
              <TestList />
            </RequireAuth>
          }
        />

        {/* Mini-Mental עם ובלי פרמטר */}
        <Route
          path="/folder/:patientId/mini-mental"
          element={
            <RequireAuth>
              <MiniMentalForm />
            </RequireAuth>
          }
        />
        
        <Route
          path="/folder/:patientId/mini-mental/history"
          element={
            <RequireAuth>
              <MiniMentalHistory />
            </RequireAuth>
          }
        />
        <Route
          path="/medication"
          element={
            <RequireAuth>
              <MedicationTracking />
            </RequireAuth>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: 'center', marginTop: 50 }}>
              404 – הדף לא נמצא
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
