import React from 'react';

import { socialMedia } from '../../configs';

const SocialMediaLinks = ({ isTitle = true }) => {
  const links = socialMedia.map(
    ({ title, iconClass, url }) => {
      return (
        <li key={title} className="link-item">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={`fab ${iconClass}`}></i>
            {isTitle && title}
          </a>
        </li>
      );
    }
  );

  return <ul className="links-list">{links}</ul>;
};

export default SocialMediaLinks;
