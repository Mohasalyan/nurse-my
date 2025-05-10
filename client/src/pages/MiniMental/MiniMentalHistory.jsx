import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import './MiniMental.css';

const MiniMentalHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, 'mini_mental_tests'),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      setHistory(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  if (!history.length) return <p>אין מבחנים בהיסטוריה.</p>;

  return (
    <div className="mini-mental-history">
      <h1>היסטוריית מבחני מינימנטל</h1>
      <ul>
        {history.map(item => (
          <li key={item.id}>
            <strong>{new Date(item.createdAt.toMillis()).toLocaleString('he-IL')}</strong> – 
            ניקוד: {item.score}/{item.maxScore}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniMentalHistory;
