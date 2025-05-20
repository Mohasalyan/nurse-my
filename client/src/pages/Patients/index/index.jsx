import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Index = ({ onContinue }) => {
  const navigate = useNavigate();

  return (
    <div className="index-page">
      <div className="index-content">
        <div className="index-icon">
          <span>+</span>
        </div>
        <h1 className="index-title">מערכת ניהול מטופלים</h1>
        <p className="index-description">
          ברוכים הבאים למערכת ניהול המטופלים החדשה שלנו. נהלו את הרשומות הרפואיות בקלות וביעילות.
        </p>
        <div className="index-buttons">
          <button className="index-button" onClick={onContinue}>
            כניסה למערכת
          </button>
          <button className="index-button secondary" onClick={() => navigate("/patientrec")}>
            חזרה לדף הבית
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
