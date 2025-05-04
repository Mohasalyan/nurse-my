// src/pages/DailyTest/DailyTest.jsx
import React, { useState, useEffect } from "react";
import HomeB from "../../Components/HomeB/HomeB";
import homeIcon from "../../assets/Home.png";
import Exit from "../../Components/Exit/Exit";
import "./DailyTest.css";
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getCurrentDateTimeLocal = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localTime = new Date(now.getTime() - offset * 60000);
  return localTime.toISOString().slice(0, 16);
};

const DailyTest = () => {
  const [inputs, setInputs] = useState({
    dateAndTime: getCurrentDateTimeLocal()
  });

  useEffect(() => {
    const weight = parseFloat(inputs.weight);
    const height = parseFloat(inputs.height) / 100;
    if (weight > 0 && height > 0) {
      const bmi = (weight / (height * height)).toFixed(2);
      setInputs(prev => ({ ...prev, bmi }));
    }
  }, [inputs.weight, inputs.height]);

  useEffect(() => {
    const systolic = parseInt(inputs.bloodPressure?.split("/")[0], 10);
    const diastolic = parseInt(inputs.bloodPressure?.split("/")[1], 10);
    const sugar = parseFloat(inputs.sugar);
    const pulse = parseInt(inputs.pulse);

    let isNormal = true;

    if (systolic && diastolic) {
      if (systolic > 140 || diastolic > 90) {
        toast.warn("לחץ דם גבוה!", { position: "top-center" });
        isNormal = false;
      }
    }

    if (sugar) {
      if (sugar > 180) {
        toast.warn("רמת סוכר גבוהה!", { position: "top-center" });
        isNormal = false;
      }
    }

    if (pulse) {
      if (pulse < 60 || pulse > 100) {
        toast.warn("דופק לא תקין!", { position: "top-center" });
        isNormal = false;
      }
    }

    if (
      systolic && diastolic && sugar && pulse &&
      systolic <= 140 &&
      diastolic <= 90 &&
      sugar <= 180 &&
      pulse >= 60 &&
      pulse <= 100
    ) {
      toast.success("כל המדדים תקינים ✅", { position: "top-center" });
    }
  }, [inputs.bloodPressure, inputs.sugar, inputs.pulse]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, 'daily_tests'), {
        ...inputs,
        createdAt: Timestamp.now(),
      });

      toast.success("הבדיקה נשמרה בהצלחה!", {
        position: "top-center",
        autoClose: 3000,
      });

      setInputs({ dateAndTime: getCurrentDateTimeLocal() });
    } catch (error) {
      console.error("שגיאה בשמירה:", error);
      toast.error("שגיאה בשמירת הבדיקה!", {
        position: "top-center",
      });
    }
  };

  const fields = [
    { label: "תאריך ושעה", name: "dateAndTime", type: "datetime-local" },
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
    { label: "בדיקה נוספת", name: "extraTest" },
    { label: "לחץ דם", name: "bloodPressure" },
    { label: "דופק", name: "pulse" },
    { label: "סוכר", name: "sugar" }
  ];

  return (
    <div className="dailytest">
      <div className="exit-icon">
        <Exit title="יציאה" to="/login" />
      </div>

      <div className="home">
        <HomeB image={homeIcon} style={{ width: "50px", height: "50px" }} to="/home" />
      </div>

      <div className="formPart">
        <form onSubmit={handleSubmit} className="daily-form">
          {fields.map((field) => (
            <div key={field.name} className="form-field">
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type || "text"}
                id={field.name}
                name={field.name}
                value={inputs[field.name] || ""}
                onChange={handleChange}
                readOnly={field.name === "bmi"}
              />
            </div>
          ))}
          <div className="form-field full-width">
            <label htmlFor="notes">הערות</label>
            <textarea
              id="notes"
              name="notes"
              value={inputs.notes || ""}
              onChange={handleChange}
              rows="5"
            />
          </div>

          <div className="buttons">
            <button
              type="button"
              className="flag-button"
              onClick={() => toast.info("הבדיקה סומנה למעקב", { position: "top-center" })}
            >
              הוספה לרשימת מעקב
            </button>
            <input type="submit" value="שמירת בדיקה" className="submit-button" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DailyTest;