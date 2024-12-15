import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import css from './LoginForm.module.css';

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('Logged in user:', userCredential.user);
      onClose(); // Закриваємо модальне вікно
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
