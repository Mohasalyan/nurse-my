// ✅ PendingUsersPanel.jsx
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

const PendingUsersPanel = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  const fetchPending = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users_pending"));
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendingUsers(users);
      
    } catch (err) {
      toast.error("שגיאה בשליפת הנתונים");
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
            onClick={async () => {
              closeToast();

              try {
                await setDoc(doc(db, "users", user.id), {
                  name: user.name,
                  email: user.email,
                  role: user.role || "nurse",
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
  message: "לצערנו, בקשתך להירשם נדחתה ❌. ניתן ליצור קשר לפרטים נוספים.",
  includeLoginButton: false,
});


                toast.info("🚫 המשתמש נדחה");
                fetchPending();
              } catch (err) {
                toast.error("❌ שגיאה בעת הדחייה");
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

  return (
    <div>
      <Typography variant="h5" gutterBottom>בקשות ממתינות</Typography>
      {pendingUsers.length === 0 ? (
        <Typography>אין בקשות ממתינות</Typography>
      ) : (
        pendingUsers.map((user) => (
          <Card key={user.id} style={{ marginBottom: "1rem" }}>
            <CardContent>
              <Typography><strong>שם:</strong> {user.name}</Typography>
              <Typography><strong>אימייל:</strong> {user.email}</Typography>
              <Typography><strong>סוג:</strong> {user.role || "nurse"}</Typography>
              <Stack direction="row" spacing={2} marginTop={2}>
                <Button variant="contained" color="success" onClick={() => approveUser(user)}>
                  ✅ אשר
                </Button>
                <Button variant="outlined" color="error" onClick={() => rejectUser(user)}>
                  ❌ דחה
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PendingUsersPanel;