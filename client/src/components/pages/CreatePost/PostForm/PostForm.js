import React, { useState } from 'react';

import QuillEditor from '../QuillEditor';

const PostForm = () => {
  const [textFields, setTextFields] = useState({
    postTags: '',
    postTitle: ''
  });
  const [content, setContent] = useState('');

  const handleChangeText = event => {
    const { name, value } = event.target;

    setTextFields({ ...textFields, [name]: value });
  };

  const handleEditorChange = value => {
    setContent(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="post-image-container">
        <label
          htmlFor="post-image"
          className="post-image-label"
        >
          Post image
        </label>
        <input
          type="file"
          name="postImage"
          className="post-image-input"
          id="post-image"
        />
      </div>
      <div className="field-wrapper">
        <input
          type="text"
          name="postTags"
          className="post-tags"
          placeholder="Post tags"
          value={textFields.postTags}
          onChange={handleChangeText}
        />
      </div>
      <div className="field-wrapper">
        <input
          type="text"
          name="postTitle"
          className="post-title"
          placeholder="Post title"
          value={textFields.postTitle}
          onChange={handleChangeText}
          required
        />
      </div>
      <QuillEditor
        handleChange={handleEditorChange}
        content={content}
      />
      <button type="submit" className="button-primary">
        Create post
      </button>
    </form>
  );
};

export default PostForm;
