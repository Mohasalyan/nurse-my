import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const searchRef = useRef(null);
  const ambulanceButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPatientSearch &&
          searchRef.current &&
          ambulanceButtonRef.current &&
          !searchRef.current.contains(event.target) &&
          !ambulanceButtonRef.current.contains(event.target)) {
        setShowPatientSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPatientSearch]);

  // Close search when location changes
  useEffect(() => {
    setShowPatientSearch(false);
  }, [location]);

  const handleAmbulanceClick = () => {
    setShowPatientSearch(!showPatientSearch);
  };

  const navButtons = [
    { to: '/minimental', icon: brainIcon, title: 'Mini Mental', hebrewTitle: 'מינימנטל' },
    { to: '/Patients', icon: patientFolderIcon, title: 'Patients', hebrewTitle: 'מטופלים' },
    { to: '/medication', icon: medicineIcon, title: 'Medications', hebrewTitle: 'תרופות' },
    { to: '/followup-list', icon: medicalReportIcon, title: 'Medical Info', hebrewTitle: 'מעקב' },
    { to: '/dailytest', icon: heartRateIcon, title: 'Daily Test', hebrewTitle: 'בדיקה' },
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
              className={`nav-button ${location.pathname === button.to ? 'active' : ''}`}
              title={button.title}
            >
              <div className="nav-button-content">
                <img src={button.icon} alt={button.title} />
                <span className="nav-button-text">{button.hebrewTitle}</span>
              </div>
            </Link>
          ))}
          <div 
            className="nav-button" 
            onClick={handleAmbulanceClick}
            ref={ambulanceButtonRef}
          >
            <div className="nav-button-content">
              <AmbulanceButton />
              <span className="nav-button-text">חירום</span>
            </div>
          </div>
        </div>
      </nav>

      {showPatientSearch && (
        <div className="patient-search-overlay" ref={searchRef}>
          <PatientSearch onClose={() => setShowPatientSearch(false)} />
        </div>
      )}
    </>
  );
};

export default Navigation; 