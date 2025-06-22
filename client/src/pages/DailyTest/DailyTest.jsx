// src/pages/DailyTest/DailyTest.jsx
import React, { useState, useEffect } from "react";
import PatientSearch from "../../Components/PatientSearch/PatientSearch";
import "./DailyTest.css";
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, Timestamp, getDocs, setDoc, doc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const getCurrentDateTimeLocal = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localTime = new Date(now.getTime() - offset * 60000);
  return localTime.toISOString().slice(0, 16);
};

const DailyTest = () => {
  const navigate = useNavigate();
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
        const snapshot = await getDocs(collection(db, "patients"));
        const allPatients = snapshot.docs.map(doc => doc.data());
        const match = allPatients.find(p => p.id === inputs.id);
        if (match) {
          setInputs(prev => ({
            ...prev,
            name: match.name || `${match.firstName || ''} ${match.lastName || ''}`,
            age: match.age,
            address: match.address,
            firstName: match.firstName,
            lastName: match.lastName
          }));
        }
      }
    };
    fetchPatient();
  }, [inputs.id]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

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

  // تأكيد الاسم الكامل
  const firstName = inputs.firstName || '';
  const lastName = inputs.lastName || '';
  const patientName = inputs.name?.trim() || `${firstName} ${lastName}`.trim();

  try {
    // ✅ تحديث البيانات الحيوية في ملف المريض
    if (inputs.id) {
      await setDoc(doc(db, "patients", inputs.id), {
        medical: {
          vitalSigns: {
            bloodPressure: inputs.bloodPressure || '',
            sugar: inputs.sugar || '',
            pulse: inputs.pulse || '',
            bmi: inputs.bmi || '',
            weight: inputs.weight || '',
          }
        }
      }, { merge: true });
    }

    // ✅ إضافة الفحص لجدول الفحوصات اليومية
    await addDoc(collection(db, 'daily_tests'), {
      ...inputs,
      createdAt: Timestamp.now(),
    });

    // ✅ تحديث بيانات المريض الأساسية
    if (inputs.id && patientName) {
      await setDoc(doc(db, "patients", inputs.id), {
        id: inputs.id,
        name: patientName,
        firstName,
        lastName,
        age: inputs.age,
        address: inputs.address
      }, { merge: true });
    }

    // ✅ إضافة تلقائية إلى רשימת מעקב إذا في مؤشرات غير طبيعية
    if (reasons.length > 0) {
      await addDoc(collection(db, 'follow_up_list'), {
        patientId: inputs.id,
        patientName,
        firstName,
        lastName,
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
  { label: "תעודת זהות", name: "id" },
  { label: "שם פרטי", name: "firstName" },
  { label: "שם משפחה", name: "lastName" },
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
      <h2 className="nurse-diary-header">יומן אחות</h2>
      <div className="header-row">
        <div className="search-box">
          <PatientSearch onSelect={(patient) => setInputs(prev => ({
            ...prev,
            id: patient.id,
            name: patient.name,
            age: patient.age,
            address: patient.address,
            firstName: patient.firstName,
            lastName: patient.lastName
          }))} />
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
