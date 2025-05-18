// src/Components/ui/Button/Button.jsx
import React from "react";
import "./Button.css";

export default function Button({ children, className, ...props }) {
  return (
    <button className={`ui-button ${className || ""}`} {...props}>
      {children}
    </button>
  );
}
