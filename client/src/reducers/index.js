import { combineReducers } from 'redux';

import postReducer from './postReducer';
import projectReducer from './projectReducer';

export default combineReducers({
  posts: postReducer,
  projects: projectReducer
});
