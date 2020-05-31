import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import TagsDate from '../../../../shared/TagsDate';
import CrudButtons from '../../../../shared/CrudButtons';
import { createLink } from '../../../../utils/helpers';
import { baseImageUrl } from '../../../../configs';

const PostItem = ({
  _id,
  tags,
  date,
  title,
  content,
  image,
  handleDelete
}) => {
  const history = useHistory();
  const articleLink = createLink(title);
  let postPreviewText;

  const getPreviewText = content => {
    const idx = content.indexOf('</p>');

    return content.slice(3, idx);
  };

  postPreviewText = getPreviewText(content);

  const handleClickEdit = id => {
    history.push(`/blog/edit-post/${id}`);
  };

  return (
    <article className="post">
      <div className="post-container">
        <div className="post-header">
          <TagsDate tags={tags} date={date} />
          <div className="post-title">
            <h3>
              <Link
                to={`/blog/${articleLink}/${_id}`}
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
            to={`/blog/${articleLink}/${_id}`}
            className="read-more"
          >
            Read more
          </Link>
        </div>
      </div>
      <img
        src={`${baseImageUrl}/${image.filename}`}
        alt="Post background"
        className="post-backgound-img"
      />
      <CrudButtons
        handleEdit={() => handleClickEdit(_id)}
        handleDelete={() => handleDelete(_id)}
      />
    </article>
  );
};

export default PostItem;
