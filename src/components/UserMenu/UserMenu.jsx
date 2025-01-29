import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selector.js';
import { logOut } from '../../redux/auth/operation.js';
import css from './UserMenu.module.css';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.userContainer}>
      <div className={css.navigation}>
        <div className={css.linkContainer}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/nannies">Nannies</NavLink>
        </div>
      </div>
      <h3 className={css.title}>Welcome, {user.email}</h3>
      <button type="button" className={css.btnLogout} onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
