import React from "react";
import { Link } from "react-router-dom";
import "./Exit.css";

const Exit = ({
  title,
  color = "#7bb08e",
  textcolor = "#FFFFFF",
  to = "#",
  style = {}, 
}) => {
  return (
    <Link
      to={to}
      className="exit"
      style={{
        backgroundColor: color,
        color: textcolor,
        ...style, // apply any custom styles (like width/height)
      }}
    >
      <h3 className="exit-title" style={{ color: textcolor }}>{title}</h3>
    </Link>
  );
};

export default Exit;
