import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Navigation from './Navigation';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const toggleHeader = (() => {
      let prevScrollTop = 0;

      return () => {
        const { scrollTop } = document.documentElement;
        const scrollDiff = scrollTop - prevScrollTop;

        if (
          showHeader &&
          scrollTop >= 100 &&
          scrollDiff > 0
        ) {
          setShowHeader(false);
        } else if (scrollDiff < 0) {
          setShowHeader(true);
        }

        prevScrollTop = scrollTop;
      };
    })();

    window.addEventListener('scroll', toggleHeader);

    return () =>
      window.removeEventListener('scroll', toggleHeader);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={showHeader ? '' : 'hide-header'}>
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
