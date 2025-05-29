import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { toast } from "react-toastify";
import "./PersonalInfo.css";

const PersonalInfo = ({ patientId, onNext, onBack }) => {
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
          setStatus(data.status || "");
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "patients", patientId);
      await updateDoc(docRef, { ...formData, status: status });
      toast.success("✅ השינויים נשמרו בהצלחה!");
    } catch (err) {
      console.error("שגיאה בשמירה:", err);
      toast.error("❌ שגיאה בשמירת הנתונים");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "פעיל": return "#c8e6c9";
      case "עזב": return "#fff9c4";
      case "נפתר": return "#ffcdd2";
      default: return "#eeeeee";
    }
  };

  if (loading) return <div className="personal-loading">טוען נתונים...</div>;

  return (
    <div className="personal-page">
      <h2 className="page-title">פרטים אישיים</h2>

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

      <div className="form-actions top">
        <button
          className="next-button"
          onClick={() => onNext && onNext()}
        >
          ➤ המשך לרשומה רפואית
        </button>
        <button className="save-button" onClick={handleSave}>💾 שמור</button>
        <button className="back-button" onClick={onBack}>⬅ חזרה</button>
      </div>

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
            <input name="id" value={formData.id} onChange={handleChange} />
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
        <div className="form-field full-width">
          <label>קופת חולים</label>
          <input name="clinic" value={formData.clinic} onChange={handleChange} />
        </div>

        <div className="form-field full-width">
          <label>סטטוס המטופל</label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">בחר סטטוס</option>
            <option value="פעיל">פעיל</option>
            <option value="נפתר">נפתר</option>
            <option value="עזב">עזב</option>
          </select>
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
  );
};

export default PersonalInfo;
