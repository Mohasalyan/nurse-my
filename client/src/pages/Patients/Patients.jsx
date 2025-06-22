import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PatientsList from "./PatientsList/PatientsList";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import MedicalInfo from "./MedicalInfo/MedicalInfo";
import './Patients.css';

const Patients = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('personal');

  // Determine the initial step based on whether we have an ID
  const [step, setStep] = useState(id ? "personal" : "list");
  const [selectedPatientId, setSelectedPatientId] = useState(id || null);

  // Handle direct navigation and folder icon clicks
  useEffect(() => {
    if (location.pathname === '/Patients') {
      setStep("list");
      setSelectedPatientId(null);
      setActiveTab('personal');
    }
  }, [location.pathname]);

  // Handle patient selection
  const handlePatientSelect = (patientId, nextStep) => {
    setSelectedPatientId(patientId);
    setStep(nextStep);
  };

  // Handle navigation back to list
  const handleNavigateToList = () => {
    navigate('/Patients', { replace: true });
  };

  const renderContent = () => {
    if (step === "list") {
      return (
        <PatientsList
          onSelectPatient={handlePatientSelect}
        />
      );
    }

    return (
      <div className="patient-info-container">
        <div className="info-header">
          <h1 className="page-title">מידע מטופל</h1>
          <div className="info-actions">
            <button
              className={`toggle-button ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              פרטים אישיים
            </button>
            <button
              className={`toggle-button ${activeTab === 'medical' ? 'active' : ''}`}
              onClick={() => setActiveTab('medical')}
            >
              מידע רפואי
            </button>
          </div>
        </div>
        
        {activeTab === 'personal' ? (
          <PersonalInfo
            patientId={selectedPatientId}
            onNavigateToList={handleNavigateToList}
          />
        ) : (
          <MedicalInfo
            patientId={selectedPatientId}
            onNavigateToList={handleNavigateToList}
          />
        )}
      </div>
    );
  };

  return (
    <div className="patients-container" dir="rtl">
      {renderContent()}
    </div>
  );
};

export default Patients;
