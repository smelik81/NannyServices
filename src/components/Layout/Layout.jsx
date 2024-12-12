import React from 'react';
import Navigation from '../Navigation/Navigation.jsx';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
