import React, { useEffect, useState } from 'react';
import './MedicationsSection.css';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

const MedicationsSection = ({ patientId }) => {
  const [medications, setMedications] = useState([]);
  const [newMed, setNewMed] = useState({ name: '', dose: '', frequency: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedMed, setEditedMed] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const fetchMedications = async () => {
    const snapshot = await getDocs(collection(db, `patients/${patientId}/medications`));
    const meds = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setMedications(meds);
  };

  useEffect(() => {
    if (patientId) fetchMedications();
  }, [patientId]);

  const handleChange = (e) => {
    setNewMed({ ...newMed, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMed.name || !newMed.dose || !newMed.frequency) return;
    await addDoc(collection(db, `patients/${patientId}/medications`), {
      ...newMed,
      createdAt: Timestamp.now(),
    });
    setNewMed({ name: '', dose: '', frequency: '' });
    setToastMessage('התרופה נוספה בהצלחה');
    fetchMedications();
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, `patients/${patientId}/medications`, id));
    fetchMedications();
  };

  const handleEdit = (med) => {
    setEditingId(med.id);
    setEditedMed(med);
  };

  const handleEditChange = (e) => {
    setEditedMed({ ...editedMed, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    await updateDoc(doc(db, `patients/${patientId}/medications`, editingId), editedMed);
    setEditingId(null);
    setToastMessage('התרופה עודכנה בהצלחה');
    fetchMedications();
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filterMedications = () => {
    let filtered = [...medications];

    // فلترة حسب تاريخ اليوم
    if (showTodayOnly) {
      const today = new Date().toDateString();
      filtered = filtered.filter((med) => {
        const createdAt = med.createdAt?.toDate().toDateString();
        return createdAt === today;
      });
    }

    // فلترة حسب التكرار أو الجرعة
    if (filterType === 'danger') {
      filtered = filtered.filter((med) => {
        const match = med.dose?.match(/\d+/);
        const doseValue = match ? parseInt(match[0]) : 0;
        return doseValue >= 1000;
      });
    } else if (filterType !== 'all') {
      filtered = filtered.filter((med) => med.frequency === filterType);
    }

    return filtered;
  };

  return (
    <div className="medications-section">
      <h3>תרופות יומיות</h3>

      {toastMessage && <div className="toast">{toastMessage}</div>}

      <form onSubmit={handleSubmit} className="med-form">
        <input
          type="text"
          name="name"
          placeholder="שם התרופה"
          value={newMed.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="dose"
          placeholder="מינון"
          value={newMed.dose}
          onChange={handleChange}
        />
        <input
          type="text"
          name="frequency"
          placeholder="תדירות"
          value={newMed.frequency}
          onChange={handleChange}
        />
        <button type="submit">הוסף</button>
      </form>

      <div className="filters">
        <label>
          <input
            type="checkbox"
            checked={showTodayOnly}
            onChange={() => setShowTodayOnly(!showTodayOnly)}
          />
          הצג תרופות של היום בלבד
        </label>

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">כל התדירויות</option>
          <option value="פעם ביום">פעם ביום</option>
          <option value="פעמיים ביום">פעמיים ביום</option>
          <option value="3 פעמים ביום">3 פעמים ביום</option>
          <option value="danger">מינון מסוכן (1000mg+)</option>
        </select>
      </div>

      {filterMedications().length === 0 ? (
        <p>לא קיימות תרופות</p>
      ) : (
        <ul>
          {filterMedications().map((med) => (
            <li key={med.id}>
              {editingId === med.id ? (
                <>
                  <input name="name" value={editedMed.name} onChange={handleEditChange} />
                  <input name="dose" value={editedMed.dose} onChange={handleEditChange} />
                  <input name="frequency" value={editedMed.frequency} onChange={handleEditChange} />
                  <button onClick={saveEdit}>שמור</button>
                </>
              ) : (
                <>
                  <strong>{med.name}</strong> - {med.dose} - {med.frequency}
                  <button className="edit-btn" onClick={() => handleEdit(med)}>ערוך</button>
                  <button className="delete-btn" onClick={() => handleDelete(med.id)}>מחק</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicationsSection;
