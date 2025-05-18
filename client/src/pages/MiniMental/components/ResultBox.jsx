import React from 'react';
import './ResultBox.css';

const ResultBox = ({ score, maxScore }) => {
  const pct = ((score / maxScore) * 100).toFixed(0);
  return (
    <div className="result-box">
      <h2>תוצאה: {score} / {maxScore}</h2>
      <p>אחוזים: {pct}%</p>
    </div>
  );
};

export default ResultBox;
