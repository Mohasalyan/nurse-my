// src/Components/PatientSearch/PatientSearch.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import './PatientSearch.css';

const PatientSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const snapshot = await getDocs(collection(db, 'patients'));
      setPatients(snapshot.docs.map(doc => doc.data()));
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const lower = query.toLowerCase();
    setFiltered(
      patients.filter(
        p => p.name?.toLowerCase().includes(lower) || p.id?.includes(query)
      )
    );
  }, [query, patients]);

  return (
    <div className="patient-search-container">
      <input
        type="text"
        placeholder="חיפוש לפי שם או תעודת זהות..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="patient-search-input"
      />
      {query && filtered.length > 0 && (
        <ul className="patient-search-results">
          {filtered.map(p => (
            <li key={p.id} onClick={() => onSelect(p)}>
              {p.name} ({p.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientSearch;
