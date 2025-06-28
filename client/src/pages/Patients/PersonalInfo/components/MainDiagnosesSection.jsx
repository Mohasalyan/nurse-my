import React from 'react';
import './MainDiagnosesSection.css';

const MainDiagnosesSection = ({ diagnoses, onChange }) => {
  const handleChange = (index, value) => {
    const newDiagnoses = [...diagnoses];
    newDiagnoses[index] = value;
    onChange(newDiagnoses);
  };

  return (
    <div className="section-box">
      <div className="section-title">אבחנות עיקריות</div>
      <div className="diagnoses-container">
        {diagnoses.map((diagnosis, index) => (
          <div key={index} className="diagnosis-item">
            <label>{index + 1}</label>
            <input
              value={diagnosis}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`אבחנה ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainDiagnosesSection; 