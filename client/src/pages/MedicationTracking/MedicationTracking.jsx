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
import { toast } from 'react-toastify';

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

  const fetchPatients = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'patients'));
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          name: `${d.firstName || ''} ${d.lastName || ''}`.trim(),
        };
      });

      // Filter patients to only include those with medications
      const patientsWithMeds = [];
      for (const patient of data) {
        const medsSnap = await getDocs(collection(db, 'patients', patient.id, 'medications'));
        if (!medsSnap.empty) {
          patientsWithMeds.push(patient);
        }
      }

      setPatients(patientsWithMeds);
      setFilteredPatients(patientsWithMeds);
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast.error("שגיאה בטעינת רשימת המטופלים");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchMedications = async (patientId) => {
    const medsRef = collection(db, 'patients', patientId, 'medications');
    const medsSnap = await getDocs(medsRef);
    const meds = medsSnap.docs.map(doc => {
      const data = doc.data();
      console.log('Medication data:', data); // Debug log
      return {
        id: doc.id,
        ...data
      };
    });

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
    
    console.log('Final medications array:', meds); // Debug log
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
      name: newMedication.medication,
      dose: newMedication.dose,
      taken: false,
      lastTakenTime: null,
      note: '',
    };

    try {
      const medsRef = collection(db, 'patients', selectedPatientId, 'medications');
      const docRef = await addDoc(medsRef, newMed);
      setMedications([...medications, { id: docRef.id, ...newMed }]);
      setNewMedication({ medication: '', dose: '' });
      toast.success("התרופה נוספה בהצלחה");
      
      // Refresh both medications list and patients list
      await fetchMedications(selectedPatientId);
      await fetchPatients();
    } catch (error) {
      console.error("Error adding medication:", error);
      toast.error("שגיאה בהוספת התרופה");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("האם אתה בטוח שברצונך למחוק את התרופה?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'patients', selectedPatientId, 'medications', id));
      setMedications(prev => prev.filter(med => med.id !== id));
      toast.success("התרופה נמחקה בהצלחה");

      // Check if this was the last medication and refresh the patients list if needed
      const medsSnap = await getDocs(collection(db, 'patients', selectedPatientId, 'medications'));
      if (medsSnap.empty) {
        await fetchPatients();
      }
    } catch (error) {
      console.error("Error deleting medication:", error);
      toast.error("שגיאה במחיקת התרופה");
    }
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
                <th>שם התרופה</th>
                <th>מינון</th>
                <th>הערה</th>
                <th>הערה רפואית</th>
                <th>תאריך אחרון</th>
                <th>נלקח</th>
                <th>מחיקה</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeds.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ color: '#333333' }}>{item.name || 'N/A'}</td>
                  <td>{item.dose}</td>
                  <td>
                    <input
                      className="note-input"
                      value={item.note || ''}
                      onChange={(e) => handleNoteChange(index, e.target.value)}
                      placeholder="הערה"
                    />
                  </td>
                  <td>{item.medicalComment || '-'}</td>
                  <td>
                    {item.lastTakenTime
                      ? new Date(item.lastTakenTime.seconds * 1000).toLocaleString()
                      : '---'}
                  </td>
                  <td className="medication-checkbox-container">
                    <input
                      type="checkbox"
                      className="medication-checkbox"
                      checked={item.taken}
                      onChange={() => toggleTaken(index)}
                    />
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
