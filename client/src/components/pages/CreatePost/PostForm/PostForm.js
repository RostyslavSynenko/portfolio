import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withPostService } from '../../../HOC';
import QuillEditor from '../QuillEditor';
import imagePlaceholder from '../../../../assets/blog/blog-image-placeholder.png';
import { createPost } from '../../../../actions';

const PostForm = ({ createPost, postService }) => {
  const postImagePlaceholder = useRef();
  const [textFields, setTextFields] = useState({
    postTags: '',
    postTitle: ''
  });
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState(null);

  const handleChangeText = event => {
    const { name, value } = event.target;

    setTextFields({ ...textFields, [name]: value });
  };

  const handleChangeImage = event => {
    const { target } = event;

    if (target && target.files && target.files.length > 0) {
      const image = event.target.files[0];

      const src = URL.createObjectURL(image);
      const { name } = image;

      postImagePlaceholder.current.src = src;
      postImagePlaceholder.current.alt = name;

      setPostImage(image);
    }
  };

  const handleEditorChange = value => {
    setContent(value);
  };

  const resetForm = () => {
    setTextFields({
      postTags: '',
      postTitle: ''
    });
    setContent('');
    setPostImage(null);
    postImagePlaceholder.current.src = imagePlaceholder;
    postImagePlaceholder.current.alt = 'Placeholder';
  };

  const prepareData = () => {
    const data = {
      tags: textFields.postTags,
      title: textFields.postTitle,
      content
    };
    const image = new FormData();
    image.append('image', postImage);

    return { data, image };
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const data = prepareData();

      await createPost(data);

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="post-image-container">
        <img
          ref={postImagePlaceholder}
          src={imagePlaceholder}
          alt="Placeholder"
          className={`image-placeholder ${
            postImage ? '' : 'hide-placeholder'
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
          accept="image/*"
          name="postImage"
          className="post-image-input"
          id="post-image"
          onChange={handleChangeImage}
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

const mapDispatchToProps = (dispatch, { postService }) =>
  bindActionCreators(
    {
      createPost: createPost(postService)
    },
    dispatch
  );

export default withPostService()(
  connect(null, mapDispatchToProps)(PostForm)
);
