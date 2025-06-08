// src/Components/ConfirmModal/ConfirmModal.jsx
import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>אישור</button>
          <button className="cancel-btn" onClick={onClose}>ביטול</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;