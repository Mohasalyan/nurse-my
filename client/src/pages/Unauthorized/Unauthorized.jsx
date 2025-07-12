import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem',
      color: '#333'
    }}>
      <h1>🚫 אין לך גישה לעמוד זה</h1>
      <p style={{ marginTop: '1rem', fontSize: '18px' }}>
        ייתכן ואתה לא מחובר או שאין לך הרשאות מתאימות.
      </p>
      <button
        onClick={() => navigate('/home')}
        style={{
          marginTop: '2rem',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        חזרה לדף הבית
      </button>
    </div>
  );
};

export default Unauthorized;
