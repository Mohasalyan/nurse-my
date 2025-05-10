import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMiniMentalStore from '../../store/miniMentalStore';
import QuestionGroup from './components/QuestionGroup';
import ResultBox from './components/ResultBox';
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';
import './MiniMental.css';

const MiniMentalForm = () => {
  const navigate = useNavigate();
  const { sections, setAnswer, reset } = useMiniMentalStore();
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    let s = 0, m = 0;
    sections.forEach(sec =>
      sec.questions.forEach(q => {
        m += q.points;
        if (q.answer) s += q.points;
      })
    );
    setScore(s);
    setMaxScore(m);
  }, [sections]);

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'mini_mental_tests'), {
        sections,
        score,
        maxScore,
        createdAt: Timestamp.now(),
      });
      toast.success('המבחן נשמר בהצלחה!');
      reset();
      navigate('/minimental/history');
    } catch (e) {
      console.error(e);
      toast.error('שגיאה בשמירה');
    }
  };

  return (
    <div className="mini-mental-form">
      <h1>מבחן מינימנטל</h1>
      <ResultBox score={score} maxScore={maxScore} />
      {sections.map(sec => (
        <QuestionGroup
          key={sec.id}
          section={sec}
          onAnswer={(secId, qId, ans) => setAnswer(secId, qId, ans)}
        />
      ))}
      <button onClick={handleSubmit} className="save-btn">
        שמור והעבר להיסטוריה
      </button>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default MiniMentalForm;
