import React from 'react';
import css from './Navigation.module.jsx';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className={css.container}>
      <div className={css.icon}>
        <p>Icon</p>
      </div>
      <div className={css.navigation}>
        <NavLink link to="/">
          Home
        </NavLink>
        <NavLink link to="Nannies">
          Nannies
        </NavLink>
        <button type="button">Log In</button>
        <button type="button">Registration</button>
      </div>
    </div>
  );
};

export default Navigation;
