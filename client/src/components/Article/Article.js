import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import TagsDate from '../../shared/TagsDate';
import PageLoader from '../PageLoader';
import { mockArticles } from '../../configs';

const Article = ({ match: { params } }) => {
  const [article, setArticle] = useState(null);
  let articleContent;

  if (article) {
    articleContent = article.text
      .split('\n')
      .map((text, i) => (
        <p className="text-block" key={i}>
          {text}
        </p>
      ));
  }

  useEffect(() => {
    // Only for test purpose
    const { id } = params;
    const currArticle = mockArticles.find(
      item => item._id === +id
    );

    const timeoutId = setTimeout(
      () => setArticle(currArticle),
      2000
    );

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!article) {
    return <PageLoader />;
  }

  return (
    <article className="article">
      <div className="article-image-container">
        <img
          src={article.imageUrl}
          alt="Article"
          className="article-image"
        />
      </div>
      <div className="full-screen-container">
        <div className="container">
          <div className="article-header">
            <TagsDate
              tags={article.tags}
              date={article.date}
            />
            <h1 className="article-title">
              {article.title}
            </h1>
          </div>
          <div className="article-content">
            {articleContent}
          </div>
        </div>
      </div>
    </article>
  );
};

export default withRouter(Article);
