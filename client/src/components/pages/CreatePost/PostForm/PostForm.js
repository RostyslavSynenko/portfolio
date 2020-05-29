import React, { useState, useRef } from 'react';

import QuillEditor from '../QuillEditor';
import imagePlaceholder from '../../../../assets/blog/blog-image-placeholder.png';

const PostForm = () => {
  const postImage = useRef(null);
  const [textFields, setTextFields] = useState({
    postTags: '',
    postTitle: ''
  });
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleChangeText = event => {
    const { name, value } = event.target;

    setTextFields({ ...textFields, [name]: value });
  };

  const handleChangeFile = event => {
    const { target } = event;

    if (target && target.files && target.files.length > 0) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      const formData = new FormData();

      fileReader.onload = event => {
        if (!event.target.result) return;

        postImage.current.src = event.target.result;
      };

      fileReader.readAsDataURL(file);

      formData.append('file', file);

      setImage(formData);
    }
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
        <img
          ref={postImage}
          src={imagePlaceholder}
          alt="Placeholder"
          className={`image-placeholder ${
            image ? '' : 'hide-placeholder'
          }`}
        />
        <label
          htmlFor="post-image"
          className="post-image-label"
        >
          <i className="fas fa-plus plus-icon"></i>
        </label>
        <input
          type="file"
          name="postImage"
          className="post-image-input"
          id="post-image"
          onChange={handleChangeFile}
        />
      </div>
      <div className="container">
        <div className="form-header">
          <div className="field-wrapper">
            <input
              type="text"
              name="postTags"
              className="post-tags"
              value={textFields.postTags}
              placeholder="Tags"
              onChange={handleChangeText}
            />
          </div>
          <div className="field-wrapper">
            <input
              type="text"
              name="postTitle"
              className="post-title"
              value={textFields.postTitle}
              placeholder="Title"
              onChange={handleChangeText}
              required
            />
          </div>
        </div>
        <QuillEditor
          handleChange={handleEditorChange}
          content={content}
        />
        <button
          type="submit"
          className="button-primary create-button"
        >
          Create post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
