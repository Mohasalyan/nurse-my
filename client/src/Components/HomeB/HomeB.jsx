import React from "react";
import { Link } from "react-router-dom";
import "./HomeB.css";

const HomeB = ({
    image,
  title,
 
  to = "#",
  style = {}, // NEW: allow custom styles
}) => {
  return (
    <Link
      to={to}
      className="home"
      style={{
        
        ...style, // apply any custom styles (like width/height)
      }}
    >
    
      <img src={image} alt={title} className="home-image" />
      {/* <h3 className="home-title" style={{ color: textcolor }}>{title}</h3> */}
    </Link>
  );
};

export default HomeB;
