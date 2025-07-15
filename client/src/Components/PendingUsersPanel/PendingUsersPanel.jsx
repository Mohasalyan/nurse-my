// PendingUsersPanel.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { sendStatusEmail } from "../../utils/sendEmail";
import "./PendingUsersPanel.css";

const PendingUsersPanel = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "users_pending"));
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendingUsers(users);
      
    } catch (err) {
      toast.error("שגיאה בשליפת הנתונים");
    } finally {
      setLoading(false);
    }
  };

const approveUser = (user) => {
  toast(
    ({ closeToast }) => (
      <div>
        האם אתה בטוח שברצונך לאשר את המשתמש <strong>{user.name}</strong>?
        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={async () => {
              closeToast();

              try {
                await setDoc(doc(db, "users", user.id), {
                  name: user.name,
                  email: user.email,
                  role: user.role || "nurse",
                  createdAt: user.createdAt,
                  approvedAt: serverTimestamp(),
                });
                await deleteDoc(doc(db, "users_pending", user.id));
await sendStatusEmail({
  to_name: user.name,
  to_email: user.email,
  message: `החשבון שלך אושר בהצלחה 🎉 תוכל כעת להתחבר למערכת דרך הכפתור הבא:`,
  includeLoginButton: true,
});


                toast.success(`✅ המשתמש ${user.name} אושר`);
                fetchPending();
              } catch (err) {
                toast.error("❌ שגיאה בעת האישור");
              }
            }}
          >
            אשר
          </Button>
          <Button variant="outlined" size="small" color="error" onClick={closeToast}>
            ביטול
          </Button>
        </div>
      </div>
    ),
    { autoClose: false }
  );
};



const rejectUser = (user) => {
  toast(
    ({ closeToast }) => (
      <div>
        האם אתה בטוח שברצונך לדחות את המשתמש <strong>{user.name}</strong>?
        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={async () => {
              closeToast();

              try {
                await deleteDoc(doc(db, "users_pending", user.id));

await sendStatusEmail({
  to_name: user.name || "האחות",
  to_email: user.email,
  message: `מצטערים, החשבון שלך לא אושר על ידי מנהל המערכת. אנא פנה למנהל לקבלת פרטים נוספים.`,
  includeLoginButton: false,
});

                toast.success(`❌ המשתמש ${user.name} נדחה`);
                fetchPending();
              } catch (err) {
                toast.error("❌ שגיאה בעת הדחיה");
              }
            }}
          >
            דחה
          </Button>
          <Button variant="outlined" size="small" onClick={closeToast}>
            ביטול
          </Button>
        </div>
      </div>
    ),
    { autoClose: false }
  );
};


  useEffect(() => {
    fetchPending();
  }, []);

  if (loading) {
    return (
      <div className="pending-users-panel">
        <div className="loading-users">טוען בקשות ממתינות...</div>
      </div>
    );
  }

  return (
    <div className="pending-users-panel">
      <Typography className="pending-users-title" variant="h5" gutterBottom>
        בקשות ממתינות לאישור
      </Typography>
      
      {pendingUsers.length === 0 ? (
        <Typography className="no-pending-message">
          אין בקשות ממתינות כרגע
        </Typography>
      ) : (
        pendingUsers.map((user) => (
          <Card key={user.id} className="pending-user-card">
            <CardContent className="pending-user-content">
              <div className="user-info-row">
                <span className="user-info-label">שם:</span>
                <span className="user-info-value">{user.name}</span>
              </div>
              
              <div className="user-info-row">
                <span className="user-info-label">אימייל:</span>
                <span className="user-info-value">{user.email}</span>
              </div>
              
              <div className="user-info-row">
                <span className="user-info-label">תפקיד:</span>
                <span className="user-role-badge">
                  {user.role === "nurse" ? "אחות" : user.role || "אחות"}
                </span>
              </div>
              
              <div className="user-actions">
                <Button 
                  className="approve-button"
                  variant="contained" 
                  onClick={() => approveUser(user)}
                >
                  ✅ אשר משתמש
                </Button>
                <Button 
                  className="reject-button"
                  variant="outlined" 
                  onClick={() => rejectUser(user)}
                >
                  ❌ דחה בקשה
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PendingUsersPanel;