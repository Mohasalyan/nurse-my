import React, { useState } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { toast } from "react-toastify";
import "./PersonalInfo.css";
import ContactsSection from "./components/ContactsSection";
import EmergencyServiceSection from "./components/EmergencyServiceSection";
import MainDiagnosesSection from "./components/MainDiagnosesSection";
import MedicationsSection from "./components/MedicationsSection";
import VaccinationsSection from "./components/VaccinationsSection";
import HospitalizationsSection from "./components/HospitalizationsSection";
import FunctionalAssessmentSection from "./components/FunctionalAssessmentSection";

const CreatePatient = ({ onPatientCreated }) => {
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: "",
    lastName: "",
    id: "",
    birthDate: "",
    phone: "",
    address: "",
    maritalStatus: "",
    numChildren: "",
    hmoClinic: "",
    hmoBranch: "",
    wearsGlasses: false,
    sex: "",
    status: "פעיל",

    // Contact People
    contacts: [{
      name: "",
      relationship: "",
      address: "",
      phone: "",
      mobile: "",
    }],

    // Emergency Services
    emergencyService: {
      companyName: "",
      hours: "",
      visitingDays: "",
    },

    // Regular Diagnoses
    mainDiagnoses: ["", "", "", "", "", ""],

    // Medications
    medications: [{
      name: "",
      dosage: "",
      frequency: "",
    }],

    // Vaccinations
    vaccinations: [{
      date: "",
      type: "",
    }],

    // Hospitalizations
    hospitalizations: [{
      date: "",
      details: "",
    }],

    // Functional Assessment
    functionalAssessment: {
      basicFunctions: [{
        date: "",
        independent: false,
        needsHelp: false,
        unable: false,
        alone: false,
        helpNeeded: false,
        eating: false,
        comments: "",
      }],
      activities: [{
        date: "",
        arrangement: "",
        tableSetting: "",
        dishWashing: "",
        staffName: "",
        staff: "",
        comments: "",
      }],
    },

    // Basic Medical Info
    clinic: "",
    notes: "",
  });

  const [idError, setIdError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'id') {
      validateId(value);
    }
  };

  const handleRadioChange = (e) => {
    setFormData(prev => ({
      ...prev,
      sex: e.target.value
    }));
  };

  const validateId = (id) => {
    if (id.length !== 9) {
      setIdError("תעודת זהות חייבת להכיל 9 ספרות");
      return false;
    }
    setIdError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateId(formData.id)) {
      return;
    }

    try {
      const docRef = await setDoc(doc(db, "patients", formData.id), {
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

      toast.success("המטופל נוצר בהצלחה!");
      onPatientCreated(formData.id);
    } catch (error) {
      console.error("Error creating patient: ", error);
      toast.error("שגיאה ביצירת המטופל");
    }
  };

  return (
    <div className="personal-page">
      <div className="page-header">
        <button className="return-button" onClick={() => onPatientCreated()}>↩️ חזור לרשימה</button>
      </div>

      <form onSubmit={handleSubmit} className="sections-container">
        <div className="section-box">
          <div className="section-title">פרטים אישיים</div>
          <div className="form-grid">
            <div className="form-field">
              <label>שם פרטי *</label>
              <input 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-field">
              <label>שם משפחה *</label>
              <input 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-field">
              <label>תעודת זהות *</label>
              <input 
                name="id" 
                value={formData.id} 
                onChange={handleChange}
                maxLength={9}
                required 
              />
              {idError && <span className="error-message">{idError}</span>}
            </div>
            <div className="form-field radio-group">
              <label>מין</label>
              <div className="radio-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    checked={formData.sex === "male"}
                    onChange={handleRadioChange}
                  />
                  זכר
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    checked={formData.sex === "female"}
                    onChange={handleRadioChange}
                  />
                  נקבה
                </label>
              </div>
            </div>
            <div className="form-field">
              <label>תאריך לידה</label>
              <input 
                type="date" 
                name="birthDate" 
                value={formData.birthDate} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-field">
              <label>טלפון</label>
              <input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-field">
              <label>מצב משפחתי</label>
              <input 
                name="maritalStatus" 
                value={formData.maritalStatus} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-field">
              <label>מס' ילדים</label>
              <input 
                type="number" 
                name="numChildren" 
                value={formData.numChildren} 
                onChange={handleChange}
                min="0" 
              />
            </div>
            <div className="form-field">
              <label>קופת חולים</label>
              <input 
                name="hmoClinic" 
                value={formData.hmoClinic} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-field">
              <label>סניף קופ"ח</label>
              <input 
                name="hmoBranch" 
                value={formData.hmoBranch} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-field full-width">
              <label>כתובת</label>
              <input 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-field checkbox-field">
              <label>
                <input
                  type="checkbox"
                  name="wearsGlasses"
                  checked={formData.wearsGlasses}
                  onChange={handleChange}
                />
                משתמש/ת במשקפיים
              </label>
            </div>
          </div>
        </div>

        <ContactsSection 
          contacts={formData.contacts} 
          onContactsChange={(newContacts) => setFormData(prev => ({ ...prev, contacts: newContacts }))}
        />

        <EmergencyServiceSection
          service={formData.emergencyService}
          onChange={(newService) => setFormData(prev => ({ ...prev, emergencyService: newService }))}
        />

        <MainDiagnosesSection
          diagnoses={formData.mainDiagnoses}
          onChange={(newDiagnoses) => setFormData(prev => ({ ...prev, mainDiagnoses: newDiagnoses }))}
        />

        <VaccinationsSection 
          vaccinations={formData.vaccinations} 
          onChange={(vaccinations) => setFormData({ ...formData, vaccinations })}
        />

        <HospitalizationsSection 
          hospitalizations={formData.hospitalizations} 
          onChange={(hospitalizations) => setFormData({ ...formData, hospitalizations })}
        />

        <FunctionalAssessmentSection 
          assessment={formData.functionalAssessment} 
          onChange={(functionalAssessment) => setFormData({ ...formData, functionalAssessment })}
        />

        <div className="section-box">
          <div className="section-title">פרטים רפואיים בסיסיים</div>
          <div className="form-grid">
            <div className="form-field">
              <label>קופת חולים</label>
              <input 
                name="clinic" 
                value={formData.clinic} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-field">
              <label>סטטוס המטופל</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="פעיל">פעיל</option>
                <option value="לא פעיל">לא פעיל</option>
                <option value="נפטר">נפטר</option>
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

        <div className="form-actions">
          <button type="submit" className="save-button">💾 צור מטופל</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePatient; 