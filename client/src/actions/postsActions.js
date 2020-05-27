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
} from './actionTypes';

const postsRequest = () => ({
  type: FETCH_POSTS_REQUEST
});

const postsLoaded = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts
});

const postsError = error => ({
  type: FETCH_POSTS_ERROR,
  payload: error
});

const postRequest = postId => ({
  type: FETCH_POST_REQUEST,
  payload: postId
});

const postLoaded = post => ({
  type: FETCH_POST_SUCCESS,
  payload: post
});

const postError = error => ({
  type: FETCH_POST_ERROR,
  payload: error
});

const createPost = newPost => ({
  type: CREATE_POST,
  payload: newPost
});

const updatePost = postId => ({
  type: UPDATE_POST,
  payload: postId
});

const deletePost = (postId, newPostData) => ({
  type: DELETE_POST,
  payload: { postId, newPostData }
});
