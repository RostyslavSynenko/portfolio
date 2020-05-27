import React from 'react';

import SocialMediaLinks from '../../shared/SocialMediaLinks';

const Footer = () => {
  return (
    <footer>
      <div className="footer-links-container">
        <div className="links">
          <SocialMediaLinks />
        </div>
      </div>
      <div className="copyright">
        © 2020 Rostyslav Synenko
      </div>
    </footer>
  );
};

export default Footer;
