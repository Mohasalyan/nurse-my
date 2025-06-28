import React from 'react';
import './HospitalizationsSection.css';

const HospitalizationsSection = ({ hospitalizations, onChange }) => {
  const handleHospitalizationChange = (index, field, value) => {
    const newHospitalizations = [...hospitalizations];
    newHospitalizations[index] = { ...newHospitalizations[index], [field]: value };
    onChange(newHospitalizations);
  };

  const addHospitalization = () => {
    onChange([...hospitalizations, {
      date: "",
      details: "",
    }]);
  };

  const removeHospitalization = (index) => {
    const newHospitalizations = hospitalizations.filter((_, i) => i !== index);
    onChange(newHospitalizations);
  };

  return (
    <div className="section-box">
      <div className="section-title">תולדות מחלה/ניתוחים ואשפוזים</div>
      <div className="hospitalizations-container">
        <div className="hospitalizations-header">
          <div className="header-item">תאריך</div>
          <div className="header-item">פרטים</div>
          <div className="header-item actions"></div>
        </div>
        {hospitalizations.map((hospitalization, index) => (
          <div key={index} className="hospitalization-item">
            <div className="hospitalization-field">
              <input
                type="date"
                value={hospitalization.date}
                onChange={(e) => handleHospitalizationChange(index, 'date', e.target.value)}
              />
            </div>
            <div className="hospitalization-field">
              <textarea
                value={hospitalization.details}
                onChange={(e) => handleHospitalizationChange(index, 'details', e.target.value)}
                placeholder="פרטי האשפוז/ניתוח"
                rows={2}
              />
            </div>
            <div className="hospitalization-field actions">
              <button 
                type="button" 
                className="remove-hospitalization-button"
                onClick={() => removeHospitalization(index)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
        <button 
          type="button" 
          className="add-hospitalization-button"
          onClick={addHospitalization}
        >
          ➕ הוסף אשפוז/ניתוח
        </button>
      </div>
    </div>
  );
};

export default HospitalizationsSection; 