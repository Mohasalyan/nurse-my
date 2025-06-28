import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { toast } from "react-toastify";
import ConfirmModal from "../../../Components/ConfirmModal/ConfirmModal";
import ContactsSection from "./components/ContactsSection";
import EmergencyServiceSection from "./components/EmergencyServiceSection";
import MainDiagnosesSection from "./components/MainDiagnosesSection";
import MedicationsSection from "./components/MedicationsSection";
import VaccinationsSection from "./components/VaccinationsSection";
import HospitalizationsSection from "./components/HospitalizationsSection";
import FunctionalAssessmentSection from "./components/FunctionalAssessmentSection";
import "./PersonalInfo.css";

const PersonalInfo = ({ patientId, onNavigateToList }) => {
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

    // Contact People (Array to support multiple contacts)
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
      networkReceiver: false,
      hasUsers: false,
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

    // Existing fields
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
          setFormData(prev => ({
            ...prev,
            ...data,
            firstName: data.name || "",
            lastName: data.lastName || "",
            id: data.id || "",
            birthDate: data.birthDate || "",
            phone: data.phone || "",
            address: data.address || "",
            contacts: data.contacts || [{
              name: data.contactName || "",
              phone: data.contactPhone || "",
              address: data.contactAddress || "",
              relationship: "",
              mobile: "",
            }],
            clinic: data.clinic || "",
            notes: data.notes || "",
            // Initialize other fields with empty values if they don't exist
            maritalStatus: data.maritalStatus || "",
            numChildren: data.numChildren || "",
            hmoClinic: data.hmoClinic || "",
            hmoBranch: data.hmoBranch || "",
            emergencyService: data.emergencyService || {
              companyName: "",
              hours: "",
              networkReceiver: false,
              hasUsers: false,
            },
            mainDiagnoses: data.mainDiagnoses || ["", "", "", "", "", ""],
            medications: data.medications || [],
            vaccinations: data.vaccinations || [],
            hospitalizations: data.hospitalizations || [],
            functionalAssessment: data.functionalAssessment || {
              basicFunctions: [],
              activities: [],
            },
            wearsGlasses: data.wearsGlasses || false,
            sex: data.sex || "",
          }));
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
              <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>טלפון</label>
              <input name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>מצב משפחתי</label>
              <input name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} />
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
              <input name="hmoClinic" value={formData.hmoClinic} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>סניף קופ"ח</label>
              <input name="hmoBranch" value={formData.hmoBranch} onChange={handleChange} />
            </div>
            <div className="form-field full-width">
              <label>כתובת</label>
              <input name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="form-field checkbox-field">
              <label>
                <input
                  type="checkbox"
                  name="wearsGlasses"
                  checked={formData.wearsGlasses}
                  onChange={handleCheckboxChange}
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

        <MedicationsSection 
          medications={formData.medications} 
          onChange={(medications) => setFormData({ ...formData, medications })}
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
