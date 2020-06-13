import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../HOC';
import ProjectItem from './ProjectItem/ProjectItem';
import OverlayButton from '../../../shared/OverlayButton';
import PageLoader from '../../PageLoader';
import { ConfirmModal } from '../../../shared/Modals';
import {
  fetchProjects,
  deleteProject
} from '../../../actions';
import { checkPermission } from '../../../utils/auth';

const Projects = ({
  error,
  token,
  isAuthenticated,
  fetchProjects,
  deleteProject,
  projects,
  loading,
  crudLoading
}) => {
  const history = useHistory();
  const permission = checkPermission({
    token,
    isAuthenticated
  });
  const [modal, setModal] = useState(false);
  const [projectId, setProjectId] = useState(null);

  const projectsElements = projects.map(project => (
    <ProjectItem
      key={project._id}
      {...project}
      setModal={setModal}
      setProjectId={setProjectId}
    />
  ));

  const handleCreate = () => {
    history.push('/projects/create-project');
  };

  const handleDelete = id => async () =>
    await deleteProject(id);

  useEffect(() => {
    document.title = 'Projects';
    window.scrollTo(0, 0);

    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="projects-page">
      <div className="container">
        <section className="projects">
          <div className="projects-page-header">
            <h2 className="projects-title">Projects</h2>
            {permission && (
              <div className="add-post">
                <OverlayButton
                  label="Create project"
                  handleClick={handleCreate}
                >
                  <i className="fas fa-plus add-icon"></i>
                </OverlayButton>
              </div>
            )}
          </div>
          <div className="projects-container">
            {loading && <PageLoader />}
            {!loading &&
              (projects.length ? (
                projectsElements
              ) : (
                <div className="no-projects">
                  <p className="text-block">
                    Sorry... There're no projects yet...
                  </p>
                </div>
              ))}
          </div>
        </section>
      </div>
      {modal && (
        <ConfirmModal
          loading={crudLoading}
          error={error}
          actionType="Deleting"
          text="Are you sure?"
          successMessage="Project has been deleted!"
          label="Delete"
          handleOk={handleDelete(projectId)}
          handleCancel={() => setModal(false)}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({
  error,
  auth: { token, isAuthenticated },
  projects: { projects, loading, crudLoading }
}) => ({
  error,
  token,
  isAuthenticated,
  projects,
  loading,
  crudLoading
});

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    {
      fetchProjects: fetchProjects(httpService),
      deleteProject: deleteProject(httpService)
    },
    dispatch
  );

export default withHttpService()(
  connect(mapStateToProps, mapDispatchToProps)(Projects)
);
