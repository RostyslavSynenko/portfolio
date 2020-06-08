import {
  loadUser,
  registerUser,
  logout,
  login
} from './authActions';
import {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost
} from './postsActions';
import {
  fetchProjects,
  fetchProject,
  createProject,
  updateProject,
  deleteProject
} from './projectActions';
import { returnErrors, clearErrors } from './errorActions';

export {
  loadUser,
  registerUser,
  logout,
  login,
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
  fetchProjects,
  fetchProject,
  createProject,
  updateProject,
  deleteProject,
  returnErrors,
  clearErrors
};
