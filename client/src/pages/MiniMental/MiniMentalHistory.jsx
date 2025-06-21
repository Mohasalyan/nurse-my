// src/pages/MiniMental/MiniMentalHistory.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserStore from "../../store/userStore";
import useMiniMentalStore from "../../store/miniMentalStore";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import { Home as HomeIcon, X as CloseIcon } from "lucide-react";
import Button from "../../Components/ui/Button/Button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../Components/ui/Accordion/Accordion";

const MiniMentalHistory = () => {
  const [results, setResults] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

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
          // ✅ ترتيب النتائج حسب التاريخ (الأحدث أولًا)
          patientTests.sort((a, b) => new Date(b.createdAt?.toDate()) - new Date(a.createdAt?.toDate()));
          
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
    <div className="mm-container">
      <header className="mm-header">
        <div className="mm-header-center">
          <span className="mm-user-name">
            ברוך הבא, <strong>{username}</strong>
          </span>
        </div>

        <div className="mm-header-left">
        </div>
      </header>

      <div className="mm-content">
        <Accordion type="single" collapsible className="space-y-4">
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="mm-accordion-trigger">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="mm-accordion-content">
                {section.description && (
                  <p className="mm-section-description">{section.description}</p>
                )}
    <div className="history-page">
      <div className="logo-container">
        <Link to="/home">
          <HomeB
            image={homeIcon}
            title="מטה יהודה"
            plain
            style={{ width: "100px", height: "auto", cursor: "pointer" }}
          />
        </Link>
      </div>

      <h1 className="history-title">📋 תוצאות מבחני מיני מנטל</h1>

      {results.length === 0 ? (
        <p className="no-results">אין תוצאות זמינות</p>
      ) : (
        results.map((patient) => (
          <div key={patient.patientId} className="patient-card">
            <h2 className="patient-name">{patient.patientName}</h2>

            <div className="tests-list">
              {patient.tests.map((test, index) => (
                <div
                  key={index}
                  className="test-item"
                  onClick={() => setSelectedTest({ ...test, patientName: patient.patientName })}
                >
                  <div className="test-date">
                    📅 {new Date(test.createdAt?.toDate()).toLocaleDateString("he-IL")} •{" "}
                    {new Date(test.createdAt?.toDate()).toLocaleTimeString("he-IL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="test-score">
                    ניקוד: <span>{test.score}</span> / {test.maxScore}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
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
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mm-save-bar">
        <Button onClick={handleSubmit} className="mm-save-btn">
          שמור והעבר להיסטוריה
        </Button>
        <Button
          onClick={() => navigate(`/folder/${patientId}/mini-mental/history`)}
          className="mm-history-btn"
          variant="outline"
        >
          הצג היסטוריה
        </Button>
      </div>
    </div>
  );
};

export default MiniMentalHistory;
