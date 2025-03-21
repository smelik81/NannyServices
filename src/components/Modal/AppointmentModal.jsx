import css from './AppointmentModal.module.css';

import React from 'react';

const AppointmentModal = ({ isOpen, onClose, nannieName, nannieAvatar }) => {
  if (!isOpen) return null;

  return (
    <div className={css.backdropForm}>
      <div className={css.modalForm}>
        <div className={css.formBlock}>
          <button className={css.closeModalBtn} onClick={onClose}>
            <img src="../../../public/close.png" alt="Close_modal" />
          </button>
          <div className={css.modalBlock}>
            <div className={css.titleBlock}>
              <p className={css.title}>
                <img src="../../../public/Heading.png" alt="HeadTitle" />
              </p>
              <p className={css.description}>
                <img src="../../../public/Description.png" alt="Description" />
              </p>
            </div>
            <div className={css.nannieBlock}>
              <img
                src={nannieAvatar}
                alt={nannieName}
                className={css.avatarModal}
              />
              <div className={css.nannieInfo}>
                <p className={css.nannieTitle}>Your nanny</p>
                <div className={css.nannieName}>{nannieName}</div>
              </div>
            </div>
            <form className={css.form}></form>
            <button className={css.sendModalBtn}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
