import React, { useState } from 'react';
import css from './RegisterForm.module.css';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operation.js';

const RegisterForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password })).unwrap();

      setEmail('');
      setPassword('');

      if (onClose) onClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <form onSubmit={handleSubmit} className={css.form}>
          <span className={css.closeBtn}>
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
