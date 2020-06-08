import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import MenuLink from './MenuLink';
import Logout from './Logout';
import { navLinks } from '../../../configs';

const Navigation = ({ isAuthenticated }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    document.body.classList.toggle('overflow-hidden');

    setOpenMenu(prevState => !prevState);
  };

  const closeMenu = () => {
    if (openMenu) {
      document.body.classList.remove('overflow-hidden');

      setOpenMenu(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (!openMenu) {
        return;
      }

      const maxViewport = 992;
      const currentVieport =
        document.documentElement.clientWidth;

      if (currentVieport > maxViewport) {
        toggleMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () =>
      window.removeEventListener('resize', handleResize);
  });

  return (
    <nav className={openMenu ? 'open' : ''}>
      <ul className="navigation-links">
        {navLinks.map(link => {
          const token = localStorage.getItem('token');

          if (
            (token || isAuthenticated) &&
            link.title === 'Login'
          ) {
            return <Logout key="Logout" />;
          }

          return (
            <MenuLink
              {...link}
              key={link.title}
              handlerClick={closeMenu}
            />
          );
        })}
      </ul>
      <div
        className="burger-menu"
        onClick={toggleMenu}
      ></div>
    </nav>
  );
};

const mapStateToProps = ({
  auth: { isAuthenticated }
}) => ({ isAuthenticated });

export default connect(mapStateToProps, null)(Navigation);
