import axios from 'axios';

export default class PostService {
  _apiPost = '/api/posts';
  _apiImage = '/api/images';
  _configPost = {
    headers: { 'Content-Type': 'application/json' }
  };
  _configImage = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };

  getPosts = async () => {
    const response = await axios.get(this._apiPost);

    return response;
  };

  getPost = async id => {
    const response = await axios.get(
      `${this._apiPost}/${id}`
    );

    return response;
  };

  createPost = async post => {
    const response = await axios.post(
      this._apiPost,
      post,
      this._configPost
    );

    return response;
  };

  updatePost = async (id, data) => {
    const response = await axios.put(
      `${this._apiPost}/${id}`,
      data,
      this._configPost
    );

    return response;
  };

  deletePost = async id => {
    const response = await axios.delete(
      `${this._apiPost}/${id}`
    );

    return response;
  };

  getImage = async name => {
    const response = await axios.get(
      `${this._apiImages}/${name}`
    );

    return response;
  };

  createImage = async post => {
    const response = await axios.post(
      this._apiImages,
      post,
      this._configImage
    );

    return response;
  };

  deleteImage = async name => {
    const response = await axios.delete(
      `${this._apiImages}/${name}`
    );

    return response;
  };
}
