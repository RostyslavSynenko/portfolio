import React from 'react';

import './ProjectItem.scss';

const ProjectItem = ({
  title,
  description,
  imgUrl,
  gitHubUrl
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
          <img src={imgUrl} alt={title} />
        </div>
      </div>
      <a href={gitHubUrl} className="button-primary">
        GitHub
      </a>
    </div>
  );
};

export default ProjectItem;
