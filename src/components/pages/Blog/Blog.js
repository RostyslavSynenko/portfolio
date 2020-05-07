import React, { useEffect } from 'react';

import './Blog.scss';

const Blog = () => {
  useEffect(() => {
    document.title = 'Blog';
  }, []);

  return <section>Blog</section>;
};

export default Blog;
