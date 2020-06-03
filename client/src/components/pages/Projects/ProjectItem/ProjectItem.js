import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../../HOC';
import { deleteProject } from '../../../../actions';
import ItemLinks from './ItemLinks';
import CrudButtons from '../../../../shared/CrudButtons';
import { baseImageUrl } from '../../../../configs';

const ProjectItem = ({
  _id,
  title,
  description,
  githubLink,
  projectLink,
  technologies,
  image,
  deleteProject
}) => {
  const history = useHistory();

  const handleEdit = id => {
    history.push(`/projects/edit-project/${id}`);
  };

  const handleDelete = async id => {
    await deleteProject(id);
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
      <CrudButtons
        handleEdit={() => handleEdit(_id)}
        handleDelete={() => handleDelete(_id)}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    { deleteProject: deleteProject(httpService) },
    dispatch
  );

export default withHttpService()(
  connect(null, mapDispatchToProps)(ProjectItem)
);
