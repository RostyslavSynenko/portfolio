import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../HOC';
import PageLoader from '../../PageLoader';
import PostForm from '../../../shared/PostForm';
import {
  fetchPost,
  updatePost,
  clearPost
} from '../../../actions';

const EditPost = ({
  fetchPost,
  updatePost,
  clearPost,
  post,
  loading,
  match: { params }
}) => {
  let initialValues;

  if (post) {
    initialValues = {
      ...post,
      tags: post.tags.join(', ')
    };
  }

  const submitAction = async (data, oldImage) => {
    await updatePost(post._id, data, oldImage);
  };

  useEffect(() => {
    const { id } = params;

    fetchPost(id);

    return () => clearPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="edit-post-page">
      <div className="edit-post">
        {loading || !post ? (
          <PageLoader />
        ) : (
          <PostForm
            submitAction={submitAction}
            initialValues={initialValues}
            isEditing
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ posts: { post, loading } }) => ({
  post,
  loading
});

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    {
      fetchPost: fetchPost(httpService),
      updatePost: updatePost(httpService),
      clearPost
    },
    dispatch
  );

export default withHttpService()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(EditPost))
);
