import React, { useEffect } from 'react';

import PostForm from './PostForm';

const CreatePost = () => {
  useEffect(() => {
    document.title = 'Create new post';
  });

  return (
    <div className="full-screen-container">
      <div className="create-post-page">
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePost;
