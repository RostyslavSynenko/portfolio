import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactHtmlParser from 'react-html-parser';

import { withPostService } from '../HOC';
import TagsDate from '../../shared/TagsDate';
import PageLoader from '../PageLoader';
import { fetchPost } from '../../actions';
import { formateContent } from '../../utils/helpers';
import { baseImageUrl } from '../../configs';

const Article = ({
  match: { params },
  fetchPost,
  post,
  loading
}) => {
  let content;

  if (post) {
    content = ReactHtmlParser(formateContent(post.content));
  }

  useEffect(() => {
    const { id } = params;

    fetchPost(id);
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
      <div className="full-screen-container">
        <div className="container">
          <div className="article-header">
            <TagsDate tags={post.tags} date={post.date} />
            <h1 className="article-title">{post.title}</h1>
          </div>
          <div className="article-content">{content}</div>
        </div>
      </div>
    </article>
  );
};

const mapStateToProps = ({ posts: { post, loading } }) => ({
  post,
  loading
});

const mapDispatchToProps = (dispatch, { postService }) =>
  bindActionCreators(
    {
      fetchPost: fetchPost(postService)
    },
    dispatch
  );

export default withPostService()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Article))
);
