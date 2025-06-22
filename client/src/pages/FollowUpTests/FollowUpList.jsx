// src/pages/FollowUpList/FollowUpList.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import './FollowUpList.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PatientSearch from '../../Components/PatientSearch/PatientSearch';
import { FaExclamationTriangle } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../utils/AlefFont'; // تأكد من المسار

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
      await deleteDoc(doc(db, 'patients', selectedPatientId)); 

      fetchFollowUps();
      setSelectedPatientId(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting patient: ", error);
    }
  }
};


  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(followUps);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FollowUpList");
    XLSX.writeFile(workbook, "follow_up_list.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'A4' });

    const tableColumn = ["שם מטופל", "ת.ז", "לחץ דם", "סוכר", "BMI", "דופק", "סיבת מעקב"];
    const tableRows = followUps.map(p => [
      p.name,
      p.id,
      p.bloodPressure,
      p.sugar,
      p.bmi,
      p.pulse,
      p.reasons
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { font: 'helvetica', fontSize: 10 }, // ← تأكد من استخدام خط مدعوم
      headStyles: { fillColor: [123, 176, 142], textColor: 255 },
      margin: { top: 40 }
    });

    doc.save("follow_up_list.pdf");
  };

  return (
    <div className="followup-container">
      <h2>רשימת מעקב - מדדים חריגים</h2>

      {followUps.length > 0 && (
        <div className="followup-alert">
          <FaExclamationTriangle style={{ marginInlineEnd: '6px' }} />
          נמצאו {followUps.length} מטופלים במעקב שלא נבדקו
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
        <button className="export-button" onClick={exportToExcel}>📤 יצא ל-Excel</button>
        <button className="export-button" onClick={exportToPDF}>📄 יצא ל-PDF</button>
      </div>

      <div className="search-box" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <PatientSearch onSelect={handleSearchSelect} />
      </div>

      {loading ? (
        <p className="loading-text">טוען נתונים...</p>
      ) : followUps.length === 0 ? (
        <p className="empty-state">אין מטופלים במעקב כרגע 👌</p>
      ) : (
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
                <th>טופל</th>
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
                  <td>
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
      )}

      {showModal && (
        <div className="modal-overlay">
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
