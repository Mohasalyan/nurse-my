// src/pages/TestList/TestList.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TestList.css';
import HomeB from '../../Components/HomeB/HomeB';
import Exit from '../../Components/Exit/Exit';
import homeIcon from '../../assets/Home.png';

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'daily_tests'));
        const testData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTests(testData);
      } catch (error) {
        console.error('שגיאה בשליפת הבדיקות:', error);
        toast.error('שגיאה בטעינת הבדיקות');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="test-list">
      <div className="exit-icon">
        <Exit title="יציאה" to="/login" />
      </div>

      <div className="home">
        <HomeB image={homeIcon} style={{ width: '50px', height: '50px' }} to="/home" />
      </div>

      <h2>רשימת בדיקות</h2>

      {loading ? (
        <p>טוען נתונים...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>שם מטופל</th>
              <th>ת.ז</th>
              <th>תאריך</th>
              <th>לחץ דם</th>
              <th>דופק</th>
              <th>סוכר</th>
              <th>BMI</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test.id}>
                <td>{test.name}</td>
                <td>{test.id}</td>
                <td>{new Date(test.dateAndTime).toLocaleString()}</td>
                <td>{test.bloodPressure}</td>
                <td>{test.pulse}</td>
                <td>{test.sugar}</td>
                <td>{test.bmi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ToastContainer />
    </div>
  );
};

export default TestList;
