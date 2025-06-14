// src/pages/MedicationTracking.jsx
import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

import './MedicationTracking.css';
import homeIcon from '../../assets/Home.png';
import Exit from "../../Components/Exit/Exit";
import HomeB from "../../Components/HomeB/HomeB";
import PatientSearch from '../../Components/PatientSearch/PatientSearch';

const MedicationTracking = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [selectedPatientName, setSelectedPatientName] = useState('');
  const [medications, setMedications] = useState([]);
  const [filterUnTaken, setFilterUnTaken] = useState(false);
  const [newMedication, setNewMedication] = useState({ medication: '', dose: '' });

  useEffect(() => {
    const fetchPatients = async () => {
      const snapshot = await getDocs(collection(db, 'patients'));
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          name: `${d.firstName || ''} ${d.lastName || ''}`.trim(),
        };
      });
      setPatients(data);
      setFilteredPatients(data);
    };

    fetchPatients();
  }, []);

  const fetchMedications = async (patientId) => {
    const medsRef = collection(db, 'patients', patientId, 'medications');
    const medsSnap = await getDocs(medsRef);
    const meds = medsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setMedications(meds);
  };

  const toggleTaken = async (index) => {
    const updated = [...medications];
    updated[index].taken = !updated[index].taken;
    updated[index].lastTakenTime = updated[index].taken ? new Date() : null;
    setMedications(updated);

    const medDocRef = doc(db, 'patients', selectedPatientId, 'medications', updated[index].id);
    await updateDoc(medDocRef, {
      taken: updated[index].taken,
      lastTakenTime: updated[index].lastTakenTime
    });
  };

  const handleAddMedication = async () => {
    if (!newMedication.medication || !newMedication.dose) return;

    const newMed = {
      medication: newMedication.medication,
      dose: newMedication.dose,
      taken: false,
      lastTakenTime: null,
      note: '',
    };

    const medsRef = collection(db, 'patients', selectedPatientId, 'medications');
    const docRef = await addDoc(medsRef, newMed);
    setMedications([...medications, { id: docRef.id, ...newMed }]);
    setNewMedication({ medication: '', dose: '' });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("هل أنت متأكد من حذف الدواء؟");
    if (!confirm) return;

    await deleteDoc(doc(db, 'patients', selectedPatientId, 'medications', id));
    setMedications(prev => prev.filter(med => med.id !== id));
  };

  const handleNoteChange = async (index, newNote) => {
    const updated = [...medications];
    updated[index].note = newNote;
    setMedications(updated);

    const medDocRef = doc(db, 'patients', selectedPatientId, 'medications', updated[index].id);
    await updateDoc(medDocRef, { note: newNote });
  };

  const filteredMeds = filterUnTaken
    ? medications.filter(med => !med.taken)
    : medications;

  const handleSearchSelect = async (patient) => {
    setSelectedPatientId(patient.id);
    setSelectedPatientName(patient.name);
    await fetchMedications(patient.id);
  };

  return (
    <div className="medication-page">
      <div className="exit-icon">
        <Exit title="יציאה" to="/login" />
      </div>

      <div className="home">
        <HomeB image={homeIcon} style={{ width: "55px", height: "55px" }} to="/home" />
      </div>

      <h2>מעקב תרופות</h2>

      <div className="patient-section">
        <h3>בחר מטופל</h3>
        <PatientSearch onSelect={handleSearchSelect} />
        <div className="patients-list">
          {filteredPatients.map((p) => (
            <div
              key={p.id}
              className={`patient-card ${selectedPatientId === p.id ? 'selected' : ''}`}
              onClick={async () => {
                setSelectedPatientId(p.id);
                setSelectedPatientName(p.name);
                await fetchMedications(p.id);
              }}
            >
              <div className="patient-name">{p.name}</div>
              <div className="patient-id">{p.id}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedPatientId && (
        <div className="medication-dashboard">
          <h3>תרופות עבור: {selectedPatientName}</h3>

          <div className="add-medication-form">
            <input
              type="text"
              placeholder="שם התרופה"
              value={newMedication.medication}
              onChange={(e) => setNewMedication({ ...newMedication, medication: e.target.value })}
            />
            <input
              type="text"
              placeholder="מינון"
              value={newMedication.dose}
              onChange={(e) => setNewMedication({ ...newMedication, dose: e.target.value })}
            />
            <button onClick={handleAddMedication}>הוסף תרופה</button>
          </div>

          <div className="filter-section">
            <label>
              <input
                type="checkbox"
                checked={filterUnTaken}
                onChange={(e) => setFilterUnTaken(e.target.checked)}
              />
              הצג רק תרופות שלא נלקחו
            </label>
          </div>

          <table className="med-table">
            <thead>
              <tr>
                <th>שם התרופה</th>
                <th>מינון</th>
                <th>הערה</th>
                <th>תאריך אחרון</th>
                <th>סטטוס</th>
                <th>מחיקה</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeds.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.medication}</td>
                  <td>{item.dose}</td>
                  <td>
                    <input
                      className="note-input"
                      value={item.note || ''}
                      onChange={(e) => handleNoteChange(index, e.target.value)}
                      placeholder="הערה"
                    />
                  </td>
                  <td>
                    {item.lastTakenTime
                      ? new Date(item.lastTakenTime.seconds * 1000).toLocaleString()
                      : '---'}
                  </td>
                  <td>
                    <button
                      className={`status-btn ${item.taken ? 'taken' : 'not-taken'}`}
                      onClick={() => toggleTaken(index)}
                    >
                      {item.taken ? '✘' : '✔'}
                    </button>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MedicationTracking;
