// src/Components/PatientSearch/PatientSearch.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import './PatientSearch.css';
import { FaSearch } from 'react-icons/fa'; // أيقونة البحث

const PatientSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const snapshot = await getDocs(collection(db, 'patients'));
      const fetched = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          name: `${data.firstName || ''} ${data.lastName || ''}`.trim()
        };
      });
      setPatients(fetched);
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const lower = query.toLowerCase();
    setFiltered(
      patients.filter(
        p =>
          p.name?.toLowerCase().includes(lower) ||
          p.id?.toString().includes(query)
      )
    );
  }, [query, patients]);

  return (
    <div className="patient-search-container">
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="חיפוש לפי שם או תעודת זהות..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="patient-search-input"
        />
      </div>

      {query && (
        <>
          {filtered.length > 0 ? (
            <ul className="patient-search-results">
              {filtered.map(p => (
                <li key={p.id} onClick={() => onSelect(p)}>
                  {p.name} ({p.id})
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-results">לא נמצאו תוצאות</div>
          )}
        </>
      )}
    </div>
  );
};

export default PatientSearch;
