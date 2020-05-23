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
    i > 0 && ', ',
    <a
      href={`/api/category/${tag}`}
      rel="category tag"
      key={tag}
    >
      {tag}
    </a>
  ]);

  return (
    <article className="article">
      <div className="post-header">
        <div>
          {tagsList}
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
        <Link to={`/article/${id}`}>Read more</Link>
      </div>
      <img src={imageUrl} alt="Post background" />
    </article>
  );
};

export default Article;
