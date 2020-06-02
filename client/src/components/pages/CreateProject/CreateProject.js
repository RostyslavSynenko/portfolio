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
    <div className="full-screen-container">
      <div className="create-project-page">
        <ProjectForm
          initialValues={initialValues}
          submitAction={submitAction}
        />
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

export default withHttpService(
  null,
  mapDispatchToProps
)(connect()(CreateProject));
