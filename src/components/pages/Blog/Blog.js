import React, { useEffect } from 'react';

import PostItem from './PostItem';
import { mockArticles } from '../../../configs';

const Blog = () => {
  const articles = mockArticles.map(article => (
    <PostItem {...article} key={article.id} />
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
