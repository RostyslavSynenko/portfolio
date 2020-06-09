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
  DELETE_POST_ERROR,
  CLEAR_POST
} from '../actions/actionTypes';
import {
  deleteItem,
  updateItem
} from '../utils/reducerHelpers';

const initialState = {
  loading: false,
  crudLoading: false,
  posts: [],
  post: null
};

const postReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_POSTS_REQUEST:
    case FETCH_POST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CREATE_POST_REQUEST:
    case UPDATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        ...state,
        crudLoading: true
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: payload
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        crudLoading: false,
        posts: [payload, ...state.posts]
      };

    case UPDATE_POST_SUCCESS:
      const { id, data } = payload;

      return {
        ...state,
        crudLoading: false,

        posts: updateItem(state.posts, id, data)
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        crudLoading: false,

        posts: deleteItem(state.posts, payload)
      };
    case FETCH_POSTS_ERROR:
    case FETCH_POST_ERROR:
      return {
        ...state,
        loading: false
      };
    case CREATE_POST_ERROR:
    case UPDATE_POST_ERROR:
    case DELETE_POST_ERROR:
      return {
        ...state,
        crudLoading: false
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null
      };
    default:
      return state;
  }
};

export default postReducer;
