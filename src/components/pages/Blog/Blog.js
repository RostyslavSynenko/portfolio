import React, { useEffect } from 'react';

import './Blog.scss';

const Blog = () => {
  useEffect(() => {
    document.title = 'Blog';
  }, []);

  return (
    <section className="blog-page">
      <h2>Blog</h2>
    </section>
  );
};

export default Blog;
