import React from "react";
import "./ConfirmLogoutModal.css";

const ConfirmLogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>האם אתה בטוח שברצונך להתנתק?</h3>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>ביטול</button>
          <button className="confirm-btn" onClick={onConfirm}>התנתק</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
