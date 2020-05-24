import React from 'react';
import { Link } from 'react-router-dom';

import { formateDate } from '../../../../utils/helpers';

const Article = ({
  id,
  tags,
  date,
  title,
  text,
  imageUrl
}) => {
  const formatedDate = formateDate(date);

  const tagsList = tags.map((tag, i) => [
    // separate tags with a coma
    i > 0 && (
      <span className="coma" key={`coma-${tag}`}>
        ,
      </span>
    ),
    <li className="category-tag" key={tag}>
      <a href={`/api/category/${tag}`} rel="category tag">
        {tag}
      </a>
    </li>
  ]);

  return (
    <article className="article">
      <div className="article-container">
        <div className="post-header">
          <div className="tags-date">
            <ul className="tags-list">{tagsList}</ul>
            <span className="sep">/</span>
            <time>{formatedDate}</time>
          </div>
          <div className="post-title">
            <h3>
              <Link to={`/article/${id}`} title={title}>
                {title}
              </Link>
            </h3>
          </div>
        </div>
        <div className="post-content">
          <p className="text-block">{text}</p>
          <Link to={`/article/${id}`} className="read-more">
            Read more
          </Link>
        </div>
      </div>
      <img
        src={imageUrl}
        alt="Post background"
        className="post-backgound-img"
      />
    </article>
  );
};

export default Article;
