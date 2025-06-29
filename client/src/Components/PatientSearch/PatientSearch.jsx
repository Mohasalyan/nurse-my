// src/Components/PatientSearch/PatientSearch.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import './PatientSearch.css';
import { FaSearch } from 'react-icons/fa'; // أيقونة البحث

const PatientSearch = ({ onSelect, className = '', placeholder = 'חיפוש לפי שם או תעודת זהות...' }) => {
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'patients'));
        const fetched = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            name: `${data.firstName || ''} ${data.lastName || ''}`.trim()
          };
        });
        setPatients(fetched);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setIsLoading(false);
      }
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

  const handleSelect = async (patient) => {
    try {
      // Fetch complete patient data
      const docRef = doc(db, 'patients', patient.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const completeData = docSnap.data();
        onSelect({
          ...completeData,
          id: docSnap.id,
          name: `${completeData.firstName || ''} ${completeData.lastName || ''}`.trim()
        });
      } else {
        console.error('No patient found with ID:', patient.id);
      }
    } catch (error) {
      console.error('Error fetching complete patient data:', error);
    }
    setQuery('');
  };

  return (
    <div className={`patient-search-container ${className}`}>
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="patient-search-input"
        />
      </div>

      {query && !isLoading && (
        <>
          {filtered.length > 0 ? (
            <ul className="patient-search-results">
              {filtered.map(p => (
                <li key={p.id} onClick={() => handleSelect(p)}>
                  {p.name} - {p.id}
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
