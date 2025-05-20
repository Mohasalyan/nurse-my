// File: /MedicalInfo/components/MedicalHistorySection/MedicalHistorySection.jsx
import React, { useState } from "react";
import { Edit2, Save } from "lucide-react";
import { toast } from "react-toastify";
import { db } from "@/firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import "./MedicalHistorySection.css";

const MedicalHistorySection = ({ history, patientId, onHistoryUpdated }) => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    diseases: history?.diseases || "",
    allergies: history?.allergies || "",
    medications: history?.medications || "",
  });

  const toggleEdit = async () => {
    if (editMode) {
      try {
        if (!patientId) {
          toast.error("שגיאה: מזהה המטופל לא נמצא.");
          return;
        }

        await updateDoc(doc(db, "patients", patientId), {
          "medical.history": form,
        });

        toast.success("היסטוריה רפואית נשמרה בהצלחה");
        if (typeof onHistoryUpdated === "function") {
          onHistoryUpdated(form);
        }
      } catch (error) {
        console.error("Error saving history:", error);
        toast.error("שגיאה בשמירת ההיסטוריה");
      }
    }
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="section-card">
      <div className="section-header">
        היסטוריה רפואית
        <button className="icon-button" title="ערוך" onClick={toggleEdit}>
          {editMode ? <Save size={18} /> : <Edit2 size={18} />}
        </button>
      </div>

      <div className="history-details">
        <div className="history-item">
          <span>מחלות כרוניות:</span>
          {editMode ? (
            <textarea name="diseases" value={form.diseases} onChange={handleChange} />
          ) : (
            <p>{form.diseases || "לא צוין"}</p>
          )}
        </div>
        <div className="history-item">
          <span>אלרגיות:</span>
          {editMode ? (
            <textarea name="allergies" value={form.allergies} onChange={handleChange} />
          ) : (
            <p>{form.allergies || "לא צוין"}</p>
          )}
        </div>
        <div className="history-item">
          <span>תרופות נוכחיות:</span>
          {editMode ? (
            <textarea name="medications" value={form.medications} onChange={handleChange} />
          ) : (
            <p>{form.medications || "לא צוין"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistorySection;