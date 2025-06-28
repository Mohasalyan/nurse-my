import React, { useState } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { toast } from "react-toastify";
import "./PersonalInfo.css";

const CreatePatient = ({ onPatientCreated }) => {
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
    status: "פעיל", // Default status for new patients
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.id || !formData.firstName || !formData.lastName) {
      toast.error("נא למלא שדות חובה: ת.ז, שם פרטי ושם משפחה");
      return;
    }

    try {
      const patientRef = doc(db, "patients", formData.id);
      
      await setDoc(patientRef, {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        createdAt: Timestamp.now(),
        medical: {
          vitalSigns: {
            bloodPressure: '',
            sugar: '',
            pulse: '',
            bmi: '',
            weight: '',
          }
        }
      });

      toast.success("✅ המטופל נוצר בהצלחה!");
      onPatientCreated(formData.id);
    } catch (err) {
      console.error("שגיאה ביצירת מטופל:", err);
      toast.error("❌ שגיאה ביצירת המטופל");
    }
  };

  return (
    <div className="personal-page">
      <h2>יצירת מטופל חדש</h2>
      <form onSubmit={handleSubmit} className="personal-form">
        <div className="form-row">
          <div className="form-group">
            <label>ת.ז *</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>שם פרטי *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>שם משפחה *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>תאריך לידה</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>טלפון</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>כתובת</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>שם איש קשר</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>טלפון איש קשר</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>כתובת איש קשר</label>
            <input
              type="text"
              name="contactAddress"
              value={formData.contactAddress}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>קופת חולים</label>
            <input
              type="text"
              name="clinic"
              value={formData.clinic}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>הערות</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">✅ צור מטופל</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePatient; 