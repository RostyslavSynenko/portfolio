import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactHtmlParser from 'react-html-parser';

import { withHttpService } from '../HOC';
import TagsDate from '../../shared/TagsDate';
import CrudButtons from '../../shared/CrudButtons';
import PageLoader from '../PageLoader';
import {
  fetchPost,
  deletePost,
  clearPost
} from '../../actions';
import { formateContent } from '../../utils/helpers';
import { checkPermission } from '../../utils/auth';
import { baseImageUrl } from '../../configs';

const Article = ({
  match: { params },
  fetchPost,
  deletePost,
  clearPost,
  post,
  loading,
  token,
  isAuthenticated,
  user
}) => {
  const history = useHistory();
  const permission = checkPermission(
    { token, isAuthenticated, user },
    true
  );
  let content;

  if (post) {
    content = ReactHtmlParser(formateContent(post.content));
    document.title = post.title;
  }

  const handleEdit = id => {
    history.push(`/blog/edit-post/${id}`);
  };

  const handleDelete = async id => {
    await deletePost(id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const { id } = params;

    fetchPost(id);

    return () => clearPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (loading || !post) {
    return (
      <div className="article">
        <PageLoader />
      </div>
    );
  }

  return (
    <article className="article">
      <div className="article-image-container">
        <img
          src={`${baseImageUrl}/${post.image.filename}`}
          alt="Article"
          className="article-image"
        />
      </div>

      <div className="container">
        <div className="article-header">
          <TagsDate tags={post.tags} date={post.date} />
          <h1 className="article-title">{post.title}</h1>
        </div>
        <div className="article-content">{content}</div>
        {permission && (
          <CrudButtons
            handleEdit={() => handleEdit(post._id)}
            handleDelete={() => handleDelete(post._id)}
          />
        )}
      </div>
    </article>
  );
};

const mapStateToProps = ({
  auth: { token, isAuthenticated, user },
  posts: { post, loading }
}) => ({
  post,
  loading,
  token,
  isAuthenticated,
  user
});

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    {
      fetchPost: fetchPost(httpService),
      deletePost: deletePost(httpService),
      clearPost
    },
    dispatch
  );

export default withHttpService()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Article))
);
