import React from 'react';

import './Footer.scss';

import { socialMedia } from './consts';

const Footer = () => {
  const socialMediaLinks = socialMedia.map(
    ({ title, className, url }) => {
      return (
        <li key={title}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={`fab ${className}`}></i>
            {title}
          </a>
        </li>
      );
    }
  );

  return (
    <footer>
      <div className="container">
        <div className="links">
          <ul>{socialMediaLinks}</ul>
        </div>
      </div>
      <div className="copyright">
        © 2020 Rostyslav Synenko
      </div>
    </footer>
  );
};

export default Footer;
