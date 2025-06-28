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
import Navigation from './Components/Navigation/Navigation';
import Footer from './Components/ui/Footer/Footer';

// صفحات عامة
import Auth from './pages/Auth/Auth';
import Register from './pages/Auth/Register/Register';

// صفحات محمية
import HomePage from './pages/HomePage/HomePage';
import DailyTest from './pages/DailyTest/DailyTest';
import TestList from './pages/TestList/TestList';
import MiniMentalForm from './pages/MiniMental/MiniMentalForm';
import MiniMentalHistory from './pages/MiniMental/MiniMentalHistory';
import MedicationTracking from './pages/MedicationTracking/MedicationTracking';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import FollowUpList from './pages/FollowUpTests/FollowUpList';
import Patients from './pages/Patients/Patients';

function ProtectedLayout({ children }) {
  return (
    <div className="app-layout">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

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

  return <ProtectedLayout>{children}</ProtectedLayout>;
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        {/* مسارات عامة */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/auth/forgot" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />

        {/* مسارات محمية */}
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
          path="/testlist"
          element={
            <RequireAuth>
              <TestList />
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

        {/* Mini Mental */}
        <Route
          path="/minimental"
          element={
            <RequireAuth>
              <MiniMentalForm />
            </RequireAuth>
          }
        />
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
          path="/patients"
          element={
            <RequireAuth>
              <Patients />
            </RequireAuth>
          }
        />
        <Route
          path="/followup-list"
          element={
            <RequireAuth>
              <FollowUpList />
            </RequireAuth>
          }
        />

        {/* صفحة غير موجودة */}
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