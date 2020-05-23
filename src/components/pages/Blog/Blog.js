import React, { useEffect } from 'react';

const Blog = () => {
  useEffect(() => {
    document.title = 'Blog';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <section className="blog-page">
        <h2>Blog</h2>
      </section>
    </div>
  );
};

export default Blog;
