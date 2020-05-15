import React from 'react';

import linkArrow from '../../../../../assets/link-arrow-right.svg';

const ItemLinks = ({ gitHubUrl, link }) => {
  return (
    <div className="links-container">
      <a
        href={gitHubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        <span className="link-title">GitHub</span>
        <img
          src={linkArrow}
          alt="Link arrow right"
          className="link-arrow"
        />
      </a>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          <span className="link-title">To the project</span>
          <img
            src={linkArrow}
            alt="Link arrow right"
            className="link-arrow"
          />
        </a>
      )}
    </div>
  );
};

export default ItemLinks;
