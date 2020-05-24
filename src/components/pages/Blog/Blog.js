import React, { useEffect } from 'react';

import Article from './Article';
import { mockArticles } from './const';

const Blog = () => {
  const articles = mockArticles.map(article => (
    <Article {...article} key={article.id} />
  ));

  useEffect(() => {
    document.title = 'Blog';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="full-screen-container">
      <div className="container">
        <section className="blog-page">
          <h2 className="blog-page-title">Blog</h2>
          {articles}
        </section>
      </div>
    </div>
  );
};

export default Blog;
