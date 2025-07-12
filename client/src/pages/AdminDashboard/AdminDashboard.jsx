// ✅ AdminDashboard.jsx
import React from "react";
import useUserRole from "../../hooks/useUserRole";
import PendingUsersPanel from "../../Components/PendingUsersPanel/PendingUsersPanel";

const AdminDashboard = () => {
  const { role, loading } = useUserRole();

  if (loading) return <p>...טוען</p>;
  if (role !== "admin") return <p>🚫 אין לך גישה לעמוד הזה.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📋 ניהול בקשות הרשמה</h2>
      <PendingUsersPanel />
    </div>
  );
};

export default AdminDashboard;
