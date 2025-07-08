import React from 'react';
import './DisclaimerModal.css';

const DisclaimerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="disclaimer-modal-overlay">
      <div className="disclaimer-modal" dir="rtl">
        <div className="disclaimer-modal-content">
          <h2 className="disclaimer-modal-title">הצהרת אחריות</h2>
          <p className="disclaimer-modal-text">
            ⚠️ מערכת זו פותחה במסגרת פרויקט סטודנטים. האחריות על השימוש בה ועל הנתונים המוזנים במערכת חלה על המשתמש בלבד. אין למפתחים, לצוות הקורס או למוסד האקדמי אחריות על תקלות או תוצאות רפואיות הנובעות מהשימוש.
          </p>
          <button className="disclaimer-modal-button" onClick={onClose}>
            אישור והמשך
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal; 