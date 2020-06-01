import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import QuillEditor from './QuillEditor';
import imagePlaceholder from '../../assets/blog/blog-image-placeholder.png';
import {
  formateTags,
  formateContent
} from '../../utils/helpers';
import { baseImageUrl } from '../../configs';

const PostForm = ({
  initialValues,
  submitAction,
  isEditing
}) => {
  const {
    tags,
    title,
    content,
    image = null
  } = initialValues;
  const history = useHistory();
  const postImagePlaceholder = useRef();
  const [textFields, setTextFields] = useState({
    postTags: tags,
    postTitle: title
  });
  const [postContent, setPostContent] = useState(content);
  const [postImage, setPostImage] = useState(image);

  const handleCancel = () => {
    history.goBack();
  };

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
    setPostContent(value);
  };

  const resetForm = () => {
    setTextFields({
      postTags: '',
      postTitle: ''
    });
    setPostContent('');
    setPostImage(null);
    postImagePlaceholder.current.src = imagePlaceholder;
    postImagePlaceholder.current.alt = 'Placeholder';
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const tags = formateTags(textFields.postTags);
      const content = formateContent(postContent);
      const title = textFields.postTitle.trim();
      const data = { tags, title, content };

      if (
        isEditing &&
        postImage.size === image.size &&
        (postImage.originalname ||
          postImage.name === image.originalname)
      ) {
        await submitAction({ ...data, image });
      } else {
        const formData = new FormData();

        formData.append('image', postImage);

        await submitAction(
          { ...data, image: formData },
          image
        );
      }

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = isEditing
      ? 'Edit post'
      : 'Create new post';

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="post-image-container">
        <img
          ref={postImagePlaceholder}
          src={
            image && image.filename
              ? `${baseImageUrl}/${image.filename}`
              : imagePlaceholder
          }
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
          content={postContent}
        />
        <div className="submit-cancel-container">
          <button
            type="submit"
            className="button-primary submit-button"
          >
            {isEditing ? 'Update' : 'Create post'}
          </button>
          <button
            className="button-primary cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
