import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({
  image,
  title,
  color = "#7bb08e",
  textcolor = "#FFFFFF",
  to = "#",
  style = {}, // NEW: allow custom styles
}) => {
  return (
    <Link
      to={to}
      className="card"
      style={{
        backgroundColor: color,
        color: textcolor,
        ...style, // apply any custom styles (like width/height)
      }}
    >
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title" style={{ color: textcolor }}>{title}</h3>
    </Link>
  );
};

export default Card;
