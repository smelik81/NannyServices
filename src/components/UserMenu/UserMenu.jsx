import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selector.js';
import { logOut } from '../../redux/auth/operation.js';
import css from './UserMenu.module.css';
import { NavLink, useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const user = useSelector(selectUser);
  console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <div className={css.userContainer}>
      <div className={css.navigation}>
        <div className={css.linkContainer}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/nannies">Nannies</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
        </div>
      </div>
      <div className={css.userInfo}>
        <div className={css.userInfoBlock}>
          <span>
            <img
              src="../../../public/user-foto.png"
              alt="user"
              className={css.foto}
            />
          </span>
          <h3 className={css.title}>{user.email.split('@')[0]}</h3>
        </div>
        <button type="button" className={css.btnLogout} onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
