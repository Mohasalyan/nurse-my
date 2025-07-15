// AdminDashboard.jsx
import React from "react";
import useUserRole from "../../hooks/useUserRole";
import PendingUsersPanel from "../../Components/PendingUsersPanel/PendingUsersPanel";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { role, loading } = useUserRole();

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-message">
          טוען נתונים
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <div className="admin-dashboard">
        <div className="access-denied">
          <div className="access-denied-icon">🚫</div>
          <div className="access-denied-message">אין לך גישה לעמוד הזה</div>
          <div className="access-denied-subtitle">רק מנהלי מערכת יכולים לגשת לעמוד זה</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">
            <span className="icon">📋</span>
            לוח בקרה למנהל מערכת
          </h1>
          <p className="admin-dashboard-subtitle">
            ניהול בקשות הרשמה ואישור משתמשים חדשים במערכת
          </p>
        </div>
        
        <div className="admin-dashboard-content">
          <PendingUsersPanel />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
