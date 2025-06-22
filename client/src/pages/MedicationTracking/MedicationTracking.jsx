// src/pages/MedicationTracking.jsx
import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

import './MedicationTracking.css';
import PatientSearch from '../../Components/PatientSearch/PatientSearch';

const MedicationTracking = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [selectedPatientName, setSelectedPatientName] = useState('');
  const [medications, setMedications] = useState([]);
  const [filterUnTaken, setFilterUnTaken] = useState(true);
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

      const filtered = [];
      for (const patient of data) {
        const medsSnap = await getDocs(collection(db, 'patients', patient.id, 'medications'));
        const meds = medsSnap.docs.map(doc => doc.data());
        if (meds.some(m => !m.taken)) {
          filtered.push(patient);
        }
      }

      setPatients(filtered);
      setFilteredPatients(filtered);
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

    const patientRef = doc(db, 'patients', patientId);
    const patientSnap = await getDoc(patientRef);
    const patientData = patientSnap.exists() ? patientSnap.data() : null;

    if (patientData?.medical?.medications) {
      const medicalMeds = patientData.medical.medications;
      meds.forEach((med) => {
        const found = medicalMeds.find(m => m.medication === med.medication);
        if (found && found.medicalComment) {
          med.medicalComment = found.medicalComment;
        }
      });
    }

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
    const confirm = window.confirm("האם אתה בטוח שברצונך למחוק את התרופה?");
    if (!confirm) return;

    await deleteDoc(doc(db, 'patients', selectedPatientId, 'medications', id));
    setMedications(prev => prev.filter(med => med.id !== id));
    toast.success("התרופה נמחקה בהצלחה");
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
            <button onClick={handleAddMedication}>הוסף תרופה</button>
            <input
              type="text"
              placeholder="מינון"
              value={newMedication.dose}
              onChange={(e) => setNewMedication({ ...newMedication, dose: e.target.value })}
            />
            <input
              type="text"
              placeholder="שם התרופה"
              value={newMedication.medication}
              onChange={(e) => setNewMedication({ ...newMedication, medication: e.target.value })}
            />
          </div>

          <div className="filter-section">
            <label>
              הצג רק תרופות שלא נלקחו
              <input
                type="checkbox"
                checked={filterUnTaken}
                onChange={(e) => setFilterUnTaken(e.target.checked)}
              />
            </label>
          </div>

          <table className="med-table">
            <thead>
              <tr>
                <th>מחיקה</th>
                <th>סטטוס</th>
                <th>תאריך אחרון</th>
                <th>הערה רפואית</th>
                <th>הערה</th>
                <th>מינון</th>
                <th>שם התרופה</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeds.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>🗑️</button>
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
                    {item.lastTakenTime
                      ? new Date(item.lastTakenTime.seconds * 1000).toLocaleString()
                      : '---'}
                  </td>
                  <td>{item.medicalComment || '-'}</td>
                  <td>
                    <input
                      className="note-input"
                      value={item.note || ''}
                      onChange={(e) => handleNoteChange(index, e.target.value)}
                      placeholder="הערה"
                    />
                  </td>
                  <td>{item.dose}</td>
                  <td>{item.medication}</td>
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
