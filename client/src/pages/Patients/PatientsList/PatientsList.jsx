import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import PatientSearch from "../../../Components/PatientSearch/PatientSearch";
import "./PatientsList.css";

const getStatusColor = (status) => {
  switch (status) {
    case "פעיל": return "#c8e6c9";
    case "נפטר": return "#ffcdd2";
    case "עזב": return "#fff9c4";
    default: return "#eeeeee";
  }
};

const PatientsList = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const querySnapshot = await getDocs(collection(db, "patients"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(data);
      setFilteredPatients(data);
    };

    fetchPatients();
  }, []);

  const handlePatientSearch = (patient) => {
    if (patient) {
      setFilteredPatients(patients.filter(p => p.id === patient.id));
    } else {
      setFilteredPatients(patients);
    }
  };

  return (
    <div className="patients-wrapper">
      <h2 className="patients-header">ניהול מטופלים</h2>
      
      <div className="search-container">
        <PatientSearch 
          onSelect={handlePatientSearch}
          className="patients-search-component"
        />
      </div>

      <div className="patients-grid">
        {filteredPatients.map((patient) => (
          <div
            className="patient-card"
            key={patient.id}
            style={{ backgroundColor: getStatusColor(patient.status) }}
          >
            <div className="card-header">
              {patient.status && (
                <span className="inline-status">{patient.status}</span>
              )}
              <h3>{patient.name}</h3>
            </div>
            <p>ת.ז: {patient.id}</p>
            <p>טלפון: {patient.phone || "לא זמין"}</p>
            <p>תאריך לידה: {patient.birthDate || "לא זמין"}</p>
            <p>כתובת: {patient.address || "לא זמין"}</p>
            <div className="card-buttons">
              <button
                className="button secondary"
                onClick={() => onSelectPatient(patient.id, "personal")}
              >
                מידע אישי
              </button>
              <button
                className="button"
                onClick={() => onSelectPatient(patient.id, "medical")}
              >
                מידע רפואי
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="patients-back">
        <button className="back-button" onClick={() => navigate("/home")}>
          חזרה
        </button>
      </div>
    </div>
  );
};

export default PatientsList;
