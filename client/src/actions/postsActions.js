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

const createPostRequest = () => ({
  type: CREATE_POST_REQUEST
});

const postCreated = newPost => ({
  type: CREATE_POST_SUCCESS,
  payload: newPost
});

const createPostError = error => ({
  type: CREATE_POST_ERROR,
  payload: error
});

const updatePostRequest = () => ({
  type: UPDATE_POST_REQUEST
});

const postUpdated = (id, data) => ({
  type: UPDATE_POST_SUCCESS,
  payload: { id, data }
});

const updatePostError = error => ({
  type: UPDATE_POST_ERROR,
  payload: error
});

const deletePostRequest = () => ({
  type: DELETE_POST_REQUEST
});

const postDeleted = id => ({
  type: DELETE_POST_SUCCESS,
  payload: id
});

const deletePostError = error => ({
  type: DELETE_POST_ERROR,
  payload: error
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

const createPost = postService => post => async dispatch => {
  dispatch(createPostRequest());

  try {
    const { image } = await postService.createImage(
      post.image
    );
    const { data } = await postService.createPost({
      ...post.data,
      image
    });

    dispatch(postCreated(data));

    console.log(`New post has been created: ${data}`);
  } catch (error) {
    dispatch(createPostError(error));
  }
};

const updatePost = postService => (
  id,
  updatedPost
) => async dispatch => {
  dispatch(updatePostRequest());

  try {
    const { data } = await postService.updatePost(
      id,
      updatedPost
    );

    dispatch(postUpdated(data._id, data));

    console.log(`Post has been updated: ${data}`);
  } catch (error) {
    dispatch(updatePostError(error));
  }
};

const deletePost = postService => id => async dispatch => {
  dispatch(deletePostRequest());

  try {
    const { data } = await postService.deletePost(id);
    const { image } = await postService.deleteImage(
      data.image.filename
    );

    dispatch(postDeleted(data._id));

    console.log(
      `Post has been deleted: ${data}. Image: ${image}`
    );
  } catch (error) {
    dispatch(deletePostError(error));
  }
};

export {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost
};
