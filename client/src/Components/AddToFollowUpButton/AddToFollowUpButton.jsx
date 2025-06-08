// src/Components/AddToFollowUpButton/AddToFollowUpButton.jsx
import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import './AddToFollowUpButton.css';

const AddToFollowUpButton = ({ patientId, patientName, reason, addedBy }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, 'follow_up_list'), {
        patientId,
        patientName,
        reason,
        addedBy,
        createdAt: Timestamp.now(),
      });
      setAdded(true);
      toast.success('המטופל נוסף למעקב ✅', { position: "top-center" });
    } catch (error) {
      console.error("שגיאה בהוספה למעקב:", error);
      toast.error('שגיאה בהוספה למעקב');
    }
  };

  return (
    <button
      className={added ? 'followup-added-button' : 'followup-button'}
      onClick={handleAdd}
      disabled={added}
    >
      {added ? 'נמצא במעקב' : 'הוסף למעקב'}
    </button>
  );
};

export default AddToFollowUpButton;
