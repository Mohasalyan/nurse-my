import React from "react";
import { Link } from "react-router-dom";
import "./HomeB.css";

const HomeB = ({
  image,
  title,
  to = "#",
  style = {},
  plain = false // عرض كصورة فقط
}) => {
  if (plain) {
    return (
      <div className="home-plain-wrapper">
        <img src={image} alt={title} className="home-image" style={style} />
      </div>
    );
  }

  return (
    <Link to={to} className="home" style={style}>
      <img src={image} alt={title} className="home-image" />
    </Link>
  );
};

export default HomeB;
