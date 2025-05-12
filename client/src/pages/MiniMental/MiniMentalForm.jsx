// src/pages/MiniMental/MiniMentalForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";                // רק toast, בלי ToastContainer
import "react-toastify/dist/ReactToastify.css";
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
import "./MiniMental.css";

const MiniMentalForm = () => {
  const navigate = useNavigate();
  const { patientId } = useParams(); // מזהה המטופל אם מועבר ב־URL
  const { sections, setAnswer, reset } = useMiniMentalStore();
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [testDate, setTestDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  // חישוב ניקוד
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

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "mini_mental_tests"), {
        patientId,
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

  return (
    <div className="mm-container">
      {/* Header */}
      <header className="mm-header">
        <div className="mm-header-left">
          <button
            className="mm-icon-btn"
            onClick={() => navigate("/home")}
            title="בית"
          >
            <HomeIcon size={20} />
          </button>
          <button
            className="mm-icon-btn"
            onClick={() => navigate(-1)}
            title="חזרה"
          >
            <CloseIcon size={20} />
          </button>
        </div>
        <div className="mm-header-right">
          <div className="mm-patient-select">
            <label>מטופל:</label>
            <select
              value={patientId}
              onChange={(e) =>
                navigate(`/folder/${e.target.value}/mini-mental`)
              }
            >
              {/* דוגמאות, יש לטעון ברשימה דינמית */}
              <option value="12345">12345 – יוסי כהן</option>
              <option value="12346">12346 – רחל לוי</option>
            </select>
          </div>
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

      {/* כפתור לעמוד היסטוריה */}
      <div className="mm-history-btn">
        <Button
          variant="outline"
          onClick={() =>
            navigate(`/folder/${patientId}/mini-mental/history`)
          }
        >
          הצג היסטוריה
        </Button>
      </div>

      {/* Title */}
      <div className="mm-title">
        <h1>מבחן מצב מנטלי מינימלי</h1>
        <p>נא להעריך לפי ההנחיות ולבחור את התשובות הנכונות</p>
      </div>

      {/* Score banner */}
      <div className="mm-score-banner">
        <span>
          סה״כ ניקוד: <strong>{score}</strong> מתוך <strong>{maxScore}</strong>
        </span>
      </div>

      {/* Accordions */}
      <div className="mm-accordions">
        <Accordion type="single" collapsible className="space-y-4">
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="mm-accordion-trigger">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="mm-accordion-content">
                {section.description && (
                  <p className="mm-section-description">
                    {section.description}
                  </p>
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
                          onChange={() =>
                            setAnswer(section.id, q.id, true)
                          }
                        />
                        נכון
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={q.id}
                          checked={q.answer === false}
                          onChange={() =>
                            setAnswer(section.id, q.id, false)
                          }
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

      {/* Save Button */}
      <div className="mm-save-bar">
        <Button onClick={handleSubmit} className="mm-save-btn">
          שמור והעבר להיסטוריה
        </Button>
      </div>
    </div>
  );
};

export default MiniMentalForm;
