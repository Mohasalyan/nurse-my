import React, { useState } from 'react';

import './MedicationTracking.css';
import homeIcon from '../../assets/Home.png';
import Exit from "../../Components/Exit/Exit";
import HomeB from "../../Components/HomeB/HomeB";

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
     <div className="exit-icon">
        <Exit
          title="יציאה"
          to="/login" // Replace with the correct path
        />
      </div>

      <div className="home">
        <HomeB
          image={homeIcon}
          style={{ width: "55px", height: "55px" }}
          to="/home"
        />
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
              className={`checkmark-button ${item.taken ? 'red' : 'green'}`}
              onClick={() => toggleTaken(index)}
            >
              {item.taken ? '✘' : '✔'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationTracking;
