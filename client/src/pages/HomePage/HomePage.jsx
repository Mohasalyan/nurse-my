import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import Exit from "../../Components/Exit/Exit";
import HomeB from "../../Components/HomeB/HomeB";
import medicationImg from "../../assets/medicine.png";
import trackingImg from "../../assets/medicalReport.png";
import brainImg from "../../assets/brainPic.png";
import patientsImg from "../../assets/PatientFolder.png";
import heartMonitorImg from "../../assets/HeartRate.png";
import homeIcon from "../../assets/Home.png";
import "./HomePage.css";
import AmbulanceButton from '../../Components/AmbulanceButton/AmbulanceButton';


import { getAuth, onAuthStateChanged } from "firebase/auth";

const HomePage = () => {
  const [displayName, setDisplayName] = useState("מִשׁתַמֵשׁ");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName || user.email || "מִשׁתַמֵשׁ");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="homepage">
      <div className="exit-icon">
        <Exit title="יציאה" to="/login" />
      </div>
        
        
 <div>
      <AmbulanceButton />
    </div>




      <div className="home">
        <HomeB image={homeIcon} style={{ width: "55px", height: "55px" }} to="/home" />
      </div>

      <h2 className="welcome-message">ברוך הבא, {displayName}!</h2>

      <div className="card-grid">
        <div className="left-cards">
          <Card image={medicationImg} title="תרופות" to="/medication" />
          <Card image={trackingImg} title="רשימת מעקב" to="/testlist" />
          <Card image={brainImg} title="מינימנטל" to="/minimental" />
          <Card image={patientsImg} title="תיקי חולים" to="/Patients" />
        </div>

        <div className="big-card">
          <Card
            image={heartMonitorImg}
            title="בדיקה חדשה"
            to="/dailytest"
            style={{ width: "440px", height: "430px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
