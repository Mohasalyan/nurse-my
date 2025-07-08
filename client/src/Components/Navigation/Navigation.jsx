import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Exit from '../Exit/Exit';
import AmbulanceButton from '../AmbulanceButton/AmbulanceButton';
import PatientSearch from '../PatientSearch/PatientSearch';
import EmergencyInfo from '../EmergencyInfo/EmergencyInfo';
import './Navigation.css';
import homeIcon from '../../assets/Home.png';
import medicalReportIcon from '../../assets/medicalReport.png';
import patientFolderIcon from '../../assets/PatientFolder.png';
import medicineIcon from '../../assets/medicine.png';
import doctorIcon from '../../assets/doctor.png';
import dasgboardIcon from '../../assets/dash.png';

const Navigation = () => {
  const [showPatientSearch, setShowPatientSearch] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
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
    setSelectedPatient(null);
  }, [location]);

  const handleAmbulanceClick = () => {
    setShowPatientSearch(!showPatientSearch);
    setSelectedPatient(null);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setShowPatientSearch(false);
  };

  const handleCloseEmergencyInfo = () => {
    setSelectedPatient(null);
  };

  const handleNavClick = (path, e) => {
    e.preventDefault();
    navigate(path, { replace: true });
  };

  const navButtons = [
    { to: '/minimental', icon: doctorIcon, title: 'Mini Mental', hebrewTitle: 'מינימנטל' },
    { to: '/Patients', icon: patientFolderIcon, title: 'Patients', hebrewTitle: 'מטופלים' },
    { to: '/medication', icon: medicineIcon, title: 'Medications', hebrewTitle: 'תרופות' },
    { to: '/followup-list', icon: medicalReportIcon, title: 'Medical Info', hebrewTitle: 'מעקב' },
    { to: '/dailytest', icon: doctorIcon, title: 'Daily Test', hebrewTitle: 'בדיקה' },
    { to: '/dashboard', icon: dasgboardIcon, title: 'Dashboard', hebrewTitle: ' בקרה' },
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
            <a 
              key={index} 
              href={button.to}
              className={`nav-button ${location.pathname.startsWith(button.to) ? 'active' : ''}`}
              title={button.title}
              onClick={(e) => handleNavClick(button.to, e)}
            >
              <div className="nav-button-content">
                <img src={button.icon} alt={button.title} />
                <span className="nav-button-text">{button.hebrewTitle}</span>
              </div>
            </a>
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
          <PatientSearch onSelect={handlePatientSelect} />
        </div>
      )}

      {selectedPatient && (
        <EmergencyInfo 
          patient={selectedPatient} 
          onClose={handleCloseEmergencyInfo} 
        />
      )}
    </>
  );
};

export default Navigation; 