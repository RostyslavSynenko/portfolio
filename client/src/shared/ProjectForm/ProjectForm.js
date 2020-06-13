import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import imagePlaceholder from '../../assets/images/image-placeholder.png';
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
        setFields(initialValues);

        projectImagePlaceholder.current.src = imagePlaceholder;
        projectImagePlaceholder.current.alt = 'Placeholder';
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
      <div className="form-content-container">
        <div className="project-inputs-container">
          <div className="field-wrapper">
            <input
              type="text"
              name="title"
              id="project-title"
              className="project-title"
              required
              value={fields.title}
              onChange={handleChange}
            />
            <label htmlFor="project-title">Title *</label>
          </div>
          <div className="field-wrapper">
            <input
              type="text"
              name="technologies"
              id="project-technologies"
              className="project-technologies"
              required
              value={fields.technologies}
              onChange={handleChange}
            />
            <label htmlFor="project-technologies">
              Technologies *
            </label>
          </div>
          <div className="field-wrapper">
            <input
              type="text"
              name="githubLink"
              id="github-link"
              className="github-link"
              required
              value={fields.githubLink}
              onChange={handleChange}
            />
            <label htmlFor="github-link">
              GitHub link *
            </label>
          </div>
          <div className="field-wrapper">
            <input
              type="text"
              name="projectLink"
              id="project-link"
              className="project-link"
              value={fields.projectLink}
              onChange={handleChange}
            />
            <label htmlFor="project-link">
              Project link
            </label>
          </div>
        </div>
        <div className="project-image-container">
          <img
            ref={projectImagePlaceholder}
            src={
              fields.image && fields.image.filename
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
        <div className="project-description-container">
          <div className="field-wrapper">
            <textarea
              name="description"
              id="project-description"
              className="project-description"
              required
              value={fields.description}
              onChange={handleChange}
            />
            <label htmlFor="project-description">
              Desription of a project *
            </label>
          </div>
        </div>
      </div>
      <div className="submit-cancel-container">
        <button
          type="submit"
          className="button-primary filled submit-button"
        >
          {isEditing ? 'Update' : 'Create project'}
        </button>
        <button
          type="button"
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
