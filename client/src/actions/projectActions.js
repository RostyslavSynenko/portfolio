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

const projectsRequest = () => ({
  type: FETCH_PROJECTS_REQUEST
});

const projectsLoaded = projects => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: projects
});

const projectsError = error => ({
  type: FETCH_PROJECTS_ERROR,
  payload: error
});

const projectRequest = id => ({
  type: FETCH_PROJECT_REQUEST,
  payload: id
});

const projectLoaded = project => ({
  type: FETCH_PROJECT_SUCCESS,
  payload: project
});

const projectError = error => ({
  type: FETCH_PROJECT_ERROR,
  payload: error
});

const createProjectRequest = () => ({
  type: CREATE_PROJECT_REQUEST
});

const projectCreated = newProject => ({
  type: CREATE_PROJECT_SUCCESS,
  payload: newProject
});

const createProjectError = error => ({
  type: CREATE_PROJECT_ERROR,
  payload: error
});

const updateProjectRequest = () => ({
  type: UPDATE_PROJECT_REQUEST
});

const projectUpdated = (id, data) => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: { id, data }
});

const updateProjectError = error => ({
  type: UPDATE_PROJECT_ERROR,
  payload: error
});

const deleteProjectRequest = () => ({
  type: DELETE_PROJECT_REQUEST
});

const projectDeleted = id => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: id
});

const deleteProjectError = error => ({
  type: DELETE_PROJECT_ERROR,
  payload: error
});

const fetchProjects = httpService => () => async dispatch => {
  dispatch(projectsRequest());

  try {
    const {
      data: { data }
    } = await httpService.getProjects();

    dispatch(projectsLoaded(data));
  } catch (error) {
    dispatch(projectsError(error));
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
    dispatch(projectError(error));
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

    console.log(
      `New project has been created: ${data.title}`
    );
  } catch (error) {
    dispatch(createProjectError(error));
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

    console.log(`Project has been updated: ${data.title}`);
  } catch (error) {
    dispatch(updateProjectError(error));
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

    console.log(`Project has been deleted: ${data.title}`);
  } catch (error) {
    dispatch(deleteProjectError(error));
  }
};

export {
  fetchProjects,
  fetchProject,
  createProject,
  updateProject,
  deleteProject
};
