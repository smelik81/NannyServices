import React, { useEffect, useState } from 'react';
import css from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { loginer } from '../../redux/auth/operation.js';
import { useModalClose } from '../../hooks/useModalClose.js';
/* import { useNavigate } from 'react-router-dom'; */
/* import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig.js';
 */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = ({ onClose }) => {
  /*  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); */
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();

  const { handleBackdropClick } = useModalClose(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur', // Валидация при потере фокуса
  });

  // Обработчик отправки формы
  const onSubmit = async data => {
    try {
      await dispatch(loginer(data)).unwrap();
      reset(); // Очистка формы
      setServerError('');
      if (onClose) onClose();
    } catch (error) {
      console.error('Error during login:', error.message);
      setServerError(error.message || 'Login failed. Please try again.');
    }
  };

  /* const handleSubmit = async e => {
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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log('User name:', user.displayName);

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };*/

  return (
    <>
      <div className={css.backdrop} onClick={handleBackdropClick}>
        <div className={css.modal}>
          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
            {serverError && <p className={css.error}>{serverError}</p>}
            <div className={css.containerInput}>
              <div className={css.inputWrapper}>
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className={errors.email ? css.inputError : ''}
                />
                {errors.email && (
                  <p className={css.errorText}>{errors.email.message}</p>
                )}
              </div>

              <div className={css.inputWrapper}>
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password')}
                  className={errors.password ? css.inputError : ''}
                />
                {errors.password && (
                  <p className={css.errorText}>{errors.password.message}</p>
                )}
              </div>
              {/*  <input
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
              /> */}
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
