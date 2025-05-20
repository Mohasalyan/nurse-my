// File: /MedicalInfo/components/BloodTrackingSection/BloodTrackingSection.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./BloodTrackingSection.css";

const BloodTrackingSection = ({ data = [], patientId, onRowAdded }) => {
  const [newRow, setNewRow] = useState({
    date: "",
    bloodPressure: "",
    pulse: "",
    sugar: "",
    weight: "",
    note: ""
  });
  const [adding, setAdding] = useState(false);

  const handleChange = (e) => {
    setNewRow({ ...newRow, [e.target.name]: e.target.value });
  };

  const handleAddRow = async () => {
    try {
      if (!patientId) {
        toast.error("שגיאה: מזהה המטופל לא נמצא.");
        return;
      }

      await addDoc(collection(db, "patients", patientId, "bloodTracking"), newRow);
      setAdding(false);
      setNewRow({ date: "", bloodPressure: "", pulse: "", sugar: "", weight: "", note: "" });
      toast.success("השורה נשמרה בהצלחה");
      if (typeof onRowAdded === "function") {
        onRowAdded(newRow);
      }
    } catch (error) {
      console.error("Error adding new row: ", error);
    }
  };

  return (
    <div className="section-card">
      <div className="section-header">
        מעקב לחץ דם / משקל
        <button className="add-row-btn" onClick={() => setAdding(!adding)}>הוסף שורה +</button>
      </div>
      <div className="table-wrapper">
        <table className="tracking-table">
          <thead>
            <tr>
              <th>תאריך</th>
              <th>לחץ דם</th>
              <th>דופק</th>
              <th>סוכר</th>
              <th>משקל</th>
              <th>הערות</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty">אין נתונים זמינים</td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.bloodPressure}</td>
                  <td>{row.pulse}</td>
                  <td>{row.sugar}</td>
                  <td>{row.weight}</td>
                  <td>{row.note}</td>
                </tr>
              ))
            )}
            {adding && (
              <tr>
                <td><input type="date" name="date" value={newRow.date} onChange={handleChange} /></td>
                <td><input name="bloodPressure" value={newRow.bloodPressure} onChange={handleChange} /></td>
                <td><input name="pulse" value={newRow.pulse} onChange={handleChange} /></td>
                <td><input name="sugar" value={newRow.sugar} onChange={handleChange} /></td>
                <td><input name="weight" value={newRow.weight} onChange={handleChange} /></td>
                <td>
                  <input name="note" value={newRow.note} onChange={handleChange} />
                  <button onClick={handleAddRow}>שמור</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodTrackingSection;
