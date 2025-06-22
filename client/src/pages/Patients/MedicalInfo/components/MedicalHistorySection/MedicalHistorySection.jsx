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
    <div className="section">
      <div className="section-header">
        <h3 className="section-title">היסטוריה רפואית</h3>
        <button className="action-button" onClick={toggleEdit}>
          {editMode ? "💾 שמור" : "✏️ ערוך"}
        </button>
      </div>

      <div className="section-content">
        <div className="history-grid">
          <div className="history-item">
            <label>מחלות כרוניות:</label>
            {editMode ? (
              <textarea 
                className="form-control"
                name="diseases" 
                value={form.diseases} 
                onChange={handleChange}
              />
            ) : (
              <p>{form.diseases || "לא צוין"}</p>
            )}
          </div>
          <div className="history-item">
            <label>אלרגיות:</label>
            {editMode ? (
              <textarea 
                className="form-control"
                name="allergies" 
                value={form.allergies} 
                onChange={handleChange}
              />
            ) : (
              <p>{form.allergies || "לא צוין"}</p>
            )}
          </div>
          <div className="history-item">
            <label>תרופות נוכחיות:</label>
            {editMode ? (
              <textarea 
                className="form-control"
                name="medications" 
                value={form.medications} 
                onChange={handleChange}
              />
            ) : (
              <p>{form.medications || "לא צוין"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistorySection;