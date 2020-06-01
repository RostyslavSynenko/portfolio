import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withPostService } from '../../HOC';
import PageLoader from '../../PageLoader';
import PostForm from '../../../shared/PostForm';
import { fetchPost, updatePost } from '../../../actions';

const EditPost = ({
  fetchPost,
  updatePost,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="full-screen-container">
      <div className="edit-post-page">
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

const mapDispatchToProps = (dispatch, { postService }) =>
  bindActionCreators(
    {
      fetchPost: fetchPost(postService),
      updatePost: updatePost(postService)
    },
    dispatch
  );

export default withPostService()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(EditPost))
);
