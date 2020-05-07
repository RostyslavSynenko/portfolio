import React, { useEffect } from 'react';

import './Projects.scss';

const Projects = () => {
  useEffect(() => {
    document.title = 'Projects';
  }, []);

  return <section>Projects</section>;
};

export default Projects;
