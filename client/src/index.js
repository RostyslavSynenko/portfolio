import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { PostServiceProvider } from './components/PostServiceContext';
import ErrorBoundry from './components/ErrorBoundry';
import App from './components/App';

import './index.scss';

import store from './store';
import PostService from './services/PostService';

const postService = new PostService();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundry>
        <PostServiceProvider value={postService}>
          <Router basename="/portfolio/">
            <App />
          </Router>
        </PostServiceProvider>
      </ErrorBoundry>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
