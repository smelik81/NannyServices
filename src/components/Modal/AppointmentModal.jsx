import { useModalClose } from '../../hooks/useModalClose.js';
import css from './AppointmentModal.module.css';

import React from 'react';

const AppointmentModal = ({ isOpen, onClose, nannieName, nannieAvatar }) => {
  if (!isOpen) return null;

  const { handleBackdropClick } = useModalClose(onClose);

  return (
    <div className={css.backdropForm} onClick={handleBackdropClick}>
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
            <form className={css.form}>
              <div className={css.grid}>
                <input type="text" name="address" placeholder="Address" />
                <input type="tel" name="phone" placeholder="+380" />
                <input
                  type="number"
                  name="childAge"
                  placeholder="Child's age"
                />
                <input type="time" name="time" placeholder="00:00" />

                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail"
                  className={css.fullWidth}
                />
                <input
                  type="text"
                  name="parentName"
                  placeholder="Father's or mother's name"
                  className={css.fullWidth}
                />
                <textarea
                  name="comment"
                  rows="3"
                  placeholder="Comment"
                  className={css.fullWidth}
                />
              </div>
            </form>
            <button className={css.sendModalBtn}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
