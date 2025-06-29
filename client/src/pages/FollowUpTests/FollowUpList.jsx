// src/pages/FollowUpList/FollowUpList.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import './FollowUpList.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PatientSearch from '../../Components/PatientSearch/PatientSearch';
import { FaExclamationTriangle } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const FollowUpList = () => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nurseName, setNurseName] = useState("אחות");
  const [allPatients, setAllPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setNurseName(user.displayName || user.email || "אחות");
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchFollowUps = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, 'patients'));
    const data = [];

    snapshot.forEach(docSnap => {
      const p = docSnap.data();
      const vitals = p.medical?.vitalSigns || {};
      const reasons = [];

      if (vitals.bloodPressure && vitals.bloodPressure.includes('/')) {
        const [sys, dia] = vitals.bloodPressure.split('/').map(Number);
        if (sys > 140 || sys < 90 || dia > 90 || dia < 60) {
          reasons.push('לחץ דם לא תקין');
        }
      }

      const sugar = Number(vitals.sugar?.toString().trim());
      if (sugar && (sugar > 180 || sugar < 70)) {
        reasons.push('סוכר לא תקין');
      }

      const bmi = Number(vitals.bmi?.toString().trim());
      if (bmi && bmi >= 30) {
        reasons.push('BMI גבוה');
      }

      if (reasons.length > 0) {
        data.push({
          id: p.id,
          name: p.name || `${p.firstName || ''} ${p.lastName || ''}`.trim(),
          bloodPressure: vitals.bloodPressure || '-',
          sugar: vitals.sugar || '-',
          bmi: vitals.bmi || '-',
          pulse: vitals.pulse || '-',
          reasons: reasons.join(', ')
        });
      }
    });

    setFollowUps(data);
    setAllPatients(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFollowUps();
  }, []);

  const handleSearchSelect = (patient) => {
    setFollowUps(
      allPatients.filter(p =>
        p.id.includes(patient.id) || p.name.includes(patient.name)
      )
    );
  };

  const handleRemove = async () => {
    if (selectedPatientId) {
      try {
        const patientRef = doc(db, 'patients', selectedPatientId);
        const patientDoc = await getDoc(patientRef);
        
        if (!patientDoc.exists()) {
          console.error("Patient document not found");
          return;
        }

        const patientData = patientDoc.data();
        const patient = followUps.find(p => p.id === selectedPatientId);
        
        if (!patient) {
          console.error("Patient not found in follow ups list");
          return;
        }

        const currentVitalSigns = patientData.medical?.vitalSigns || {};
        const updatedVitalSigns = {
          ...currentVitalSigns
        };

        if (patient.reasons.includes('לחץ דם לא תקין')) {
          updatedVitalSigns.bloodPressure = '120/80';
        }
        if (patient.reasons.includes('סוכר לא תקין')) {
          updatedVitalSigns.sugar = '100';
        }
        if (patient.reasons.includes('BMI גבוה')) {
          updatedVitalSigns.bmi = '25';
        }

        await updateDoc(patientRef, {
          'medical.vitalSigns': updatedVitalSigns
        });

        await fetchFollowUps();
        setSelectedPatientId(null);
        setShowModal(false);
      } catch (error) {
        console.error("Error updating patient vital signs: ", error);
      }
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(followUps);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FollowUpList");
    XLSX.writeFile(workbook, "follow_up_list.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  const renderTable = () => (
    <div className="followup-table-wrapper">
      <table>
        <thead>
          <tr>
            <th>שם מטופל</th>
            <th>ת.ז</th>
            <th>לחץ דם</th>
            <th>סוכר</th>
            <th>BMI</th>
            <th>דופק</th>
            <th>סיבת מעקב</th>
            <th className="screen-only">טופל</th>
          </tr>
        </thead>
        <tbody>
          {followUps.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.id}</td>
              <td>{p.bloodPressure}</td>
              <td>{p.sugar}</td>
              <td>{p.bmi}</td>
              <td>{p.pulse}</td>
              <td>{p.reasons}</td>
              <td className="screen-only">
                <button
                  className="mark-handled-button"
                  onClick={() => {
                    setSelectedPatientId(p.id);
                    setShowModal(true);
                  }}
                >
                  טופל + הסרה
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="followup-container">
      <div className="screen-only">
        <h2>רשימת מעקב - מדדים חריגים</h2>

        {followUps.length > 0 && (
          <div className="followup-alert">
            <FaExclamationTriangle style={{ marginInlineEnd: '6px' }} />
            נמצאו {followUps.length} מטופלים במעקב שלא נבדקו
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
          <button className="export-button" onClick={exportToExcel}>📤 יצא ל-Excel</button>
          <button className="export-button" onClick={handlePrint}>🖨️ הדפסה</button>
        </div>

        <div className="search-box" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <PatientSearch onSelect={handleSearchSelect} />
        </div>
      </div>

      {loading ? (
        <p className="loading-text screen-only">טוען נתונים...</p>
      ) : followUps.length === 0 ? (
        <p className="empty-state screen-only">אין מטופלים במעקב כרגע 👌</p>
      ) : (
        <>
          <div className="print-header print-only">
            <h1>רשימת מעקב - מדדים חריגים</h1>
            <div className="print-date">תאריך הדפסה: {new Date().toLocaleDateString('he-IL')}</div>
            <div className="print-nurse">אחות אחראית: {nurseName}</div>
          </div>

          {renderTable()}
        </>
      )}

      {showModal && (
        <div className="modal-overlay screen-only">
          <div className="modal-content">
            <h3>האם אתה בטוח שברצונך להסיר את המטופל מרשימת המעקב?</h3>
            <div className="modal-buttons">
              <button onClick={handleRemove}>כן, הסר</button>
              <button onClick={() => setShowModal(false)}>ביטול</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUpList;
