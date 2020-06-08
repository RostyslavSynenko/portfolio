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
} from '../actions/actionTypes';
import {
  deleteItem,
  updateItem
} from '../utils/reducerHelpers';

const initialState = {
  loading: false,
  crudLoading: false,
  projects: [],
  project: null
};

const projectReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_PROJECTS_REQUEST:
    case FETCH_PROJECT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CREATE_PROJECT_REQUEST:
    case UPDATE_PROJECT_REQUEST:
    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        crudLoading: true
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: payload
      };
    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        project: payload
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        crudLoading: false,
        projects: [payload, ...state.projects]
      };
    case UPDATE_PROJECT_SUCCESS:
      const { id, data } = payload;

      return {
        ...state,
        crudLoading: false,
        projects: updateItem(state.projects, id, data)
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        crudLoading: false,
        projects: deleteItem(state.projects, payload)
      };
    case FETCH_PROJECTS_ERROR:
    case FETCH_PROJECT_ERROR:
      return {
        ...state,
        loading: false
      };
    case CREATE_PROJECT_ERROR:
    case UPDATE_PROJECT_ERROR:
    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        crudLoading: false
      };
    default:
      return state;
  }
};

export default projectReducer;
