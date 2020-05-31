import React from 'react';
import { useHistory } from 'react-router-dom';

import ItemLinks from './ItemLinks';
import CrudButtons from '../../../../shared/CrudButtons';

const ProjectItem = ({
  title,
  description,
  imgUrl,
  gitHubUrl,
  projectLink,
  technologies
}) => {
  const history = useHistory();

  const handleClickEdit = () => {
    history.push('/edit-project');
  };

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
            href={projectLink || gitHubUrl}
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
      <ItemLinks
        gitHubUrl={gitHubUrl}
        projectLink={projectLink}
      />
      <CrudButtons handleEdit={handleClickEdit} />
    </div>
  );
};

export default ProjectItem;