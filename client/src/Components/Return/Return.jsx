import React from "react";
import { Link } from "react-router-dom";
import "./Return.css";

const Return= ({
title,
color = "#000000",
textcolor = "#FFFFFF",
to = "#",
  style = {}, 
}) => {
  return (
    <Link
      to={to}
        className="return"
        style={{
            backgroundColor: color,
            color: textcolor,
            ...style, // apply any custom styles (like width/height)
          }}
        >
        <h3 className="return-title" style={{ color: textcolor }}>{title}</h3>
        </Link>
    );
  
};
export default Return;