import React, { useState } from "react";
import PatientsList from "./PatientsList/PatientsList";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import MedicalInfo from "./MedicalInfo/MedicalInfo";
import HomeB from "../../Components/HomeB/HomeB";
import homeIcon from "../../assets/Home.png";
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
      <div className="top-home-button">
        <HomeB image={homeIcon} to="/home" style={{ width: "50px", height: "50px" }} />
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
