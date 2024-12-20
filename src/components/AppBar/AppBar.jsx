import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLogedIn } from '../../redux/auth/selector.js';
import css from './AppBar.module.css';
import AuthNav from '../AuthNav/AuthNav.jsx';
import UserMenu from '../UserMenu/UserMenu.jsx';
import Navigation from '../Navigation/Navigation.jsx';

const AppBar = () => {
  const isLogedIn = useSelector(selectIsLogedIn);
  return (
    <div className={css.container}>
      <Navigation />
      {isLogedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
};

export default AppBar;

{
  /* <header className={css.header}>
  <Navigation />
  {isLogedIn ? <UserMenu /> : <AuthNav />}
</header>; */
}
