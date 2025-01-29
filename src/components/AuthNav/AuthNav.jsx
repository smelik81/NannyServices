import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm.jsx';
import RegisterForm from '../RegisterForm/RegisterForm.jsx';

const AuthNav = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  return (
    <>
      <nav className={css.navForm}>
        <div className={css.navigation}>
          <div className={css.linkContainer}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/nannies">Nannies</NavLink>
          </div>
        </div>
        <div className={css.buttonContainer}>
          <button
            type="button"
            className={css.linkLogin}
            onClick={() => setShowLoginModal(true)}
          >
            Log In
          </button>
          <button
            type="button"
            className={css.linkRegister}
            onClick={() => setShowRegisterModal(true)}
          >
            Registration
          </button>
        </div>
      </nav>
      {showLoginModal && <LoginForm onClose={() => setShowLoginModal(false)} />}
      {showRegisterModal && (
        <RegisterForm onClose={() => setShowRegisterModal(false)} />
      )}
    </>
  );
};

export default AuthNav;

{
  /* <NavLink
  to="/register"
  className={css.linkRegister}
  onClick={() => setShowRegisterModal(true)}
>
  Registration
</NavLink>
<NavLink
  to="/login"
  className={css.linkLogin}
  onClick={() => setShowLoginModal(true)}
>
  Log in
</NavLink> */
}
