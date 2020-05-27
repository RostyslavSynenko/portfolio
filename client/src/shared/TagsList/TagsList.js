import React from 'react';

const TagsList = ({ tags }) => {
  const tagItems = tags.map((tag, i) => [
    // separate tags with a coma
    i > 0 && (
      <span className="coma" key={`coma-${tag}`}>
        ,
      </span>
    ),
    <li className="category-tag" key={tag}>
      <a
        href={`/articles/category/${tag}`}
        rel="category tag"
      >
        {tag}
      </a>
    </li>
  ]);

  return <ul className="tags-list">{tagItems}</ul>;
};

export default TagsList;
