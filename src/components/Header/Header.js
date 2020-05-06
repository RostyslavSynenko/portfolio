import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation';

import './Header.scss';

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">Rostyslav Synenko Portfolio</Link>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
