import React, { useState } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import "./VitalsSection.css";

const VitalsSection = ({ initialVitals, patientId, onVitalsUpdated }) => {
  const [vitals, setVitals] = useState(initialVitals);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      const docRef = doc(db, "patients", patientId);
      await updateDoc(docRef, {
        "medical.vitalSigns": vitals
      });
      setIsEditing(false);
      onVitalsUpdated(vitals);
      toast.success("✅ סימנים חיוניים עודכנו בהצלחה");
    } catch (error) {
      toast.error("❌ שגיאה בעדכון סימנים חיוניים: " + error.message);
    }
  };

  return (
    <div className="section">
      <div className="section-header">
        <h3 className="section-title">סימנים חיוניים</h3>
        <button 
          className="action-button"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? "💾 שמור" : "✏️ ערוך"}
        </button>
      </div>
      <div className="section-content">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>לחץ דם</th>
                <th>משקל</th>
                <th>דופק</th>
                <th>סוכר</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={vitals.bloodPressure || ''}
                      onChange={(e) => setVitals({ ...vitals, bloodPressure: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    vitals.bloodPressure || '-'
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={vitals.weight || ''}
                      onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    vitals.weight || '-'
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={vitals.pulse || ''}
                      onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    vitals.pulse || '-'
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={vitals.sugar || ''}
                      onChange={(e) => setVitals({ ...vitals, sugar: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    vitals.sugar || '-'
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VitalsSection;
