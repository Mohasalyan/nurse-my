// src/pages/MiniMental/MiniMentalHistory.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import Button from "../../Components/ui/Button/Button";
import { Home as HomeIcon, ArrowLeft as BackIcon } from "lucide-react";
import "./MiniMental.css";

const MiniMentalHistory = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "mini_mental_tests"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setHistory(
        snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(x => x.patientId === patientId)
      );
    })();
  }, [patientId]);

  return (
    <div className="mm-container">
      {/* Header */}
      <header className="mm-header">
        <div className="mm-header-left">
          <Button variant="secondary" onClick={() => navigate("/home")}> 
            <HomeIcon size={20} />
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <BackIcon size={20} />
          </Button>
        </div>
        <h2 className="mm-history-title">היסטוריית מבחני מינימנטל</h2>
      </header>

      {history.length === 0 ? (
        <p className="mm-no-history">אין מבחנים בהיסטוריה.</p>
      ) : (
        <ul className="mm-history-list">
          {history.map(item => (
            <li key={item.id} className="mm-history-item">
              <span className="mm-history-date">
                {new Date(item.createdAt.toMillis()).toLocaleString("he-IL")}
              </span>
              <span className="mm-history-score">
                ניקוד: {item.score}/{item.maxScore}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Button to return to form */}
      <Button
        variant="primary"
        onClick={() => navigate(`/folder/${patientId}/mini-mental`)}
      >
        חזרה למבחן
      </Button>
    </div>
  );
};

export default MiniMentalHistory;
