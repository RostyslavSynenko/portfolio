import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import imagePlaceholder from '../../assets/image-placeholder.png';
import { formateTags } from '../../utils/helpers';
import { baseImageUrl } from '../../configs';

const ProjectForm = ({
  initialValues,
  submitAction,
  isEditing
}) => {
  const history = useHistory();
  const projectImagePlaceholder = useRef();
  const [fields, setFields] = useState(initialValues);

  const handleCancel = () => {
    history.goBack();
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setFields({ ...fields, [name]: value });
  };

  const handleChangeImage = event => {
    const { target } = event;

    if (target && target.files && target.files.length > 0) {
      const image = event.target.files[0];

      const src = URL.createObjectURL(image);

      const { name } = image;

      projectImagePlaceholder.current.src = src;
      projectImagePlaceholder.current.alt = name;

      setFields({ ...fields, image });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const title = fields.title.trim();
      const description = fields.description
        .trim()
        .replace(/\s{2,}/g, ' ');
      const technologies = formateTags(fields.technologies);
      const prevImage = initialValues.image;
      const currImage = fields.image;
      const data = {
        title,
        description,
        technologies,
        githubLink: fields.githubLink,
        projectLink: fields.projectLink
      };

      if (
        isEditing &&
        currImage.size === prevImage.size &&
        (currImage.originalname ||
          currImage.name === prevImage.originalname)
      ) {
        await submitAction({ ...data, prevImage });
      } else {
        const formData = new FormData();

        formData.append('image', currImage);

        await submitAction(
          { ...data, image: formData },
          prevImage
        );
      }

      if (!isEditing) {
        event.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = isEditing
      ? 'Edit project'
      : 'Create new project';

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="title"
          className="project-title"
          placeholder="Title"
          required
          onChange={handleChange}
        />
        <textarea
          name="description"
          className="project-description"
          placeholder="Write a desription of a project"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="technologies"
          className="project-technologies"
          placeholder="Technologies"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="githubLink"
          className="github-link"
          placeholder="GitHub link"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="githubLink"
          className="project-link"
          placeholder="Project link"
          onChange={handleChange}
        />
      </div>
      <div className="project-image-container">
        <img
          ref={projectImagePlaceholder}
          src={
            fields.image
              ? `${baseImageUrl}/${fields.image.filename}`
              : imagePlaceholder
          }
          alt="Placeholder"
          className="project-image"
        />
        <label
          htmlFor="project-image"
          className="project-image-label"
        >
          <i className="fas fa-plus plus-icon"></i>
        </label>
        <input
          type="file"
          accept="image/*"
          name="image"
          className="project-image-input"
          id="project-image"
          onChange={handleChangeImage}
        />
      </div>
      <div className="submit-cancel-container">
        <button
          type="submit"
          className="button-primary submit-button"
        >
          {isEditing ? 'Update' : 'Create project'}
        </button>
        <button
          className="button-primary cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
