import React from 'react';

import linkArrow from '../../../../../assets/link-arrow-right.svg';

const ItemLinks = ({ githubLink, projectLink }) => {
  return (
    <div className="project-links-container">
      <a
        href={githubLink}
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
      {projectLink && (
        <a
          href={projectLink}
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
