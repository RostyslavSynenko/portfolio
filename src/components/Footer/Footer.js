import React from 'react';

import { socialMedia } from './consts';

const Footer = () => {
  const socialMediaLinks = socialMedia.map(
    ({ title, iconClass, url }) => {
      return (
        <li key={title} className="link-item">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={`fab ${iconClass}`}></i>
            {title}
          </a>
        </li>
      );
    }
  );

  return (
    <footer>
      <div className="footer-container">
        <div className="links">
          <ul className="links-list">{socialMediaLinks}</ul>
        </div>
      </div>
      <div className="copyright">
        © 2020 Rostyslav Synenko
      </div>
    </footer>
  );
};

export default Footer;
