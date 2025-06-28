import React from 'react';
import './EmergencyServiceSection.css';

const EmergencyServiceSection = ({ service, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...service, [field]: value });
  };

  return (
    <div className="section-box">
      <div className="section-title">שרות מט"ב</div>
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
        <div className="form-field">
          <label>מבקר בימים</label>
          <input
            value={service.visitingDays}
            onChange={(e) => handleChange('visitingDays', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyServiceSection; 