import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import css from './RegisterForm.module.css';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/auth/slice.js';

const RegisterForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('Registered user:', userCredential.user);

      dispatch(
        createUser({
          name,
          email: userCredential.user.email,
        })
      );

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
          <h2>Register</h2>
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
          <button type="submit" className={css.btnForm}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
