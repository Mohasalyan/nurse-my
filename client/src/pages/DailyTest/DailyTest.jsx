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
    { label: "תאריך ושעה", name: "dateAndTime" },
    { label: "שם מטופל", name: "name" },
    { label: "תעודת זהות", name: "id" },
    { label: "גיל", name: "age" },

    { label: "יישוב", name: "address" },
    { label: "רגישות ואלרגיות", name: "allergies" },
    { label: "תרופות", name: "meds" },
    { label: "צום כן/לא", name: "fasting" },

    { label: "משקל", name: "weight" },
    { label: "גובה", name: "height" },
    { label: "B.M.I", name: "bmi" },
    { label: "מקצוע עיקרי", name: "mainSubject" },

    { label: "לחץ דם", name: "bloodPressure" },
    { label: "דופק", name: "pulse" },
    { label: "סוכר", name: "sugar" },

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

      <div className="home">
        <HomeB
          image={homeIcon}
          style={{ width: "50px", height: "50px" }}
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
          <div className="buttons" >
          <button
            type="button"
            className="flag-button"
            onClick={() => alert("The test has been flagged!")}
          >
            הוספה לרשימת מעקב
          </button>
          <input type="submit" value="שמירת בדיקה" className="submit-button" />
          </div>
        </form>
        </div>
      </div>
  
  );
};

export default DailyTest;
