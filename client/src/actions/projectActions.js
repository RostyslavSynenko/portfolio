import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_ERROR,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR
} from './actionTypes';
import { returnErrors } from './errorActions';

const projectsRequest = () => ({
  type: FETCH_PROJECTS_REQUEST
});

const projectsLoaded = projects => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: projects
});

const projectsError = () => ({
  type: FETCH_PROJECTS_ERROR
});

const projectRequest = id => ({
  type: FETCH_PROJECT_REQUEST,
  payload: id
});

const projectLoaded = project => ({
  type: FETCH_PROJECT_SUCCESS,
  payload: project
});

const projectError = () => ({
  type: FETCH_PROJECT_ERROR
});

const createProjectRequest = () => ({
  type: CREATE_PROJECT_REQUEST
});

const projectCreated = newProject => ({
  type: CREATE_PROJECT_SUCCESS,
  payload: newProject
});

const createProjectError = () => ({
  type: CREATE_PROJECT_ERROR
});

const updateProjectRequest = () => ({
  type: UPDATE_PROJECT_REQUEST
});

const projectUpdated = (id, data) => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: { id, data }
});

const updateProjectError = () => ({
  type: UPDATE_PROJECT_ERROR
});

const deleteProjectRequest = () => ({
  type: DELETE_PROJECT_REQUEST
});

const projectDeleted = id => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: id
});

const deleteProjectError = () => ({
  type: DELETE_PROJECT_ERROR
});

const fetchProjects = httpService => () => async dispatch => {
  dispatch(projectsRequest());

  try {
    const {
      data: { data }
    } = await httpService.getProjects();

    dispatch(projectsLoaded(data));
  } catch (error) {
    dispatch(projectsError());
    dispatch(returnErrors(error));
  }
};

const fetchProject = httpService => id => async dispatch => {
  dispatch(projectRequest());

  try {
    const {
      data: { data }
    } = await httpService.getProject(id);

    dispatch(projectLoaded(data));
  } catch (error) {
    dispatch(projectError());
    dispatch(returnErrors(error));
  }
};

const createProject = httpService => project => async dispatch => {
  dispatch(createProjectRequest());

  try {
    const {
      data: { image }
    } = await httpService.createImage(project.image);

    const {
      data: { data }
    } = await httpService.createProject({
      ...project,
      image: {
        id: image.id,
        filename: image.filename,
        originalname: image.originalname,
        size: image.size
      }
    });

    dispatch(projectCreated(data));

    return data;
  } catch (error) {
    dispatch(createProjectError());
    dispatch(returnErrors(error));
  }
};

const updateImage = async (httpService, newImage, id) => {
  await httpService.deleteImage(id);

  const {
    data: { image }
  } = await httpService.createImage(newImage);

  return {
    id: image.id,
    filename: image.filename,
    originalname: image.originalname,
    size: image.size
  };
};

const updateProject = httpService => (
  id,
  updatedProject,
  oldImage
) => async dispatch => {
  dispatch(updateProjectRequest());

  try {
    let newImage;

    if (oldImage) {
      newImage = await updateImage(
        httpService,
        updatedProject.image,
        oldImage.id
      );
    }

    const {
      data: { data }
    } = await httpService.updateProject(id, {
      ...updatedProject,
      image: newImage || updatedProject.image
    });

    dispatch(projectUpdated(data._id, data));

    return data;
  } catch (error) {
    dispatch(updateProjectError());
    dispatch(returnErrors(error));
  }
};

const deleteProject = httpService => id => async dispatch => {
  dispatch(deleteProjectRequest());

  try {
    const {
      data: { data }
    } = await httpService.deleteProject(id);

    await httpService.deleteImage(data.image.id);

    dispatch(projectDeleted(data._id));

    return data;
  } catch (error) {
    dispatch(deleteProjectError());
    dispatch(returnErrors(error));
  }
};

export {
  fetchProjects,
  fetchProject,
  createProject,
  updateProject,
  deleteProject
};
