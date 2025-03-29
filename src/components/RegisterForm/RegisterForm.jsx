import React, { useState } from 'react';
import css from './RegisterForm.module.css';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operation.js';
import { useModalClose } from '../../hooks/useModalClose.js';
/* import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebaseConfig.js'; */

const RegisterForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { handleBackdropClick } = useModalClose(onClose);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password })).unwrap();

      setEmail('');
      setPassword('');
      /* const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      console.log('User name:', user.displayName);

      await updateProfile(user, { displayName: name }); */

      if (onClose) onClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <form onSubmit={handleSubmit} className={css.form}>
          <span className={css.closeBtn} onClick={onClose}>
            <img src="../../../public/close.png" alt="Close" />
          </span>
          <div className={css.containerRegistration}>
            <span>
              <img src="../../../public/Registration.png" alt="Registration" />
            </span>
            <p className={css.descriptionRegistr}>
              Thank you for your interest in our platform! In order to register,
              we need some information. Please provide us with the following
              information.
            </p>
          </div>
          <div className={css.containerInput}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={css.btnForm}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
