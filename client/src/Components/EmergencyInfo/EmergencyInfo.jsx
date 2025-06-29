import React from 'react';
import './EmergencyInfo.css';

const EmergencyInfo = ({ patient, onClose }) => {
  if (!patient) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="emergency-info-overlay">
      <div className="emergency-info-modal">
        <div className="emergency-info-header">
          <h2>מידע חירום - {patient.firstName} {patient.lastName}</h2>
          <div className="header-actions">
            <button className="print-button" onClick={handlePrint}>
              🖨️ הדפסה
            </button>
            <button className="close-button" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="emergency-info-content print-content">
          <div className="print-header">
            <h1>דף מידע חירום</h1>
            <div className="print-date">תאריך הדפסה: {new Date().toLocaleDateString('he-IL')}</div>
          </div>
          
          <div className="info-section">
            <h3>פרטים אישיים</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>תעודת זהות:</label>
                <span>{patient.id}</span>
              </div>
              <div className="info-item">
                <label>תאריך לידה:</label>
                <span>{patient.birthDate}</span>
              </div>
              <div className="info-item">
                <label>טלפון:</label>
                <span>{patient.phone}</span>
              </div>
              <div className="info-item">
                <label>כתובת:</label>
                <span>{patient.address}</span>
              </div>
              <div className="info-item">
                <label>קופת חולים:</label>
                <span>{patient.hmoClinic}</span>
              </div>
              <div className="info-item">
                <label>סניף קופ"ח:</label>
                <span>{patient.hmoBranch}</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>מידע רפואי חיוני</h3>
            <div className="info-grid">
              <div className="info-item full-width">
                <label>אלרגיות ורגישויות:</label>
                <span>{patient.allergies || 'אין'}</span>
              </div>
              <div className="info-item full-width">
                <label>אבחנות עיקריות:</label>
                <span>
                  {patient.mainDiagnoses?.filter(d => d).join(', ') || 'אין'}
                </span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>אנשי קשר לחירום</h3>
            <div className="contacts-list">
              {patient.contacts?.map((contact, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-header">
                    <strong>{contact.name}</strong>
                    {contact.relationship && <span>({contact.relationship})</span>}
                  </div>
                  <div className="contact-details">
                    {contact.phone && <span>טלפון: {contact.phone}</span>}
                    {contact.mobile && <span>נייד: {contact.mobile}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {patient.emergencyService?.companyName && (
            <div className="info-section">
              <h3>שירותי חירום</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>חברה:</label>
                  <span>{patient.emergencyService.companyName}</span>
                </div>
                <div className="info-item">
                  <label>שעות פעילות:</label>
                  <span>{patient.emergencyService.hours}</span>
                </div>
                <div className="info-item">
                  <label>ימי ביקור:</label>
                  <span>{patient.emergencyService.visitingDays}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyInfo; 