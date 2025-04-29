// src/components/Card.jsx
import React from "react";
import "./Card.css"; // سنحتاج كمان ملف ستايل خاص بالكرت لو أردت

const Card = ({ image, title, color = "#7bb08e" }) => {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
    </div>
  );
};



export default Card;
