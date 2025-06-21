import React, { useState } from "react";
import PatientsList from "./PatientsList/PatientsList";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import MedicalInfo from "./MedicalInfo/MedicalInfo";
import HomeB from "../../Components/HomeB/HomeB";
import homeIcon from "../../assets/Home.png";
import { Link } from "react-router-dom";
//added 

const Patients = () => {
  const [step, setStep] = useState("list"); // ← مباشرة على القائمة
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const handleBack = () => {
    if (step === "medical") setStep("list");
    else if (step === "personal") setStep("list");
  };

  return (
    <div className="p-4">
      {/* زر الرجوع للصفحة الرئيسية */}
     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
  <Link to="/home">
    <HomeB
      image={homeIcon}
      title="מטה יהודה"
      plain
      style={{ width: "100px", height: "auto", cursor: "pointer" }}
    />
  </Link>
</div>

      {step === "list" && (
        <PatientsList
          onSelectPatient={(id, nextStep) => {
            setSelectedPatientId(id);
            setStep(nextStep);
          }}
          onBack={handleBack}
        />
      )}

      {step === "personal" && selectedPatientId && (
        <PersonalInfo
          patientId={selectedPatientId}
          onNext={() => setStep("medical")}
          onBack={handleBack}
        />
      )}

      {step === "medical" && selectedPatientId && (
        <MedicalInfo
          patientId={selectedPatientId}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Patients;
