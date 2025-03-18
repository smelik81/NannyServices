import css from './AppointmentModal.module.css';

import React from 'react';

const AppointmentModal = ({ isOpen, onClose, nannieName }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <button onClick={onClose}>X</button>
        <p style={{ marginBottom: '20px' }}>{nannieName}</p>
      </div>
    </div>
  );
};

export default AppointmentModal;
