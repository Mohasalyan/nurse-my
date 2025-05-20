// ✅ Patients.jsx
import React, { useState } from "react";
import Index from "./index/index";
import PatientsList from "./PatientsList/PatientsList";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import MedicalInfo from "./MedicalInfo/MedicalInfo";


const Patients = () => {
  const [step, setStep] = useState("index");
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const handleBack = () => {
    if (step === "medical") setStep("personal");
    else if (step === "personal") setStep("list");
    else if (step === "list") setStep("index");
  };

  return (
    <div className="p-4">
      {step === "index" && (
        <Index onContinue={() => setStep("list")} />
      )}

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