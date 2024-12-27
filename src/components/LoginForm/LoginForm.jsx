import React, { useState } from 'react';
import css from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { loginer } from '../../redux/auth/operation.js';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both email and password fields.');
      return;
    }

    try {
      await dispatch(loginer({ email, password })).unwrap();
      navigate('/nannies');

      setEmail('');
      setPassword('');
      setError('');
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <>
      <div className={css.backdrop}>
        <div className={css.modal}>
          <form onSubmit={handleSubmit} className={css.form}>
            <h2>Log In</h2>
            {error && <p className={css.error}>{error}</p>}
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
