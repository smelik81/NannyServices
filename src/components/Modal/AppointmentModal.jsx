import css from './AppointmentModal.module.css';

import React from 'react';

const AppointmentModal = ({ isOpen, onClose, nannieName }) => {
  if (!isOpen) return null;

  return (
    <div className={css.backdropForm}>
      <div className={css.modalForm}>
        <form className={css.form}>
          <button onClick={onClose}>X</button>
          <div>{nannieName}</div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
