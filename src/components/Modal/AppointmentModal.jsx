import { useModalClose } from '../../hooks/useModalClose.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './AppointmentModal.module.css';
import React from 'react';

const schema = yup.object().shape({
  address: yup.string().required('Поле "Address" обязательно'),
  phone: yup.string().required('Поле "Phone" обязательно'),
  childAge: yup
    .number()
    .positive()
    .integer()
    .required('Поле "Child\'s age" обязательно'),
  meetingTime: yup.string().required('Поле "Meeting time" обязательно'),
  email: yup
    .string()
    .email('Введите корректный email')
    .required('Поле "E-Mail" обязательно'),
  parentName: yup
    .string()
    .required('Поле "Father\'s or mother\'s name" обязательно'),
  comment: yup.string().required('Поле "Comment" обязательно'),
});

const AppointmentModal = ({ isOpen, onClose, nannieName, nannieAvatar }) => {
  if (!isOpen) return null;

  const { handleBackdropClick } = useModalClose(onClose);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      meetingTime: '',
    },
  });

  const selectedTime = watch('meetingTime');

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
            <form className={css.form} onSubmit={handleSubmit(onClick)}>
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
                  rows="4"
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
