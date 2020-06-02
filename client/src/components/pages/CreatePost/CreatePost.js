import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../HOC';
import PostForm from '../../../shared/PostForm';
import { createPost } from '../../../actions';

const CreatePost = ({ createPost }) => {
  const initialValues = {
    tags: '',
    title: '',
    content: ''
  };

  const submitAction = async data => {
    await createPost(data);
  };

  return (
    <div className="full-screen-container">
      <div className="create-post-page">
        <PostForm
          submitAction={submitAction}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    { createPost: createPost(httpService) },
    dispatch
  );

export default withHttpService()(
  connect(null, mapDispatchToProps)(CreatePost)
);
