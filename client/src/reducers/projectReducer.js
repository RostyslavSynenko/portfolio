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
  error: null,
  projects: [],
  project: null
};

const projectReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: payload
      };
    case FETCH_PROJECTS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case FETCH_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        project: payload
      };
    case FETCH_PROJECT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        crudLoading: true,
        error: null
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        crudLoading: false,
        error: null,
        projects: [payload, ...state.projects]
      };
    case CREATE_PROJECT_ERROR:
      return {
        ...state,
        crudLoading: false,
        error: payload
      };
    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        crudLoading: true,
        error: null
      };
    case UPDATE_PROJECT_SUCCESS:
      const { id, data } = payload;

      return {
        ...state,
        crudLoading: false,
        error: null,
        projects: updateItem(state.projects, id, data)
      };
    case UPDATE_PROJECT_ERROR:
      return {
        ...state,
        crudLoading: false,
        error: payload
      };
    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        crudLoading: true,
        error: null
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        crudLoading: false,
        error: null,
        projects: deleteItem(state.projects, payload)
      };
    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        crudLoading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default projectReducer;
