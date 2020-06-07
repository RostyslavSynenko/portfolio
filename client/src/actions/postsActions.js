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

const fetchPosts = httpService => () => async dispatch => {
  dispatch(postsRequest());

  try {
    const {
      data: { data }
    } = await httpService.getPosts();

    dispatch(postsLoaded(data));
  } catch (err) {
    const {
      data: { error }
    } = err.response;

    dispatch(postsError(error));
  }
};

const fetchPost = httpService => id => async dispatch => {
  dispatch(postRequest());

  try {
    const {
      data: { data }
    } = await httpService.getPost(id);

    dispatch(postLoaded(data));
  } catch (err) {
    const {
      data: { error }
    } = err.response;

    dispatch(postError(error));
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

    console.log(`New post has been created: ${data.title}`);
  } catch (err) {
    const {
      data: { error }
    } = err.response;

    dispatch(createPostError(error));
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

    console.log(`Post has been updated: ${data.title}`);
  } catch (err) {
    const {
      data: { error }
    } = err.response;

    dispatch(updatePostError(error));
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

    console.log(`Post has been deleted: ${data.title}`);
  } catch (err) {
    const {
      data: { error }
    } = err.response;

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
