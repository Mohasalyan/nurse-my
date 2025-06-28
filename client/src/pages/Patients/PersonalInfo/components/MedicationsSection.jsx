import React from 'react';
import './MedicationsSection.css';

const MedicationsSection = ({ medications, onChange }) => {
  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    onChange(newMedications);
  };

  const addMedication = () => {
    onChange([...medications, {
      name: "",
      dosage: "",
      frequency: "",
    }]);
  };

  const removeMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    onChange(newMedications);
  };

  return (
    <div className="section-box">
      <div className="section-title">תרופות קבועות</div>
      <div className="medications-container">
        {medications.map((medication, index) => (
          <div key={index} className="medication-item">
            {index > 0 && (
              <button 
                type="button" 
                className="remove-medication-button"
                onClick={() => removeMedication(index)}
              >
                ❌ הסר תרופה
              </button>
            )}
            <div className="form-grid">
              <div className="form-field">
                <label>שם התרופה</label>
                <input
                  value={medication.name}
                  onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                  placeholder="שם התרופה"
                />
              </div>
              <div className="form-field">
                <label>מינון</label>
                <input
                  value={medication.dosage}
                  onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                  placeholder="מינון"
                />
              </div>
              <div className="form-field">
                <label>תדירות</label>
                <input
                  value={medication.frequency}
                  onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                  placeholder="תדירות"
                />
              </div>
            </div>
          </div>
        ))}
        <button 
          type="button" 
          className="add-medication-button"
          onClick={addMedication}
        >
          ➕ הוסף תרופה
        </button>
      </div>
    </div>
  );
};

export default MedicationsSection; 