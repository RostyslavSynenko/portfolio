import axios from 'axios';

export default class HttpService {
  _apiAuth = '/api/auth';
  _apiUser = '/api/users';
  _apiPost = '/api/posts';
  _apiProject = '/api/projects';
  _apiImage = '/api/images';
  _configJSON = {
    headers: { 'Content-Type': 'application/json' }
  };
  _configImage = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };

  _tokenConfig = () => {
    const config = { ...this._configJSON };
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['x-auth-token'] = token;
    }

    return config;
  };

  getUser = async () => {
    const config = this._tokenConfig();

    const response = await axios.get(
      `${this._apiAuth}/user`,
      config
    );

    return response;
  };

  registerUser = async user => {
    const response = await axios.post(
      this._apiUser,
      user,
      this._configJSON
    );

    return response;
  };

  login = async user => {
    const response = await axios.post(
      this._apiAuth,
      user,
      this._configJSON
    );

    return response;
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
    const config = this._tokenConfig();

    const response = await axios.post(
      this._apiPost,
      post,
      config
    );

    return response;
  };

  updatePost = async (id, data) => {
    const config = this._tokenConfig();

    const response = await axios.put(
      `${this._apiPost}/${id}`,
      data,
      config
    );

    return response;
  };

  deletePost = async id => {
    const config = this._tokenConfig();

    const response = await axios.delete(
      `${this._apiPost}/${id}`,
      config
    );

    return response;
  };

  getProjects = async () => {
    const response = await axios.get(this._apiProject);

    return response;
  };

  getProject = async id => {
    const response = await axios.get(
      `${this._apiProject}/${id}`
    );

    return response;
  };

  createProject = async post => {
    const config = this._tokenConfig();

    const response = await axios.post(
      this._apiProject,
      post,
      config
    );

    return response;
  };

  updateProject = async (id, data) => {
    const config = this._tokenConfig();

    const response = await axios.put(
      `${this._apiProject}/${id}`,
      data,
      config
    );

    return response;
  };

  deleteProject = async id => {
    const config = this._tokenConfig();

    const response = await axios.delete(
      `${this._apiProject}/${id}`,
      config
    );

    return response;
  };

  getImage = async name => {
    const response = await axios.get(
      `${this._apiImage}/${name}`
    );

    return response;
  };

  createImage = async post => {
    const config = this._tokenConfig();

    const response = await axios.post(
      `${this._apiImage}/files`,
      post,
      config
    );

    return response;
  };

  deleteImage = async id => {
    const config = this._tokenConfig();

    const response = await axios.delete(
      `${this._apiImage}/files/${id}`,
      config
    );

    return response;
  };
}
