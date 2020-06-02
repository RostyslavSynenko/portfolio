import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR
} from '../actions/actionTypes';
import {
  deleteItem,
  updateItem
} from '../utils/reducerHelpers';

const initialState = {
  loading: false,
  crudLoading: false,
  error: null,
  posts: [],
  post: null
};

const postReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: payload
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case FETCH_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        post: payload
      };
    case FETCH_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case CREATE_POST_REQUEST:
      return {
        ...state,
        crudLoading: true,
        error: null
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        crudLoading: false,
        error: null,
        posts: [payload, ...state.posts]
      };
    case CREATE_POST_ERROR:
      return {
        ...state,
        crudLoading: false,
        error: payload
      };
    case UPDATE_POST_REQUEST:
      return {
        ...state,
        crudLoading: true,
        error: null
      };
    case UPDATE_POST_SUCCESS:
      const { id, data } = payload;

      return {
        ...state,
        crudLoading: false,
        error: null,
        posts: updateItem(state.posts, id, data)
      };
    case UPDATE_POST_ERROR:
      return {
        ...state,
        crudLoading: false,
        error: payload
      };
    case DELETE_POST_REQUEST:
      return {
        ...state,
        crudLoading: true,
        error: null
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        crudLoading: false,
        error: null,
        posts: deleteItem(state.posts, payload)
      };
    case DELETE_POST_ERROR:
      return {
        ...state,
        crudLoading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default postReducer;
