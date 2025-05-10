// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Auth from './pages/Auth/Auth';
import HomePage from './pages/HomePage/HomePage';
import DailyTest from './pages/DailyTest/DailyTest';
import PatientRec from './pages/PatientRec/PatientRec';
import PastPatientsPage from './pages/PastPatientsPage/PastPatientsPage';
import TestList from './pages/TestList/TestList';
import MiniMentalForm from './pages/MiniMental/MiniMentalForm';
import MiniMentalHistory from './pages/MiniMental/MiniMentalHistory';
import Register from './pages/Auth/Register/Register';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/register" element={<Register />} />

        {/* אחרי התחברות */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/dailytest" element={<DailyTest />} />
        <Route path="/patientrec" element={<PatientRec />} />
        <Route path="/pastrec" element={<PastPatientsPage />} />
        <Route path="/testlist" element={<TestList />} />

        {/* MiniMental */}
        <Route path="/minimental" element={<MiniMentalForm />} />
        <Route path="/minimental/history" element={<MiniMentalHistory />} />

        <Route path="*" element={<p>404 – הדף לא נמצא</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
