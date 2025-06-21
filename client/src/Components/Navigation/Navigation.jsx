import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Exit from '../Exit/Exit';
import AmbulanceButton from '../AmbulanceButton/AmbulanceButton';
import PatientSearch from '../PatientSearch/PatientSearch';
import './Navigation.css';
import homeIcon from '../../assets/Home.png';
import medicalReportIcon from '../../assets/medicalReport.png';
import patientFolderIcon from '../../assets/PatientFolder.png';
import medicineIcon from '../../assets/medicine.png';
import heartRateIcon from '../../assets/HeartRate.png';
import brainIcon from '../../assets/brainPic.png';

const Navigation = () => {
  const [showPatientSearch, setShowPatientSearch] = useState(false);

  const handleAmbulanceClick = () => {
    setShowPatientSearch(!showPatientSearch);
  };
  const navButtons = [
    { to: '/minimental', icon: brainIcon, title: 'Mini Mental' },
    { to: '/Patients', icon: patientFolderIcon, title: 'Patients' },
    { to: '/medication', icon: medicineIcon, title: 'Medications' },
    { to: '/followup-list', icon: medicalReportIcon, title: 'Medical Info' },
    { to: '/dailytest', icon: heartRateIcon, title: 'Daily Test' },
  ];

  return (
    <>
      <nav className="navigation-bar">
        <div className="nav-section left">
          <Exit />
        </div>
        
        <div className="nav-section center">
          <Link to="/home">
            <img src={homeIcon} alt="Home" title="Home" />
          </Link>
        </div>
        
        <div className="nav-section right">
          {navButtons.map((button, index) => (
            <Link 
              key={index} 
              to={button.to} 
              className="nav-button"
              title={button.title}
            >
              <img src={button.icon} alt={button.title} />
            </Link>
          ))}
          <div className="nav-button">
            <AmbulanceButton onClick={handleAmbulanceClick} />
          </div>
        </div>
      </nav>

      {showPatientSearch && (
        <div className="patient-search-overlay">
          <PatientSearch onClose={() => setShowPatientSearch(false)} />
        </div>
      )}
    </>
  );
};

export default Navigation; 