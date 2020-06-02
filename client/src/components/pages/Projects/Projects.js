import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ProjectItem from './ProjectItem/ProjectItem';
import OverlayButton from '../../../shared/OverlayButton';
import { projects } from '../../../configs';

const Projects = () => {
  const history = useHistory();

  const projectsElements = projects.map(project => (
    <ProjectItem key={project.title} {...project} />
  ));

  const handleClickCreate = () => {
    history.push('/projects/create-project');
  };

  useEffect(() => {
    document.title = 'Projects';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="projects-page">
        <section className="projects">
          <div className="projects-page-header">
            <h2 className="projects-title">Projects</h2>
            <div className="add-post">
              <OverlayButton
                label="Create project"
                handleClick={handleClickCreate}
              >
                <i className="fas fa-plus add-icon"></i>
              </OverlayButton>
            </div>
          </div>

          <div className="projects-container">
            {projectsElements}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
