// src/pages/MiniMental/MiniMentalHistory.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import HomeB from "../../Components/HomeB/HomeB";
import homeIcon from "../../assets/Home.png";
import { Link } from "react-router-dom";
import "./MiniMentalHistory.css";

const MiniMentalHistory = () => {
  const [results, setResults] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  const getScoreStatus = (score) => {
    if (score >= 24) {
      return 'status-good';
    } else if (score >= 18) {
      return 'status-warning';
    } else {
      return 'status-severe';
    }
  };

  const getStatusText = (score) => {
    if (score >= 24) {
      return 'מצב מנטלי תקין';
    } else if (score >= 18) {
      return 'סימנים של דמנציה או אלצהיימר';
    } else {
      return 'דיספונקציונליות מוחית חמורה';
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      const patientsSnapshot = await getDocs(collection(db, "patients"));
      const allResults = [];

      for (const patientDoc of patientsSnapshot.docs) {
        const patientData = patientDoc.data();
        const patientId = patientDoc.id;

        const miniMentalSnap = await getDocs(
          collection(db, "patients", patientId, "mini_mental_tests")
        );
        const patientTests = miniMentalSnap.docs.map((doc) => doc.data());

        if (patientTests.length > 0) {
          patientTests.sort(
            (a, b) =>
              new Date(b.createdAt?.toDate()) -
              new Date(a.createdAt?.toDate())
          );
          allResults.push({
            patientId,
            patientName:
              patientData.name ||
              `${patientData.firstName || ""} ${patientData.lastName || ""}`.trim(),
            tests: patientTests,
          });
        }
      }
      setResults(allResults);
    };
    fetchResults();
  }, []);

  return (
    <div className="history-page">
      <h1 className="history-title">📋 תוצאות מבחני מיני מנטל</h1>

      {results.length === 0 ? (
        <p className="no-results">אין תוצאות זמינות</p>
      ) : (
        <div className="patients-grid">
          {results.map((patient) => (
            <div key={patient.patientId} className="patient-card">
              <h2 className="patient-name">{patient.patientName}</h2>

              <div className="tests-list">
                {patient.tests.map((test, index) => (
                  <div
                    key={index}
                    className={`test-item ${getScoreStatus(test.score)}`}
                    onClick={() =>
                      setSelectedTest({ ...test, patientName: patient.patientName })
                    }
                  >
                    <div className="test-score">
                      ניקוד: <span>{test.score}</span> / {test.maxScore}
                    </div>
                    <div className="status-text">
                      {getStatusText(test.score)}
                    </div>
                    <div className="test-date">
                      📅 {new Date(test.createdAt?.toDate()).toLocaleDateString("he-IL")} •{" "}
                      {new Date(test.createdAt?.toDate()).toLocaleTimeString("he-IL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTest && (
        <div className="modal">
          <div className="modal-content">
            <h2>תשובות של {selectedTest.patientName}</h2>
            {selectedTest.sections?.map((section) => (
              <div key={section.id} className="modal-section">
                <h3>{section.title}</h3>
                {section.questions.map((q) => (
                  <div key={q.id} className="modal-question">
                    <span>{q.text}</span> -
                    <span className={q.answer ? "correct" : "incorrect"}>
                      {q.answer ? "נכון ✅" : "לא נכון ❌"}
                    </span>
                  </div>
                ))}
              </div>
            ))}
            <button className="modal-close" onClick={() => setSelectedTest(null)}>
              סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniMentalHistory;
