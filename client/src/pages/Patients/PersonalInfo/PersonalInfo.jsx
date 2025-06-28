import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { toast } from "react-toastify";
import ConfirmModal from "../../../Components/ConfirmModal/ConfirmModal";
import "./PersonalInfo.css";

const PersonalInfo = ({ patientId, onNavigateToList }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    birthDate: "",
    phone: "",
    address: "",
    contactName: "",
    contactPhone: "",
    contactAddress: "",
    clinic: "",
    notes: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idError, setIdError] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const docRef = doc(db, "patients", patientId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            firstName: data.name || "",
            lastName: data.lastName || "",
            id: data.id || "",
            birthDate: data.birthDate || "",
            phone: data.phone || "",
            address: data.address || "",
            contactName: data.contactName || "",
            contactPhone: data.contactPhone || "",
            contactAddress: data.contactAddress || "",
            clinic: data.clinic || "",
            notes: data.notes || "",
          });
          setStatus(data.status === "עזב" ? "לא פעיל" : (data.status || ""));
        }
      } catch (err) {
        console.error("שגיאה בטעינת נתונים:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'id') {
      // Only allow digits
      const numbersOnly = value.replace(/[^\d]/g, '');
      
      // Update error message
      if (numbersOnly.length > 0 && numbersOnly.length !== 9) {
        setIdError("מספר תעודת זהות חייב להיות 9 ספרות");
      } else {
        setIdError("");
      }
      
      // Update form with numbers only
      setFormData({ ...formData, [name]: numbersOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    if (formData.id.length !== 9) {
      toast.error("מספר תעודת זהות חייב להיות 9 ספרות");
      return;
    }

    try {
      const docRef = doc(db, "patients", patientId);
      const updatedStatus = status === "עזב" ? "לא פעיל" : status;
      await updateDoc(docRef, { ...formData, status: updatedStatus });
      toast.success("✅ השינויים נשמרו בהצלחה!");
    } catch (err) {
      console.error("שגיאה בשמירה:", err);
      toast.error("❌ שגיאה בשמירת הנתונים");
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      
      // Delete all subcollections first
      const subcollections = ['medications', 'appointments', 'vitals', 'bloodTests', 'sugarTests', 'nurseLogs', 'miniMental'];
      
      for (const subcollection of subcollections) {
        const querySnapshot = await getDocs(collection(db, 'patients', patientId, subcollection));
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
      }

      // Delete the main patient document
      await deleteDoc(doc(db, "patients", patientId));
      
      toast.success("✅ המטופל נמחק בהצלחה");
      onNavigateToList();
    } catch (err) {
      console.error("שגיאה במחיקת המטופל:", err);
      toast.error("❌ שגיאה במחיקת המטופל");
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "פעיל": return "#DFF5E1";
      case "לא פעיל":
      case "עזב": return "#FAF3D3";
      case "נפטר": return "#E5E7EB";
      default: return "#eeeeee";
    }
  };

  if (loading) return <div className="personal-loading">טוען נתונים...</div>;

  return (
    <div className="personal-page">
      <div className="page-header">
        <button className="return-button" onClick={onNavigateToList}>↩️ חזור לרשימה</button>
      </div>

      <div style={{
        backgroundColor: getStatusColor(status),
        padding: "10px",
        borderRadius: "8px",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "16px"
      }}>
        סטטוס המטופל: {status || "לא ידוע"}
      </div>

      <div className="form-actions">
        <button 
          className="delete-button" 
          onClick={() => setShowDeleteModal(true)}
        >
          🗑️ מחק תיק מטופל
        </button>
        <button className="save-button" onClick={handleSave}>💾 שמור שינויים</button>
      </div>

      <div className="sections-container">
        <div className="section-box">
          <div className="section-title">פרטים אישיים</div>
          <div className="form-grid">
            <div className="form-field">
              <label>שם פרטי</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>שם משפחה</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>תעודת זהות</label>
              <input 
                name="id" 
                value={formData.id} 
                onChange={handleChange}
                maxLength={9}
              />
              {idError && <span className="error-message">{idError}</span>}
            </div>
            <div className="form-field">
              <label>תאריך לידה</label>
              <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>טלפון</label>
              <input name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-field full-width">
              <label>כתובת</label>
              <input name="address" value={formData.address} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="section-box">
          <div className="section-title">אנשי קשר</div>
          <div className="form-grid">
            <div className="form-field">
              <label>שם</label>
              <input name="contactName" value={formData.contactName} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>טלפון</label>
              <input name="contactPhone" value={formData.contactPhone} onChange={handleChange} />
            </div>
            <div className="form-field full-width">
              <label>כתובת</label>
              <input name="contactAddress" value={formData.contactAddress} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="section-box">
          <div className="section-title">פרטים רפואיים בסיסיים</div>
          <div className="form-grid">
            <div className="form-field">
              <label>קופת חולים</label>
              <input name="clinic" value={formData.clinic} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>סטטוס המטופל</label>
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">בחר סטטוס</option>
                <option value="פעיל">פעיל</option>
                <option value="נפטר">נפטר</option>
                <option value="לא פעיל">לא פעיל</option>
              </select>
            </div>
          </div>
        </div>

        <div className="section-box">
          <div className="section-title">תצפיות והערות</div>
          <div className="form-field full-width">
            <textarea
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message="האם אתה בטוח שברצונך למחוק את תיק המטופל? פעולה זו תמחק את כל המידע הרפואי והאישי ולא ניתן יהיה לשחזר אותו."
      />
    </div>
  );
};

export default PersonalInfo;
