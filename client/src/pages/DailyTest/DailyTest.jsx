import React, { useState } from "react";
import HomeB from "../../Components/HomeB/HomeB";
import homeIcon from "../../assets/Home.png";
import Exit from "../../Components/Exit/Exit";
import "./DailyTest.css";

const DailyTest = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(inputs, null, 2)); // show form data as JSON
  };
  const fields = [
    { label: "שם פרטי", name: "firstName" },
    { label: "שם משפחה", name: "lastName" },
    { label: "גיל", name: "age" },
    { label: "כתובת", name: "address" },
    { label: "עיר", name: "city" },
    { label: "טלפון", name: "phone" },
    { label: "דוא\"ל", name: "email" },
    { label: "מגדר", name: "gender" },
    { label: "תאריך לידה", name: "birthDate" },
    { label: "מספר זהות", name: "idNumber" },
    { label: "מוסד לימודים", name: "school" },
    { label: "מקצוע עיקרי", name: "mainSubject" },
    { label: "שעות שינה", name: "sleepHours" },
    { label: "רמת אנרגיה", name: "energyLevel" },
    { label: "מצב רוח", name: "mood" },
    { label: "תחביבים", name: "hobbies" },
    { label: "תחושת בריאות", name: "healthFeeling" },
    { label: "פעילות גופנית", name: "exercise" },
    { label: "תזונה", name: "nutrition" },
    { label: "שתיית מים", name: "waterIntake" }
  ];

  return (
    <div className="dailytest">
      <div className="exit-icon">
        <Exit title="יציאה" to="/login" />
      </div>

      <div className="home-icon">
        <HomeB
          image={homeIcon}
          style={{ width: "50px", height: "50px", backgroundColor: "#f5f5f5" }}
          to="/home"
        />
      </div>

      {/* Form Section */}
      <div className="formPart">
        <form onSubmit={handleSubmit} className="daily-form">
          {fields.map((field) => (
            <div key={field.name} className="form-field">
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={inputs[field.name] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
          <input type="submit" value="שלח" className="submit-button" />
        </form>

      </div>
    </div>
  );
};

export default DailyTest;
