import React from 'react';
import ambulanceIcon from '../../assets/ambulance.png';
import './AmbulanceButton.css';

const AmbulanceButton = ({ onClick }) => {
  return (
    <button className="ambulance-button" onClick={onClick}>
      <img src={ambulanceIcon} alt="Ambulance" />
    </button>
  );
};

export default AmbulanceButton;