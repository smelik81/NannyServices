import { useModalClose } from '../../hooks/useModalClose.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './AppointmentModal.module.css';
import React, { useState } from 'react';

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

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleTimeSelection = time => {
    setValue('meetingTime', time);
    setShowTimePicker(false);
  };

  const onSubmit = data => {
    console.log(data);
    // Здесь будет обработка отправки формы
    onClose();
  };

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
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={css.grid}>
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    {...register('address')}
                  />
                  {errors.address && (
                    <p className={css.errorMessage}>{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+380"
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className={css.errorMessage}>{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    name="childAge"
                    placeholder="Child's age"
                    {...register('childAge')}
                  />
                  {errors.childAge && (
                    <p className={css.errorMessage}>
                      {errors.childAge.message}
                    </p>
                  )}
                </div>

                <div className={css.inputContainer}>
                  <div className={css.timePickerContainer}>
                    <input
                      type="text"
                      name="time"
                      placeholder="00:00"
                      value={selectedTime}
                      onClick={() => setShowTimePicker(!showTimePicker)}
                      readOnly
                    />
                    {showTimePicker && (
                      <div className={css.timeOptions}>
                        {timeOptions.map(time => (
                          <div
                            key={time}
                            className={css.timeOption}
                            onClick={() => handleTimeSelection(time)}
                          >
                            {time}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.meetingTime && (
                    <p className={css.errorMessage}>
                      {errors.meetingTime.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="E-Mail"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className={css.errorMessage}>{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="parentName"
                    placeholder="Father's or mother's name"
                    {...register('parentName')}
                  />
                  {errors.parentName && (
                    <p className={css.errorMessage}>
                      {errors.parentName.message}
                    </p>
                  )}
                </div>

                <div className={css.fullWidth}>
                  <textarea
                    name="comment"
                    rows="4"
                    placeholder="Comment"
                    {...register('comment')}
                  />
                  {errors.comment && (
                    <p className={css.errorMessage}>{errors.comment.message}</p>
                  )}
                </div>
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
