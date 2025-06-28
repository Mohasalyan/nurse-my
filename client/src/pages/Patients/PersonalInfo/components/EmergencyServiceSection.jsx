import React from 'react';
import './EmergencyServiceSection.css';

const EmergencyServiceSection = ({ service, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...service, [field]: value });
  };

  return (
    <div className="section-box">
      <div className="section-title">שרות מס"ב</div>
      <div className="form-grid">
        <div className="form-field">
          <label>שם חברה</label>
          <input
            value={service.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>שעות</label>
          <input
            value={service.hours}
            onChange={(e) => handleChange('hours', e.target.value)}
          />
        </div>
        <div className="form-field checkbox-field">
          <label>
            <input
              type="checkbox"
              checked={service.networkReceiver}
              onChange={(e) => handleChange('networkReceiver', e.target.checked)}
            />
            מקבל ברשת
          </label>
        </div>
        <div className="form-field checkbox-field">
          <label>
            <input
              type="checkbox"
              checked={service.hasUsers}
              onChange={(e) => handleChange('hasUsers', e.target.checked)}
            />
            משתמשים
          </label>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServiceSection; 