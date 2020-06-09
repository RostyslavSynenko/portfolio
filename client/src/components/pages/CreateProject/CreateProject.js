import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../HOC';
import ProjectForm from '../../../shared/ProjectForm';
import { createProject } from '../../../actions';

const CreateProject = ({ createProject }) => {
  const initialValues = {
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    projectLink: '',
    image: null
  };

  const submitAction = async data => {
    await createProject(data);
  };

  return (
    <div className="create-project-page">
      <div className="container">
        <div className="create-project">
          <ProjectForm
            initialValues={initialValues}
            submitAction={submitAction}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    {
      createProject: createProject(httpService)
    },
    dispatch
  );

export default withHttpService()(
  connect(null, mapDispatchToProps)(CreateProject)
);
