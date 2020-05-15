import React, { useEffect } from 'react';

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
