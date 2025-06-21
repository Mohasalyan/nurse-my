import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import medicationImg from "../../assets/medicine.png";
import trackingImg from "../../assets/medicalReport.png";
import brainImg from "../../assets/brainPic.png";
import patientsImg from "../../assets/PatientFolder.png";
import heartMonitorImg from "../../assets/HeartRate.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./HomePage.css";

const HomePage = () => {
  const [displayName, setDisplayName] = useState("מִשׁתַמֵשׁ");
  const [hasFollowUps, setHasFollowUps] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName || user.email || "מִשׁתַמֵשׁ");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkFollowUps = async () => {
      const snapshot = await getDocs(collection(db, 'patients'));
      for (const doc of snapshot.docs) {
        const p = doc.data();
        const vitals = p.medical?.vitalSigns || {};
        const sysDia = vitals.bloodPressure?.split('/').map(Number);
        const sugar = parseFloat(vitals.sugar);
        const pulse = parseInt(vitals.pulse);
        const bmi = parseFloat(vitals.bmi);

        if (
          (sysDia && (sysDia[0] > 140 || sysDia[0] < 90 || sysDia[1] > 90 || sysDia[1] < 60)) ||
          (sugar > 180 || sugar < 70) ||
          (pulse < 60 || pulse > 100) ||
          (bmi >= 30)
        ) {
          setHasFollowUps(true);
          return;
        }
      }
    };
    checkFollowUps();
  }, []);

  return (
    <div className="homepage">
      {hasFollowUps && (
        <div className="followup-alert">
          ⚠️ ישנם מטופלים ברשימת המעקב שעדיין לא טופלו!
        </div>
      )}

      <h2 className="welcome-message">ברוך הבא, {displayName}!</h2>

      <div className="card-grid">
        <div className="left-cards">
          <Card image={medicationImg} title="תרופות" to="/medication" />
          <Card image={trackingImg} title="רשימת מעקב" to="/followup-list" />
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
