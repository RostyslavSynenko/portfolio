import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import TagsDate from '../../../../shared/TagsDate';
import CrudButtons from '../../../../shared/CrudButtons';
import { createLink } from '../../../../utils/helpers';

const PostItem = ({
  id,
  tags,
  date,
  title,
  text,
  imageUrl
}) => {
  const history = useHistory();
  const articleLink = createLink(title);
  const postPreviewText = text.split('\n')[0];

  const handleClickEdit = () => {
    history.push('/edit-post');
  };

  return (
    <article className="post">
      <div className="post-container">
        <div className="post-header">
          <TagsDate tags={tags} date={date} />
          <div className="post-title">
            <h3>
              <Link
                to={`/article/${articleLink}/${id}`}
                title={title}
              >
                {title}
              </Link>
            </h3>
          </div>
        </div>
        <div className="post-content">
          <p className="text-block">{postPreviewText}</p>
          <Link
            to={`/article/${articleLink}/${id}`}
            className="read-more"
          >
            Read more
          </Link>
        </div>
      </div>
      <img
        src={imageUrl}
        alt="Post background"
        className="post-backgound-img"
      />
      <CrudButtons handleEdit={handleClickEdit} />
    </article>
  );
};

export default PostItem;
