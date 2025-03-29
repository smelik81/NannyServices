import React, { useEffect, useState } from 'react';
import css from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { loginer } from '../../redux/auth/operation.js';
import { useModalClose } from '../../hooks/useModalClose.js';
/* import { useNavigate } from 'react-router-dom'; */
/* import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig.js';
 */
const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const { handleBackdropClick } = useModalClose(onClose);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both email and password fields.');
      return;
    }

    try {
      await dispatch(loginer({ email, password })).unwrap();
      setEmail('');
      setPassword('');
      setError('');

      /*  const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log('User name:', user.displayName); */

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <>
      <div className={css.backdrop} onClick={handleBackdropClick}>
        <div className={css.modal}>
          <form onSubmit={handleSubmit} className={css.form}>
            <span className={css.closeBtn} onClick={onClose}>
              <img src="../../../public/close.png" alt="Close" />
            </span>
            <div className={css.containerLogin}>
              <span className={css.titleLogin}>
                <img src="../../../public/Log_In.png" alt="Log In" />
              </span>
              <p className={css.descriptionLogin}>
                Welcome back! Please enter your credentials to access your
                account and continue your babysitter search.
              </p>
            </div>
            {error && <p className={css.error}>{error}</p>}
            <div className={css.containerInput}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className={css.btnForm}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
