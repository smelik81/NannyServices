import React from 'react';
import AppBar from '../AppBar/AppBar.jsx';
//import { Outlet } from 'react-router-dom';
import css from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={css.wrapper}>
      <AppBar />
      {children}
    </div>
  );
};

export default Layout;

/* <main className={css.main}>
        <Outlet />
      </main> */
