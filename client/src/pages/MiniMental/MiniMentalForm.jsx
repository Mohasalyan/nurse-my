// src/pages/MiniMental/MiniMentalForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserStore from "../../store/userStore";
import useMiniMentalStore from "../../store/miniMentalStore";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";

import { Home as HomeIcon, X as CloseIcon } from "lucide-react";
import Button from "../../Components/ui/Button/Button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../Components/ui/Accordion/Accordion";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // ✅ لإحضار الاسم
import Exit from "../../Components/Exit/Exit";
import HomeB from "../../Components/HomeB/HomeB";
import homeIcon from "../../assets/Home.png";
import "./MiniMental.css";
import PatientSearch from '../../Components/PatientSearch/PatientSearch';

const MiniMentalForm = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const username = useUserStore((state) => state.username);
  const { sections, setAnswer, reset } = useMiniMentalStore();

  const [nurseName, setNurseName] = useState("אחות"); // ✅ الاسم من Auth
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [testDate, setTestDate] = useState(new Date().toISOString().slice(0, 10));
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatientName, setSelectedPatientName] = useState("");

  // ✅ جلب الاسم من Auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setNurseName(user.displayName || user.email || "אחות");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let s = 0,
      m = 0;

    sections.forEach((sec) =>
      sec.questions.forEach((q) => {
        m += q.points;
        if (q.answer) s += q.points;
      })
    );
    setScore(s);
    setMaxScore(m);
  }, [sections]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const snapshot = await getDocs(collection(db, "patients"));
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPatients(list);
      } catch (error) {
        toast.error("שגיאה בטעינת המטופלים");
      }
    };
    fetchPatients();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!patientId) {
        toast.error("לא נבחר מטופל");
        return;
      }

      await addDoc(collection(db, "patients", patientId, "mini_mental_tests"), {
        sections,
        score,
        maxScore,
        createdAt: Timestamp.now(),
      });
      toast.success("המבחן נשמר בהצלחה!");
      reset();
      navigate(`/folder/${patientId}/mini-mental/history`);
    } catch (e) {
      console.error(e);
      toast.error("שגיאה בשמירת המבחן");
    }
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatientName(
      patient.name ||
      `${patient.firstName || ""} ${patient.lastName || ""}`.trim()
    );
    navigate(`/folder/${patient.id}/mini-mental`);
  };

  return (
    <div className="mm-container">
      


      <header className="mm-header">
        <div className="mm-header-center">
          <span className="mm-user-name">משתמש: {nurseName}</span>
        </div>
        <div className="mm-header-right">
          <div className="mm-date-picker">
            <label>תאריך:</label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
            />
          </div>
        </div>
      </header>

      {selectedPatientName && (
        <h2 className="selected-patient-name">👤 מטופל נבחר: {selectedPatientName}</h2>
      )}

      <div className="mm-title">
        <h1>מבחן מצב מנטלי מינימלי</h1>
        <p>נא להעריך לפי ההנחיות ולבחור את התשובות הנכונות</p>
      </div>

      <div className="mm-patient-select">
        <label>חיפוש מטופל:</label>
        <PatientSearch 
          onSelect={handlePatientSelect}
          className="mm-patient-search"
        />
      </div>

      <div className="mm-score-banner">
        <span>
          סה״כ ניקוד: <strong>{score}</strong> מתוך <strong>{maxScore}</strong>
        </span>
      </div>

      <div className="mm-accordions">
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
                {section.questions.map((q) => (
                  <div key={q.id} className="mm-question">
                    <label className="mm-question-text">
                      {q.text} <span>({q.points} נקודה)</span>
                    </label>
                    <div className="mm-answers">
                      <label>
                        <input
                          type="radio"
                          name={q.id}
                          checked={q.answer === true}
                          onChange={() => setAnswer(section.id, q.id, true)}
                        />
                        נכון
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={q.id}
                          checked={q.answer === false}
                          onChange={() => setAnswer(section.id, q.id, false)}
                        />
                        לא נכון
                      </label>
                    </div>
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
          variant="outline"
          onClick={() => navigate(`/folder/${patientId}/mini-mental/history`)}
          className="mm-history-btn"
        >
          הצג היסטוריה
        </Button>
      </div>
    </div>
  );
};

export default MiniMentalForm;
