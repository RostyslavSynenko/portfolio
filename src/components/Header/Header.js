import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from './Navigation';

import './Header.scss';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <i className="fab fa-connectdevelop"></i>Rostyslav
          Synenko
        </Link>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
