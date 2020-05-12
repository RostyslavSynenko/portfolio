import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.scss';

import ErrorBoundry from './components/ErrorBoundry';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundry>
      <Router basename="/portfolio/">
        <App />
      </Router>
    </ErrorBoundry>
  </React.StrictMode>,
  document.getElementById('root')
);
