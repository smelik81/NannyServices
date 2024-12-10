import React from 'react';
import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className={css.container}>
      <div className={css.icon}>
        <p>Icon</p>
      </div>
      <div className={css.navigation}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/nannies">Nannies</NavLink>
        <button type="button">Log In</button>
        <button type="button">Registration</button>
      </div>
    </div>
  );
};

export default Navigation;
