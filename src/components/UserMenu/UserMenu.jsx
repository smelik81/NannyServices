import React from 'react';
import css from './UserMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selector.js';

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.userContainer}>
      <h3 className={css.title}>Welcome, {user.email}</h3>
      <button type="button" className={css.btnLogout} onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
