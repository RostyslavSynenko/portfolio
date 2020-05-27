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

const postRequest = id => ({
  type: FETCH_POST_REQUEST,
  payload: id
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

const updatePost = (id, data) => ({
  type: UPDATE_POST,
  payload: { id, data }
});

const deletePost = id => ({
  type: DELETE_POST,
  payload: id
});

const fetchPosts = postService => () => async dispatch => {
  dispatch(postsRequest());

  try {
    const { data } = await postService.getPosts();

    dispatch(postsLoaded(data));
  } catch (error) {
    dispatch(postsError(error));
  }
};

const fetchPost = postService => id => async dispatch => {
  dispatch(postRequest());

  try {
    const { data } = await postService.getPost(id);

    dispatch(postLoaded(data));
  } catch (error) {
    dispatch(postError(error));
  }
};

const createNewPost = postService => post => async dispatch => {
  dispatch(createPost(post));

  try {
    const { data } = await postService.createPost(post);

    console.log(`New post has been created: ${data}`);
  } catch (error) {
    dispatch(postError(error));
  }
};

const updatePostItem = postService => (
  id,
  updatedPost
) => async dispatch => {
  try {
    const { data } = await postService.updatePost(
      id,
      updatedPost
    );

    dispatch(updatePost(data._id, data));

    console.log(`Post has been updated: ${data}`);
  } catch (error) {
    dispatch(postError(error));
  }
};

const deletePostItem = postService => id => async dispatch => {
  try {
    const { data } = await postService.deletePost(id);

    dispatch(deletePost(data._id));

    console.log(`Post has been deleted: ${data}`);
  } catch (error) {
    dispatch(postError(error));
  }
};

export {
  fetchPosts,
  fetchPost,
  createNewPost,
  updatePostItem,
  deletePostItem
};
