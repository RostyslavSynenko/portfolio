import axios from 'axios';

export default class PostService {
  _apiUrl = '/api/posts';
  _config = {
    headers: { 'Content-Type': 'application/json' }
  };

  getPosts = async () => {
    const response = await axios.get(this._apiUrl);

    return response;
  };

  getPost = async id => {
    const response = await axios.get(
      `${this._apiUrl}${id}`
    );

    return response;
  };

  createPost = async post => {
    const response = await axios.post(
      this._apiUrl,
      post,
      this._config
    );

    return response;
  };

  updatePost = async (id, data) => {
    const response = await axios.put(
      `${this._apiUrl}${id}`,
      data,
      this._config
    );

    return response;
  };

  deletePost = async id => {
    const response = await axios.delete(
      `${this._apiUrl}${id}`
    );

    return response;
  };
}
