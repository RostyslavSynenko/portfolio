import { combineReducers } from 'redux';

import authReducer from './authReducer';
import postReducer from './postReducer';
import projectReducer from './projectReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  posts: postReducer,
  projects: projectReducer,
  error: errorReducer
});
