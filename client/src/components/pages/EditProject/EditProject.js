import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../HOC';
import PageLoader from '../../PageLoader';
import ProjectForm from '../../../shared/ProjectForm';
import {
  fetchProject,
  updateProject
} from '../../../actions';

const EditProject = ({
  match: { params },
  fetchProject,
  updateProject,
  project,
  loading
}) => {
  let initialValues;

  if (project) {
    initialValues = {
      ...project,
      technologies: project.technologies.join(', ')
    };
  }

  const submitAction = async (data, oldImage) => {
    await updateProject(project._id, data, oldImage);
  };

  useEffect(() => {
    const { id } = params;

    fetchProject(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="full-screen-container">
      <div className="container">
        <div className="edit-project-page">
          {loading || !project ? (
            <PageLoader />
          ) : (
            <ProjectForm
              initialValues={initialValues}
              submitAction={submitAction}
              isEditing
            />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  projects: { project, loading }
}) => ({
  project,
  loading
});

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    {
      fetchProject: fetchProject(httpService),
      updateProject: updateProject(httpService)
    },
    dispatch
  );

export default withHttpService()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(EditProject))
);
