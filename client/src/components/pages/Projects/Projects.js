import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../HOC';
import ProjectItem from './ProjectItem/ProjectItem';
import OverlayButton from '../../../shared/OverlayButton';
import PageLoader from '../../PageLoader';
import { fetchProjects } from '../../../actions';

const Projects = ({
  isAuthenticated,
  fetchProjects,
  projects,
  loading
}) => {
  const history = useHistory();

  const projectsElements = projects.map(project => (
    <ProjectItem key={project._id} {...project} />
  ));

  const handleCreate = () => {
    history.push('/projects/create-project');
  };

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
            {isAuthenticated && (
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
    </div>
  );
};

const mapStateToProps = ({
  auth: { isAuthenticated },
  projects: { projects, loading }
}) => ({ isAuthenticated, projects, loading });

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    {
      fetchProjects: fetchProjects(httpService)
    },
    dispatch
  );

export default withHttpService()(
  connect(mapStateToProps, mapDispatchToProps)(Projects)
);
