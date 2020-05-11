import React, { useEffect } from 'react';

import './Projects.scss';

import ProjectItem from './ProjectItem/ProjectItem';
import { projects } from './consts';

const Projects = () => {
  const projectsElements = projects.map(project => (
    <ProjectItem key={project.title} {...project} />
  ));

  useEffect(() => {
    document.title = 'Projects';
  }, []);

  return (
    <div className="projects-page">
      <section className="projects">
        <h2>My Projects</h2>
        <div className="projects-container">
          {projectsElements}
        </div>
      </section>
      <section className="accomplishments">
        <h2>Accomplishments</h2>
        <div className="accomplishment-item"></div>
      </section>
    </div>
  );
};

export default Projects;
