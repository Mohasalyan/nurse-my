// src/components/Card.jsx
// src/components/Card.jsx
import React from "react";
import "./Card.css";

const Card = ({ image, title, color = "#7bb08e", textcolor = "#FFFFFF" }) => {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title" style={{ color: textcolor }}>{title}</h3>
    </div>
  );
};

export default Card;
