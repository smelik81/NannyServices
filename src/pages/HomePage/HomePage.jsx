import React from 'react';
import { Link } from 'react-router-dom';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.container}>
      <div className={css.blockWrapper}>
        <h1 className={css.title}>Make Life Easier for the Family:</h1>
        <p className={css.description}>
          Find Babysitters Online for All Occasions
        </p>
        <Link to="/nannies" className={css.link}>
          Get started <span>/</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
