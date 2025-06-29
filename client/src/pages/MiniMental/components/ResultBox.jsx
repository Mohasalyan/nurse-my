import React from 'react';
import './ResultBox.css';

const ResultBox = ({ score, maxScore }) => {
  const pct = ((score / maxScore) * 100).toFixed(0);

  const getMentalState = (score) => {
    if (score >= 24) {
      return {
        state: 'מצב מנטלי תקין',
        color: '#22c55e', // green
        className: 'status-good'
      };
    } else if (score >= 18) {
      return {
        state: 'סימנים של דמנציה או אלצהיימר',
        color: '#f97316', // orange
        className: 'status-warning'
      };
    } else {
      return {
        state: 'דיספונקציונליות מוחית חמורה',
        color: '#ef4444', // red
        className: 'status-severe'
      };
    }
  };

  const { state, color, className } = getMentalState(score);

  return (
    <div className={`result-box ${className}`}>
      <h2>תוצאה: {score} / {maxScore}</h2>
      <p>אחוזים: {pct}%</p>
      <div className="mental-state" style={{ color }}>
        <p className="state-text">{state}</p>
      </div>
    </div>
  );
};

export default ResultBox;
