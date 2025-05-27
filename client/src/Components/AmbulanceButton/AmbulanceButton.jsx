import React from 'react';
import './AmbulanceButton.css';
import ambulanceIcon from '../../assets/ambulance.png'; // adjust path if needed
const AmbulanceButton = () => {
  return (
    <button className="ambulance-button">
      <img src={ambulanceIcon} alt="Ambulance" className="ambulance-icon" />
    </button>
  );
};

export default AmbulanceButton;