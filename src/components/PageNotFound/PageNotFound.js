import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './PageNotFound.scss';

const PageNotFound = () => {
  const history = useHistory();

  const handleClickHome = () => {
    history.push('/');
  };

  const handleClickBack = () => {
    history.goBack();
  };

  useEffect(() => {
    document.title = '404 Page Not Found';
  }, []);

  return (
    <div className="container">
      <section className="page-not-found">
        <div className="flex-container">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <div>
            <button
              type="button"
              className="button-primary button-go-home"
              onClick={handleClickHome}
            >
              Go Home
            </button>
            <button
              type="button"
              className="button-primary button-go-back"
              onClick={handleClickBack}
            >
              Go Back
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
