import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import { withHttpService } from '../../../HOC';
import TagsDate from '../../../../shared/TagsDate';
import CrudButtons from '../../../../shared/CrudButtons';
import { createLink } from '../../../../utils/helpers';
import { checkPermission } from '../../../../utils/auth';
import { baseImageUrl } from '../../../../configs';

const PostItem = ({
  _id,
  tags,
  date,
  title,
  content,
  image,
  token,
  isAuthenticated,
  user,
  setModal,
  setPostId
}) => {
  const history = useHistory();
  const permission = checkPermission(
    { token, isAuthenticated, user },
    true
  );
  const articleLink = createLink(title);
  let postPreviewText;

  const getPreviewText = content => {
    const startIdx = content.indexOf('>') + 1;
    const endIdx = content.indexOf('</p>');
    const text = content.slice(startIdx, endIdx);
    const maxTextLength = 250;

    if (text.length > maxTextLength) {
      return text.slice(0, maxTextLength) + '...';
    }

    return text;
  };

  postPreviewText = ReactHtmlParser(
    getPreviewText(content)
  );

  const handleEdit = id => {
    history.push(`/blog/edit-post/${id}`);
  };

  const openModal = () => {
    setModal(true);
    setPostId(_id);
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
      {permission && (
        <CrudButtons
          handleEdit={() => handleEdit(_id)}
          handleDelete={openModal}
        />
      )}
    </article>
  );
};

const mapStateToProps = ({
  auth: { token, isAuthenticated, user }
}) => ({ token, isAuthenticated, user });

export default withHttpService()(
  connect(mapStateToProps)(PostItem)
);
