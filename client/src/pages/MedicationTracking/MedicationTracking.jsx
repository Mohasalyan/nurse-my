import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MedicationTracking.css';
import homeIcon from '../../assets/Home.png';

const initialData = [
  { name: '', medication: '', dose: '', taken: true },
  { name: '', medication: '', dose: '', taken: true },
  { name: '', medication: '', dose: '', taken: true },
  { name: '', medication: '', dose: '', taken: true },
];

const MedicationTracking = () => {
  const [data, setData] = useState(initialData);

  const toggleTaken = (index) => {
    const updated = [...data];
    updated[index].taken = !updated[index].taken;
    setData(updated);
  };

  return (
    <div className="medication-page">
      <div className="exit-button left">
        <Link to="/login">יציאה</Link>
      </div>

      <div className="home-button">
        <Link to="/home">
          <img src={homeIcon} alt="home" />
        </Link>
      </div>

      <h2>מעקב תרופות</h2>

      <div className="table">
        <div className="table-header">
          <span>שם המטופל</span>
          <span>שם התרופה</span>
          <span>מינון</span>
          <span></span>
        </div>

        {data.map((item, index) => (
          <div className="table-row" key={index}>
            <span className="cell orange"></span>
            <span className="cell orange"></span>
            <span className="cell orange"></span>
            <button
              className={`checkmark-button ${item.taken ? 'green' : 'red'}`}
              onClick={() => toggleTaken(index)}
            >
              {item.taken ? '✔' : '✘'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationTracking;
