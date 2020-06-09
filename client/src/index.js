import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { HttpServiceProvider } from './components/HttpServiceContext';
import ErrorBoundry from './components/ErrorBoundry';
import App from './components/App';

import './index.scss';

import store from './store';
import HttpService from './services/HttpService';

const httpService = new HttpService();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundry>
        <HttpServiceProvider value={httpService}>
          <Router>
            <App />
          </Router>
        </HttpServiceProvider>
      </ErrorBoundry>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
