import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import PatientSearch from "../../../Components/PatientSearch/PatientSearch";
import CreatePatient from "../PersonalInfo/CreatePatient";
import "./PatientsList.css";

const getStatusColor = (status) => {
  switch (status) {
    case "פעיל": return "#DFF5E1";  // Light Green - active
    case "לא פעיל":
    case "עזב": return "#FAF3D3";   // Pale Yellow - inactive/left
    case "נפטר": return "#E5E7EB";  // Light Gray with blue tint - deceased
    default: return "#eeeeee";
  }
};

const statusLabels = {
  "פעיל": { text: "✅ מטופלים פעילים", className: "active" },
  "לא פעיל": { text: "👋 מטופלים לא פעילים", className: "left" },
  "נפטר": { text: "🕊️ מטופלים שנפטרו", className: "deceased" }
};

const PatientsList = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  const fetchPatients = async () => {
    const querySnapshot = await getDocs(collection(db, "patients"));
    const data = querySnapshot.docs.map(doc => {
      const patientData = doc.data();
      // Convert old status to new status
      if (patientData.status === "עזב") {
        patientData.status = "לא פעיל";
      }
      return {
        id: doc.id,
        ...patientData,
      };
    });
    setPatients(data);
    setFilteredPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handlePatientSearch = (patient) => {
    if (patient) {
      setFilteredPatients(patients.filter(p => p.id === patient.id));
    } else {
      setFilteredPatients(patients);
    }
  };

  const handlePatientCreated = async (patientId) => {
    await fetchPatients();
    setShowCreateForm(false);
    onSelectPatient(patientId, "personal");
  };

  const renderPatientCard = (patient) => (
    <div
      className="patient-card"
      key={patient.id}
      style={{ backgroundColor: getStatusColor(patient.status) }}
    >
      <div className="card-header">
        <h3 className="patient-name">{patient.name}</h3>
        <div className="status-container">
          {patient.status && (
            <span className="inline-status">{patient.status}</span>
          )}
        </div>
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
  );

  const renderStatusSection = (status) => {
    const statusPatients = filteredPatients.filter(p => p.status === status);
    if (statusPatients.length === 0 && filteredPatients.length === patients.length) {
      return null; // Don't show empty sections when no search is active
    }

    return (
      <div key={status} className="status-section">
        <div className={`status-section-header ${statusLabels[status].className}`}>
          {statusLabels[status].text}
          <span className="status-count">{statusPatients.length}</span>
        </div>
        {statusPatients.length > 0 ? (
          <div className="patients-grid">
            {statusPatients.map(renderPatientCard)}
          </div>
        ) : (
          <div className="empty-section-message">אין מטופלים בקטגוריה זו</div>
        )}
      </div>
    );
  };

  if (showCreateForm) {
    return <CreatePatient onPatientCreated={handlePatientCreated} />;
  }

  return (
    <div className="patients-wrapper">
      <div className="patients-header-container">
        <h2 className="patients-header">ניהול מטופלים</h2>
        <button 
          className="create-patient-button"
          onClick={() => setShowCreateForm(true)}
        >
          ➕ הוספת מטופל חדש
        </button>
      </div>
      
      <div className="search-container">
        <PatientSearch 
          onSelect={handlePatientSearch}
          className="patients-search-component"
        />
      </div>

      {renderStatusSection("פעיל")}
      {renderStatusSection("לא פעיל")}
      {renderStatusSection("נפטר")}
    </div>
  );
};

export default PatientsList;
