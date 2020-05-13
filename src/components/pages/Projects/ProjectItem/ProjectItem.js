import React from 'react';

import './ProjectItem.scss';

import ItemLinks from './ItemLinks';

const ProjectItem = ({
  title,
  description,
  imgUrl,
  gitHubUrl,
  link,
  technologies
}) => {
  const techList = technologies.map(tech => (
    <li key={tech} className="technology-item">
      {tech}
    </li>
  ));

  return (
    <div className="project-item" key={title}>
      <div className="flex-container">
        <div className="project-description-container">
          <h2 className="project-title">{title}</h2>
          <p className="project-description">
            {description}
          </p>
          <div className="technologies">
            <ul className="technologies-list">
              {techList}
            </ul>
          </div>
        </div>
        <div className="image-container">
          <a
            href={link || gitHubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="project-image"
              src={imgUrl}
              alt={title}
            />
          </a>
        </div>
      </div>
      <ItemLinks gitHubUrl={gitHubUrl} link={link} />
    </div>
  );
};

export default ProjectItem;
