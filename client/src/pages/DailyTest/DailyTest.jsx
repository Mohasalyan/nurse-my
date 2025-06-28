// src/pages/DailyTest/DailyTest.jsx
import React, { useState, useEffect } from "react";
import PatientSearch from "../../Components/PatientSearch/PatientSearch";
import "./DailyTest.css";
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, Timestamp, getDocs, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const getCurrentDateTimeLocal = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localTime = new Date(now.getTime() - offset * 60000);
  return localTime.toISOString().slice(0, 16);
};

const calculateAge = (birthDate) => {
  if (!birthDate) return '';
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  // Adjust age if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age.toString();
};

const DailyTest = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    dateAndTime: getCurrentDateTimeLocal()
  });
  const [idError, setIdError] = useState("");

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

    if (systolic && diastolic && (systolic > 140 || diastolic > 90)) {
      toast.warn("לחץ דם גבוה!", { position: "top-center" });
    }
    if (sugar && sugar > 180) {
      toast.warn("רמת סוכר גבוהה!", { position: "top-center" });
    }
    if (pulse && (pulse < 60 || pulse > 100)) {
      toast.warn("דופק לא תקין!", { position: "top-center" });
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

  useEffect(() => {
    const fetchPatient = async () => {
      if (inputs.id) {
        try {
          // Get patient document
          const patientRef = doc(db, "patients", inputs.id);
          const patientDoc = await getDoc(patientRef);
          
          if (patientDoc.exists()) {
            const patientData = patientDoc.data();
            
            // Get medications from subcollection
            const medicationsSnapshot = await getDocs(collection(db, `patients/${inputs.id}/medications`));
            const medications = medicationsSnapshot.docs.map(doc => doc.data().name).join(', ');
            
            setInputs(prev => ({
              ...prev,
              name: patientData.name || `${patientData.firstName || ''} ${patientData.lastName || ''}`,
              age: calculateAge(patientData.birthDate),
              address: patientData.address,
              firstName: patientData.firstName,
              lastName: patientData.lastName,
              meds: medications,
              allergies: patientData.allergies || ''
            }));
          }
        } catch (error) {
          console.error("Error fetching patient data:", error);
          toast.error("שגיאה בטעינת נתוני המטופל");
        }
      }
    };
    fetchPatient();
  }, [inputs.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'id') {
      // Only allow digits
      const numbersOnly = value.replace(/[^\d]/g, '');
      
      // Update error message
      if (numbersOnly.length > 0 && numbersOnly.length !== 9) {
        setIdError("מספר תעודת זהות חייב להיות 9 ספרות");
      } else {
        setIdError("");
      }
      
      // Update form with numbers only
      setInputs(values => ({ ...values, [name]: numbersOnly }));
    } else {
      setInputs(values => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputs.id || inputs.id.length !== 9) {
      toast.error("מספר תעודת זהות חייב להיות 9 ספרות");
      return;
    }

    const reasons = [];

    const [sys, dia] = (inputs.bloodPressure || '').split('/').map(Number);
    const sugar = Number(inputs.sugar?.toString().trim());
    const pulse = Number(inputs.pulse?.toString().trim());
    const bmi = Number(inputs.bmi?.toString().trim());

    if (sys && dia && (sys > 140 || sys < 90 || dia > 90 || dia < 60)) {
      reasons.push("לחץ דם לא תקין");
    }
    if (sugar && (sugar > 180 || sugar < 70)) {
      reasons.push("סוכר לא תקין");
    }
    if (pulse && (pulse < 60 || pulse > 100)) {
      reasons.push("דופק לא תקין");
    }
    if (bmi && bmi >= 30) {
      reasons.push("BMI גבוה");
    }

    try {
      // Check if patient exists
      const patientRef = doc(db, "patients", inputs.id);
      const patientDoc = await getDoc(patientRef);

      // If patient doesn't exist, show error and return
      if (!patientDoc.exists()) {
        toast.error("מטופל לא קיים במערכת. יש להוסיף את המטופל דרך רשימת המטופלים תחילה.");
        return;
      }

      const patientData = patientDoc.data();
      const patientName = patientData.name || `${patientData.firstName || ''} ${patientData.lastName || ''}`.trim();

      // Update vital signs in patient record
      await updateDoc(patientRef, {
        medical: {
          vitalSigns: {
            bloodPressure: inputs.bloodPressure || '',
            sugar: inputs.sugar || '',
            pulse: inputs.pulse || '',
            bmi: inputs.bmi || '',
            weight: inputs.weight || '',
          }
        }
      });

      // Add to daily tests
      await addDoc(collection(db, 'daily_tests'), {
        ...inputs,
        patientName,
        createdAt: Timestamp.now(),
      });

      // Add to follow-up list if needed
      if (reasons.length > 0) {
        await addDoc(collection(db, 'follow_up_list'), {
          patientId: inputs.id,
          patientName,
          firstName: patientData.firstName || '',
          lastName: patientData.lastName || '',
          reason: reasons.join(', '),
          addedBy: "מערכת אוטומטית",
          createdAt: Timestamp.now()
        });

        toast.info("המטופל נוסף לרשימת מעקב אוטומטית ✅", {
          position: "top-center"
        });
      }

      toast.success("הבדיקה נשמרה בהצלחה!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate("/testlist"),
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
    { label: "תעודת זהות", name: "id", maxLength: 9, error: idError },
    { label: "שם פרטי", name: "firstName" },
    { label: "שם משפחה", name: "lastName" },
    { label: "גיל", name: "age", readOnly: true },
    { label: "יישוב", name: "address" },
    { label: "רגישות ואלרגיות", name: "allergies", readOnly: true },
    { label: "תרופות", name: "meds", readOnly: true },
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
      <h2 className="nurse-diary-header">יומן אחות</h2>
      <div className="header-row">
        <div className="search-box">
          <PatientSearch onSelect={(patient) => {
            if (patient.id && patient.id.length === 9) {
              setInputs(prev => ({
                ...prev,
                id: patient.id,
                name: patient.name,
                age: patient.age,
                address: patient.address,
                firstName: patient.firstName,
                lastName: patient.lastName
              }));
              setIdError("");
            } else {
              setIdError("מספר תעודת זהות חייב להיות 9 ספרות");
            }
          }} />
        </div>
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
                readOnly={["bmi"].includes(field.name)}
                maxLength={field.maxLength}
              />
              {field.error && <span className="error-message">{field.error}</span>}
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

          <div className="clear-button">
            <button
              type="button"
              onClick={() => setInputs({ dateAndTime: getCurrentDateTimeLocal() })}
            >
              ניקוי טופס
            </button>
            <button
              type="button"
              className="view-tests-button"
              onClick={() => navigate("/testlist")}
            >
              מעבר לרשימת בדיקות
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DailyTest;
