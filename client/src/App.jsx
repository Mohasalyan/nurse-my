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

import Auth from './pages/Auth/Auth';
import Register from './pages/Auth/Register/Register';
import HomePage from './pages/HomePage/HomePage';
import DailyTest from './pages/DailyTest/DailyTest';
import TestList from './pages/TestList/TestList';
import MiniMentalForm from './pages/MiniMental/MiniMentalForm';
import MiniMentalHistory from './pages/MiniMental/MiniMentalHistory';
import MedicationTracking from './pages/MedicationTracking/MedicationTracking';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import FollowUpList from './pages/FollowUpTests/FollowUpList';
import Patients from './pages/Patients/Patients';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

import useUserRole from './hooks/useUserRole';
import Unauthorized from './pages/Unauthorized/Unauthorized';

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

function RequireAuth({ children, allowedRoles = ["nurse", "admin"] }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const { role, loading: roleLoading } = useUserRole(user);

  if (authLoading || roleLoading) return <div>🔐 جارٍ التحقق...</div>;

  console.log("🔍 الحالة:", { user, role, allowedRoles });

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
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
        <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
        <Route path="/dailytest" element={<RequireAuth><DailyTest /></RequireAuth>} />
        <Route path="/testlist" element={<RequireAuth><TestList /></RequireAuth>} />
        <Route path="/medication" element={<RequireAuth><MedicationTracking /></RequireAuth>} />
        <Route path="/minimental" element={<RequireAuth><MiniMentalForm /></RequireAuth>} />
        <Route path="/folder/:patientId/mini-mental" element={<RequireAuth><MiniMentalForm /></RequireAuth>} />
        <Route path="/folder/:patientId/mini-mental/history" element={<RequireAuth><MiniMentalHistory /></RequireAuth>} />
        <Route path="/patients" element={<RequireAuth><Patients /></RequireAuth>} />
        <Route path="/followup-list" element={<RequireAuth><FollowUpList /></RequireAuth>} />

        {/* للأدمن فقط */}
        <Route path="/dashboard" element={<RequireAuth allowedRoles={["admin"]}><Dashboard /></RequireAuth>} />
        <Route path="/admin-dashboard" element={<RequireAuth allowedRoles={["admin"]}><AdminDashboard /></RequireAuth>} />

        {/* صفحات عامة */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<div style={{ textAlign: 'center', marginTop: 50 }}>404 – הדף לא נמצא</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
