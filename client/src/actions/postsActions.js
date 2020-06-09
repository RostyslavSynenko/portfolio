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
  CLEARE_POST,
  CLEAR_POST
} from './actionTypes';
import { returnErrors } from './errorActions';

const postsRequest = () => ({
  type: FETCH_POSTS_REQUEST
});

const postsLoaded = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts
});

const postsError = () => ({
  type: FETCH_POSTS_ERROR
});

const postRequest = id => ({
  type: FETCH_POST_REQUEST,
  payload: id
});

const postLoaded = post => ({
  type: FETCH_POST_SUCCESS,
  payload: post
});

const postError = () => ({
  type: FETCH_POST_ERROR
});

const createPostRequest = () => ({
  type: CREATE_POST_REQUEST
});

const postCreated = newPost => ({
  type: CREATE_POST_SUCCESS,
  payload: newPost
});

const createPostError = () => ({
  type: CREATE_POST_ERROR
});

const updatePostRequest = () => ({
  type: UPDATE_POST_REQUEST
});

const postUpdated = (id, data) => ({
  type: UPDATE_POST_SUCCESS,
  payload: { id, data }
});

const updatePostError = () => ({
  type: UPDATE_POST_ERROR
});

const deletePostRequest = () => ({
  type: DELETE_POST_REQUEST
});

const postDeleted = id => ({
  type: DELETE_POST_SUCCESS,
  payload: id
});

const deletePostError = () => ({
  type: DELETE_POST_ERROR
});

const clearPost = () => ({
  type: CLEAR_POST
});

const fetchPosts = httpService => () => async dispatch => {
  dispatch(postsRequest());

  try {
    const {
      data: { data }
    } = await httpService.getPosts();

    dispatch(postsLoaded(data));
  } catch (error) {
    dispatch(postsError());
    dispatch(returnErrors(error));
  }
};

const fetchPost = httpService => id => async dispatch => {
  dispatch(postRequest());

  try {
    const {
      data: { data }
    } = await httpService.getPost(id);

    dispatch(postLoaded(data));
  } catch (error) {
    dispatch(postError());
    dispatch(returnErrors(error));
  }
};

const createPost = httpService => post => async dispatch => {
  dispatch(createPostRequest());

  try {
    const {
      data: { image }
    } = await httpService.createImage(post.image);

    const {
      data: { data }
    } = await httpService.createPost({
      ...post,
      image: {
        id: image.id,
        filename: image.filename,
        originalname: image.originalname,
        size: image.size
      }
    });

    dispatch(postCreated(data));

    return data;
  } catch (error) {
    dispatch(createPostError());
    dispatch(returnErrors(error, CREATE_POST_ERROR));
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

const updatePost = httpService => (
  id,
  updatedPost,
  oldImage
) => async dispatch => {
  dispatch(updatePostRequest());

  try {
    let newImage;

    if (oldImage) {
      newImage = await updateImage(
        httpService,
        updatedPost.image,
        oldImage.id
      );
    }

    const {
      data: { data }
    } = await httpService.updatePost(id, {
      ...updatedPost,
      image: newImage || updatedPost.image
    });

    dispatch(postUpdated(data._id, data));

    return data;
  } catch (error) {
    dispatch(updatePostError());
    dispatch(returnErrors(error, UPDATE_POST_ERROR));
  }
};

const deletePost = httpService => id => async dispatch => {
  dispatch(deletePostRequest());

  try {
    const {
      data: { data }
    } = await httpService.deletePost(id);

    await httpService.deleteImage(data.image.id);

    dispatch(postDeleted(data._id));

    return data;
  } catch (error) {
    dispatch(deletePostError());
    dispatch(returnErrors(error, DELETE_POST_ERROR));
  }
};

export {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
  clearPost
};
