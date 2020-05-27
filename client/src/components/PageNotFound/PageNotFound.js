import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
    <div className="page-not-found">
      <div className="full-screen-container">
        <div className="container">
          <section className="page-not-found-section">
            <div className="flex-container">
              <h1>404</h1>
              <h2>Page Not Found</h2>
              <p className="text-block">
                The page requested couldn't be found. This
                could be a spelling error in the URL or a
                removed page.
              </p>
              <div className="buttons-container">
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
      </div>
    </div>
  );
};

export default PageNotFound;
