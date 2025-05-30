// src/pages/MiniMental/MiniMentalForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeB from "../../Components/HomeB/HomeB";
import homeIcon from "../../assets/Home.png";
import Exit from "../../Components/Exit/Exit";
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

import "./MiniMental.css";

const MiniMentalForm = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const username = useUserStore((state) => state.username);
  const { sections, setAnswer, reset } = useMiniMentalStore();

  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [testDate, setTestDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    let s = 0, m = 0;
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
        username,
        testDate,
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
        


        <div className="mm-header-center">
          <span className="mm-user-name">
            ברוך הבא, <strong>{username}</strong>
          </span>
        </div>

        <div className="mm-header-left">
          <div className="home">
            <HomeB
              image={homeIcon}
              style={{ width: "55px", height: "55px" }}
              to="/home"
            />
          </div>
          <div className="exit-icon">
            <Exit title="יציאה" to={-1} />
          </div>
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

      {/* Title */}
      <div className="mm-title">
        <h1>מבחן מצב מנטלי מינימלי</h1>
        <p>נא להעריך לפי ההנחיות ולבחור את התשובות הנכונות</p>
      </div>

      {/* Score */}
      <div className="mm-score-banner">
        <span>
          סה״כ ניקוד: <strong>{score}</strong> מתוך <strong>{maxScore}</strong>
        </span>
      </div>

      {/* Accordion */}
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

      {/* Save & History Buttons */}
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

export default MiniMentalForm;
