import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import VitalsSection from "./components/VitalsSection/VitalsSection";
import MedicalHistorySection from "./components/MedicalHistorySection/MedicalHistorySection";
import NurseLogsSection from "./components/NurseLogsSection/NurseLogsSection";
import BloodTrackingSection from "./components/BloodTrackingSection/BloodTrackingSection";
import SugarTrackingSection from "./components/SugarTrackingSection/SugarTrackingSection";
import AppointmentsSection from "./components/AppointmentsSection/AppointmentsSection";
import MedicationsSection from "./components/MedicationsSection/MedicationsSection";
import { toast } from "react-toastify";
import "./MedicalInfo.css";

const MedicalInfo = ({ patientId }) => {
  const [medicalData, setMedicalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromDaily, setFromDaily] = useState(false);

  useEffect(() => {
    const fetchMedicalInfo = async () => {
      try {
        const docRef = doc(db, "patients", patientId);
        const docSnap = await getDoc(docRef);
        const patient = docSnap.exists() ? docSnap.data() : null;

        if (patient?.medical) {
          const [bloodSnap, sugarSnap, nurseSnap, appointSnap, medsSnap] = await Promise.all([
            getDocs(collection(db, "patients", patientId, "bloodTracking")),
            getDocs(collection(db, "patients", patientId, "sugarTracking")),
            getDocs(collection(db, "patients", patientId, "nurseLogs")),
            getDocs(collection(db, "patients", patientId, "appointments")),
            getDocs(collection(db, "patients", patientId, "medications")),
          ]);

          setMedicalData({
            ...patient.medical,
            bloodTracking: bloodSnap.docs.map((doc) => doc.data()),
            sugarTracking: sugarSnap.docs.map((doc) => doc.data()),
            nurseNotes: nurseSnap.docs.map((doc) => doc.data()),
            appointments: appointSnap.docs.map((doc) => doc.data()),
            medications: medsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
          });
        } else {
          const q = query(
            collection(db, "daily_tests"),
            where("id", "==", patientId)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const d = querySnapshot.docs[0].data();
            const fallbackData = {
              vitalSigns: {
                bloodPressure: d.bloodPressure || "-",
                weight: d.weight || "-",
                pulse: d.pulse || "-",
                sugar: d.sugar || "-",
              },
              history: {
                diseases: d.extraTest || "-",
                allergies: d.fasting || "-",
                medications: d.meds || "-",
              },
              nurseNotes: [
                {
                  date: d.dateAndTime?.split("T")[0] || "לא ידוע",
                  note: d.notes || "אין הערות",
                },
              ],
              bloodTracking: [
                {
                  date: d.dateAndTime?.split("T")[0] || "-",
                  bloodPressure: d.bloodPressure || "-",
                  weight: d.weight || "-",
                  pulse: d.pulse || "-",
                  sugar: d.sugar || "-",
                  note: d.notes || "-",
                },
              ],
              sugarTracking: [],
              appointments: [],
              medications: [],
            };

            setMedicalData(fallbackData);
            setFromDaily(true);
          } else {
            setMedicalData(null);
          }
        }
      } catch (error) {
        console.error("שגיאה בטעינת מידע רפואי:", error);
        toast.error("שגיאה בטעינת מידע רפואי");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalInfo();
  }, [patientId]);

  if (loading) return <div className="medical-loading">טוען מידע רפואי...</div>;
  if (!medicalData) return <div className="medical-error">לא נמצאה רשומה רפואית</div>;

  return (
    <div className="medical-page">
      {fromDaily && (
        <div className="warning-msg">
          מוצג מתוך בדיקות יומיות (לא קיימת רשומה מלאה).
          <button
            className="save-button"
            onClick={async () => {
              try {
                const docRef = doc(db, "patients", patientId);
                await updateDoc(docRef, { medical: medicalData });
                toast.success("✅ נשמר בהצלחה לרשומת המטופל.");
              } catch (error) {
                toast.error("❌ שגיאה בשמירה: " + error.message);
              }
            }}
          >
            💾 שמור רשומה רפואית
          </button>
        </div>
      )}

      <div className="medical-sections">
        <VitalsSection
          initialVitals={medicalData.vitalSigns || {}}
          patientId={patientId}
          onVitalsUpdated={(updatedVitals) =>
            setMedicalData((prev) => ({
              ...prev,
              vitalSigns: updatedVitals,
            }))
          }
        />
        <MedicalHistorySection
          history={medicalData.history || {}}
          patientId={patientId}
          onHistoryUpdated={(updatedHistory) =>
            setMedicalData((prev) => ({
              ...prev,
              history: updatedHistory,
            }))
          }
        />
        <NurseLogsSection
          logs={medicalData.nurseNotes || []}
          patientId={patientId}
          onRowAdded={(newRow) =>
            setMedicalData((prev) => ({
              ...prev,
              nurseNotes: [newRow, ...(prev?.nurseNotes || [])],
            }))
          }
        />
        <BloodTrackingSection
          data={medicalData.bloodTracking || []}
          patientId={patientId}
          onRowAdded={(newRow) =>
            setMedicalData((prev) => ({
              ...prev,
              bloodTracking: [...(prev?.bloodTracking || []), newRow],
            }))
          }
        />
        <SugarTrackingSection
          data={medicalData.sugarTracking || []}
          patientId={patientId}
          onRowAdded={(newRow) =>
            setMedicalData((prev) => ({
              ...prev,
              sugarTracking: [...(prev?.sugarTracking || []), newRow],
            }))
          }
        />
        <AppointmentsSection
          appointments={medicalData.appointments || []}
          patientId={patientId}
          onRowAdded={(newRow) =>
            setMedicalData((prev) => ({
              ...prev,
              appointments: [...(prev?.appointments || []), newRow],
            }))
          }
        />
        <MedicationsSection
          medications={medicalData.medications || []}
          patientId={patientId}
          onMedicationsUpdated={(updatedMeds) =>
            setMedicalData((prev) => ({
              ...prev,
              medications: updatedMeds,
            }))
          }
        />
      </div>
    </div>
  );
};

export default MedicalInfo;
