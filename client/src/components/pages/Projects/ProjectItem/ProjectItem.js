import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { withHttpService } from '../../../HOC';
import ItemLinks from './ItemLinks';
import CrudButtons from '../../../../shared/CrudButtons';
import { checkPermission } from '../../../../utils/auth';
import { baseImageUrl } from '../../../../configs';

const ProjectItem = ({
  _id,
  title,
  description,
  githubLink,
  projectLink,
  technologies,
  image,
  token,
  isAuthenticated,
  user,
  setModal,
  setProjectId
}) => {
  const history = useHistory();

  const permission = checkPermission(
    {
      token,
      isAuthenticated,
      user
    },
    true
  );

  const openModal = () => {
    setModal(true);
    setProjectId(_id);
  };

  const handleEdit = id => {
    history.push(`/projects/edit-project/${id}`);
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
            href={projectLink || githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="project-image"
              src={`${baseImageUrl}/${image.filename}`}
              alt={title}
            />
          </a>
        </div>
      </div>
      <ItemLinks
        githubLink={githubLink}
        projectLink={projectLink}
      />
      {permission && (
        <CrudButtons
          handleEdit={() => handleEdit(_id)}
          handleDelete={openModal}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({
  auth: { token, isAuthenticated, user }
}) => ({
  token,
  isAuthenticated,
  user
});

export default withHttpService()(
  connect(mapStateToProps)(ProjectItem)
);
