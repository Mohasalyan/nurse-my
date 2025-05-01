import React from "react";
import { Link } from "react-router-dom";
import "./Return.css";

const Return= ({
title,
backgroundColor = "#000000",
textcolor = "#FFFFFF",
to = "#",
style ={}
}) => {
    return (
        <Link
        to={to}
        className="return"
        style={{
            backgroundColor: backgroundColor,
            color: textcolor,
            ...style, // apply any custom styles (like width/height)
        }}
        >
        <h3 className="return-title" style={{ color: textcolor }}>{title}</h3>
        </Link>
    );
    // return (
  
};
export default Return;