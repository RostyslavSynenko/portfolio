import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PostItem from './PostItem';
import OverlayButton from '../../../shared/OverlayButton';
import { mockArticles } from '../../../configs';

const Blog = () => {
  const history = useHistory();

  const articles = mockArticles.map(article => (
    <PostItem {...article} key={article.id} />
  ));

  const handleClickCreate = () => {
    history.push('/create-post');
  };

  useEffect(() => {
    document.title = 'Blog';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="full-screen-container">
      <div className="container">
        <section className="blog-page">
          <div className="blog-page-header">
            <h2 className="blog-page-title">Blog</h2>
            <div className="create-post">
              <OverlayButton
                label="Create post"
                handleClick={handleClickCreate}
              >
                <i className="fas fa-plus add-icon"></i>
              </OverlayButton>
            </div>
          </div>
          {articles}
        </section>
      </div>
    </div>
  );
};

export default Blog;
