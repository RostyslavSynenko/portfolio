import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../../HOC';
import { deletePost } from '../../../../actions';
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
  deletePost,
  isAuthenticated,
  user
}) => {
  const history = useHistory();
  const articleLink = createLink(title);
  let postPreviewText;

  const getPreviewText = content => {
    const startIdx = content.indexOf('>') + 1;
    const endIdx = content.indexOf('</p>');

    return content.slice(startIdx, endIdx);
  };

  postPreviewText = getPreviewText(content);

  const handleEdit = id => {
    history.push(`/blog/edit-post/${id}`);
  };

  const handleDelete = async id => {
    await deletePost(id);
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
      {isAuthenticated && user.role === 'admin' && (
        <CrudButtons
          handleEdit={() => handleEdit(_id)}
          handleDelete={() => handleDelete(_id)}
        />
      )}
    </article>
  );
};

const mapStateToProps = ({
  auth: { isAuthenticated, user }
}) => ({ isAuthenticated, user });

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    {
      deletePost: deletePost(httpService)
    },
    dispatch
  );

export default withHttpService()(
  connect(mapStateToProps, mapDispatchToProps)(PostItem)
);
