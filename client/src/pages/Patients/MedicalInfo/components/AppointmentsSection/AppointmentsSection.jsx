import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./AppointmentsSection.css";

const AppointmentsSection = ({ appointments = [], patientId, onRowAdded }) => {
  const [newRow, setNewRow] = useState({
    date: "",
    time: "",
    purpose: "",
    doctor: "",
    location: ""
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

      await addDoc(collection(db, "patients", patientId, "appointments"), newRow);
      setAdding(false);
      setNewRow({ date: "", time: "", purpose: "", doctor: "", location: "" });
      toast.success("התור נוסף בהצלחה");

      if (typeof onRowAdded === "function") {
        onRowAdded(newRow);
      }
    } catch (error) {
      console.error("Error adding appointment row: ", error);
    }
  };

  return (
    <div className="section-card">
      <div className="section-header">
        תורים
        <button className="add-row-btn" onClick={() => setAdding(!adding)}>הוסף תור +</button>
      </div>
      <div className="table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>תאריך</th>
              <th>שעה</th>
              <th>סיבת ביקור</th>
              <th>רופא</th>
              <th>מיקום</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">אין תורים</td>
              </tr>
            ) : (
              appointments.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.time}</td>
                  <td>{row.purpose}</td>
                  <td>{row.doctor}</td>
                  <td>{row.location}</td>
                </tr>
              ))
            )}
            {adding && (
              <tr>
                <td><input type="date" name="date" value={newRow.date} onChange={handleChange} /></td>
                <td><input type="time" name="time" value={newRow.time} onChange={handleChange} /></td>
                <td><input name="purpose" value={newRow.purpose} onChange={handleChange} /></td>
                <td><input name="doctor" value={newRow.doctor} onChange={handleChange} /></td>
                <td>
                  <input name="location" value={newRow.location} onChange={handleChange} />
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
export default AppointmentsSection;