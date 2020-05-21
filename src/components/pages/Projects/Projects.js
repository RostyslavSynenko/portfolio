import React, { useEffect } from 'react';

import ProjectItem from './ProjectItem/ProjectItem';
import { projects } from './consts';

const Projects = () => {
  const projectsElements = projects.map(project => (
    <ProjectItem key={project.title} {...project} />
  ));

  useEffect(() => {
    document.title = 'Projects';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="projects-page">
      <section className="projects">
        <h2>Projects</h2>
        <div className="projects-container">
          {projectsElements}
        </div>
      </section>
    </div>
  );
};

export default Projects;
