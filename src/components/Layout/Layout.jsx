import React from 'react';
import AppBar from '../AppBar/AppBar.jsx';
import { Outlet } from 'react-router-dom';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <div className={css.wrapper}>
      <AppBar />
      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
