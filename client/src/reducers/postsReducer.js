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

const updateItem = (posts, id, updatedPost) => {
  const idx = posts.findIndex(post => post._id === id);

  const newArray = [
    ...posts.slice(0, idx),
    updatedPost,
    ...posts.slice(idx + 1)
  ];

  return newArray;
};

const deleteItem = (posts, id) => {
  const idx = posts.findIndex(post => post._id === id);

  const newArray = [
    ...posts.slice(0, idx),
    ...posts.slice(idx + 1)
  ];

  return newArray;
};

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
    case CREATE_POST:
      return {
        ...state,
        error: null,
        posts: [payload, ...state.posts]
      };
    case UPDATE_POST:
      const { id, data } = payload;

      return {
        ...state,
        posts: updateItem(state.posts, id, data),
        error: null
      };
    case DELETE_POST:
      return {
        ...state,
        posts: deleteItem(state.posts, payload),
        error: null
      };
    default:
      return state;
  }
};

export default postsReducer;
