import React from 'react';
import css from './Navigation.module.css';
//import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className={css.container}>
      <div className={css.icon}>
        <span className={css.icon}>Nanny.Services</span>
      </div>
      {/*  <div className={css.navigation}>
        <div className={css.linkContainer}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/nannies">Nannies</NavLink>
        </div>
      </div> */}
    </div>
  );
};

export default Navigation;

{
  /* <div className={css.buttonContainer}>
   <button
     type="button"
     className={css.btnLogin}
     onClick={() => setShowLoginModal(true)}
   >
     Log In
   </button>
   <button
     type="button"
     className={css.btnRegister}
     onClick={() => setShowRegisterModal(true)}
   >
     Registration
   </button>
 </div> */
}
