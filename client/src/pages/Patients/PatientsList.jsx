// src/pages/Patients/PatientsList.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import HomeB from "../../Components/HomeB/HomeB";
import homeIcon from "../../assets/Home.png";
import Exit from "../../Components/Exit/Exit";
import "./PatientsList.css";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      const snapshot = await getDocs(collection(db, "patients"));
      setPatients(snapshot.docs.map(doc => doc.data()));
    };
    fetchPatients();
  }, []);

  const filtered = patients.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.id?.includes(search)
  );

  return (
    <div className="patients-list-page">
      <div className="exit-icon">
        <Exit title="יציאה" to="/login" />
      </div>

      <div className="home-icon">
        <HomeB image={homeIcon} style={{ width: 50, height: 50 }} to="/home" />
      </div>

      <h2 className="patients-title">רשימת מטופלים</h2>

      <input
        type="text"
        placeholder="חיפוש לפי שם או ת.ז"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="patients-search"
      />

      <ul className="patients-list">
        {filtered.map((p, i) => (
          <li key={i} className="patient-item">
            <strong>{p.name}</strong><br />
            ת.ז: {p.id} | גיל: {p.age} | כתובת: {p.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientsList;
