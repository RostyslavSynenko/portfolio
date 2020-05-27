import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  posts: [],
  post: null
};

const postsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
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
        loading: true
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: payload
      };
    case FETCH_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts]
      };
    case UPDATE_POST:
      return {
        ...state
      };
    case DELETE_POST:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default postsReducer;
