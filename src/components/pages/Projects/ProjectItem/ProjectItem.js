import React from 'react';

import './ProjectItem.scss';
import linkArrow from '../../../../assets/link-arrow-right.svg';

const ProjectItem = ({
  title,
  description,
  imgUrl,
  gitHubUrl,
  link
}) => {
  return (
    <div className="project-item" key={title}>
      <div className="flex-container">
        <div className="project-description-container">
          <h2 className="project-title">{title}</h2>
          <p className="project-description">
            {description}
          </p>
        </div>
        <div className="image-container">
          <a
            href={link || gitHubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={imgUrl} alt={title} />
          </a>
        </div>
      </div>
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
            <span className="link-title">
              To the project
            </span>
            <img
              src={linkArrow}
              alt="Link arrow right"
              className="link-arrow"
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
