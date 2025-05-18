// src/Components/ui/Accordion/Accordion.jsx
import React, { createContext, useContext, useState } from "react";
import "./Accordion.css";

const ItemContext = createContext();

export function Accordion({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function AccordionItem({ value, children }) {
  const [open, setOpen] = useState(false);
  return (
    <ItemContext.Provider value={{ open, setOpen }}>
      <div className="accordion-item">{children}</div>
    </ItemContext.Provider>
  );
}

export function AccordionTrigger({ children, className }) {
  const { open, setOpen } = useContext(ItemContext);
  return (
    <button
      className={`${className} accordion-trigger ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      {children}
      <span className={`arrow ${open ? "open" : ""}`}>▾</span>
    </button>
  );
}

export function AccordionContent({ children, className }) {
  const { open } = useContext(ItemContext);
  return open ? <div className={`${className} accordion-content`}>{children}</div> : null;
}
