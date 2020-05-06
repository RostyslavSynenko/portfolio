import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';

import ErrorBoundry from './components/ErrorBoundry';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundry>
      <Router>
        <App />
      </Router>
    </ErrorBoundry>
  </React.StrictMode>,
  document.getElementById('root')
);
