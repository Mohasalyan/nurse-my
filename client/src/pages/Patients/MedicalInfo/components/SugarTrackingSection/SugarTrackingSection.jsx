// File: /MedicalInfo/components/SugarTrackingSection/SugarTrackingSection.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./SugarTrackingSection.css";

const SugarTrackingSection = ({ data = [], patientId, onRowAdded }) => {
  const [newRow, setNewRow] = useState({
    date: "",
    time: "",
    before: "",
    after: "",
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

      await addDoc(collection(db, "patients", patientId, "sugarTracking"), newRow);
      // تحديث البيانات بدون ريلود:
      setAdding(false);
      setNewRow({ date: "", time: "", before: "", after: "", note: "" });
      toast.success("השורה נשמרה בהצלחה");
      if (typeof onRowAdded === "function") {
  onRowAdded(newRow);
}
    } catch (error) {
      console.error("Error adding new sugar row: ", error);
    }
  };

  return (
    <div className="section-card">
      <div className="section-header">
        מעקב סוכר
        <button className="add-row-btn" onClick={() => setAdding(!adding)}>הוסף שורה +</button>
      </div>
      <div className="table-wrapper">
        <table className="tracking-table">
          <thead>
            <tr>
              <th>תאריך</th>
              <th>שעה</th>
              <th>לפני ארוחה</th>
              <th>אחרי ארוחה</th>
              <th>הערות</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">אין נתונים זמינים</td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.time}</td>
                  <td>{row.before}</td>
                  <td>{row.after}</td>
                  <td>{row.note}</td>
                </tr>
              ))
            )}
            {adding && (
              <tr>
                <td><input type="date" name="date" value={newRow.date} onChange={handleChange} /></td>
                <td><input type="time" name="time" value={newRow.time} onChange={handleChange} /></td>
                <td><input name="before" value={newRow.before} onChange={handleChange} /></td>
                <td><input name="after" value={newRow.after} onChange={handleChange} /></td>
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

export default SugarTrackingSection;