import React, { useState } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import "./VitalsSection.css";
import { Edit, Save } from "lucide-react";

const VitalsSection = ({ initialVitals, patientId, onVitalsUpdated }) => {
  const [editMode, setEditMode] = useState(false);
  const [vitals, setVitals] = useState(initialVitals);

  const toggleEdit = async () => {
    if (editMode) {
      // عند الحفظ
      try {
        if (!patientId) {
          toast.error("שגיאה: מזהה המטופל לא נמצא.");
          return;
        }

        const patientRef = doc(db, "patients", patientId);
        await updateDoc(patientRef, {
          "medical.vitalSigns": vitals,
        });

        toast.success("הנתונים נשמרו בהצלחה");
        if (typeof onVitalsUpdated === "function") {
          onVitalsUpdated(vitals);
        }
      } catch (error) {
        console.error("Error updating vitals:", error);
        toast.error("שגיאה בשמירת הנתונים");
      }
    }
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVitals((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <h3>סימנים חיוניים</h3>
        <button className="icon-button" onClick={toggleEdit}>
          {editMode ? <Save size={18} /> : <Edit size={18} />}
        </button>
      </div>

      <div className="vitals-grid">
        <div>
          <span>לחץ דם:</span>
          {editMode ? (
            <input name="bloodPressure" value={vitals.bloodPressure} onChange={handleChange} />
          ) : (
            <strong>{vitals.bloodPressure || "-"}</strong>
          )}
        </div>
        <div>
          <span>משקל:</span>
          {editMode ? (
            <input name="weight" value={vitals.weight} onChange={handleChange} />
          ) : (
            <strong>{vitals.weight || "-"} ק"ג</strong>
          )}
        </div>
        <div>
          <span>סוכר:</span>
          {editMode ? (
            <input name="sugar" value={vitals.sugar} onChange={handleChange} />
          ) : (
            <strong>{vitals.sugar || "-"}</strong>
          )}
        </div>
        <div>
          <span>דופק:</span>
          {editMode ? (
            <input name="pulse" value={vitals.pulse} onChange={handleChange} />
          ) : (
            <strong>{vitals.pulse || "-"}</strong>
          )}
        </div>
      </div>
    </div>
  );
};

export default VitalsSection;
