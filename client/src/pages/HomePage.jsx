// src/pages/HomePage.jsx
import React from "react";
import Card from "../Components/Card";
import medicationImg from "../assets/medicine.png";  // ضع اسم الصورة الصحيح
import trackingImg from "../assets/medicalReport.png";       
import brainImg from "../assets/brainPic.png";             
import patientsImg from "../assets/PatientFolder.png";       
import heartMonitorImg from "../assets/HeartRate.png"; 
import homeIcon from "../assets/Home.png";

import "./HomePage.css";  // سنعمل له ملف CSS خارجي كمان

const HomePage = () => {
  return (
    <div className="homepage">
      {/* زر الخروج */}
      <button className="logout-button">יציאה</button>

      {/* زر الهوم */}
      <div className="home-icon">
      <img src={homeIcon} alt="Home" />
      </div>

      {/* الشبكة */}
      <div className="card-grid">
  <div className="left-cards">
    <Card image={medicationImg} title="תרופות" />
    <Card image={trackingImg} title="רשימת מעקב" />
    <Card image={brainImg} title="מינימנטל" />
    <Card image={patientsImg} title="תיקי חולים" />
  </div>

  <div className="big-card">
    <img src={heartMonitorImg} alt="בדיקה חדשה" className="card-image" />
    <h3 className="card-title">בדיקה חדשה</h3>
  </div>
</div>

    </div>
  );
};

export default HomePage;
