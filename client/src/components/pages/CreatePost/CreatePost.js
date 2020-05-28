import React, { useEffect } from 'react';

import PostForm from './PostForm';

const CreatePost = () => {
  useEffect(() => {
    document.title = 'Create new post';
  });

  return (
    <div className="full-screen-container">
      <div className="container">
        <section className="create-post-page">
          <h2 className="create-post-page-title">
            Create new post
          </h2>
          <PostForm />
        </section>
      </div>
    </div>
  );
};

export default CreatePost;
