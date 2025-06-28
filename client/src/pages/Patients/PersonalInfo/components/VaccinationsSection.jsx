import React from 'react';
import './VaccinationsSection.css';

const VaccinationsSection = ({ vaccinations, onChange }) => {
  const handleVaccinationChange = (index, field, value) => {
    const newVaccinations = [...vaccinations];
    newVaccinations[index] = { ...newVaccinations[index], [field]: value };
    onChange(newVaccinations);
  };

  const addVaccination = () => {
    onChange([...vaccinations, {
      date: "",
      type: "",
    }]);
  };

  const removeVaccination = (index) => {
    const newVaccinations = vaccinations.filter((_, i) => i !== index);
    onChange(newVaccinations);
  };

  return (
    <div className="section-box">
      <div className="section-title">חיסונים</div>
      <div className="vaccinations-container">
        <div className="vaccinations-header">
          <div className="header-item">תאריך</div>
          <div className="header-item">סוג החיסון</div>
          <div className="header-item actions"></div>
        </div>
        {vaccinations.map((vaccination, index) => (
          <div key={index} className="vaccination-item">
            <div className="vaccination-field">
              <input
                type="date"
                value={vaccination.date}
                onChange={(e) => handleVaccinationChange(index, 'date', e.target.value)}
              />
            </div>
            <div className="vaccination-field">
              <input
                value={vaccination.type}
                onChange={(e) => handleVaccinationChange(index, 'type', e.target.value)}
                placeholder="סוג החיסון"
              />
            </div>
            <div className="vaccination-field actions">
              <button 
                type="button" 
                className="remove-vaccination-button"
                onClick={() => removeVaccination(index)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
        <button 
          type="button" 
          className="add-vaccination-button"
          onClick={addVaccination}
        >
          ➕ הוסף חיסון
        </button>
      </div>
    </div>
  );
};

export default VaccinationsSection; 