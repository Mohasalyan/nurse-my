// File: /MedicalInfo/components/NurseLogsSection/NurseLogsSection.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./NurseLogsSection.css";
import { Plus } from "lucide-react";

const NurseLogsSection = ({ logs = [], patientId, onRowAdded }) => {
  const [note, setNote] = useState("");
  const [logList, setLogList] = useState(logs);

  const addNote = async () => {
    if (!note.trim()) return;

    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      note,
    };

    try {
      if (!patientId) {
        toast.error("שגיאה: מזהה המטופל לא נמצא.");
        return;
      }

      await addDoc(collection(db, "patients", patientId, "nurseLogs"), newEntry);
      setLogList([newEntry, ...logList]);
      setNote("");
      toast.success("ההערה נוספה בהצלחה");

      if (typeof onRowAdded === "function") {
        onRowAdded(newEntry);
      }
    } catch (error) {
      console.error("Error adding nurse log: ", error);
    }
  };

  return (
    <div className="section-card">
      <div className="section-header">
        יומן אחיות
      </div>

      <div className="note-entry">
        <textarea
          placeholder="כתוב הערה חדשה..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={addNote} className="add-note-button">
          <Plus size={16} /> הוסף
        </button>
      </div>

      <ul className="logs-list">
        {logList.length === 0 ? (
          <p className="empty">אין הערות</p>
        ) : (
          logList.map((log, i) => (
            <li key={i}>
              <span className="log-date">{log.date}</span> - {log.note}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NurseLogsSection;