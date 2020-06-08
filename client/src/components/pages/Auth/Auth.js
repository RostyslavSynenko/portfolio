import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../HOC';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { clearErrors } from '../../../actions';

const Auth = ({ clearErrors, error }) => {
  const [rightPanel, setRightPanel] = useState(false);

  const handleRightPanelActive = () => {
    if (!rightPanel) {
      setRightPanel(true);

      if (error.message) {
        clearErrors();
      }
    }
  };

  const handleRightPanelPassive = () => {
    if (rightPanel) {
      setRightPanel(false);

      if (error.message) {
        clearErrors();
      }
    }
  };

  useEffect(() => {
    document.title = 'Auth';

    return () => clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="full-screen-container">
      <div className="container">
        <div className="auth-page">
          <div
            className={`auth-container ${
              rightPanel ? 'right-panel-active' : ''
            }`}
          >
            <SignUpForm />
            <SignInForm />
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1 className="title">Welcome Back!</h1>
                  <p className="text-block">
                    To keep connected with me please login
                    with your personal info
                  </p>
                  <button
                    className="button-primary sign-toggle"
                    onClick={handleRightPanelPassive}
                  >
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1 className="title">Hello, Friend!</h1>
                  <p className="text-block">
                    Enter your personal details and start
                    journey with me
                  </p>
                  <button
                    className="button-primary sign-toggle"
                    onClick={handleRightPanelActive}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ error }) => ({
  error
});

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators({ clearErrors }, dispatch);

export default withHttpService()(
  connect(mapStateToProps, mapDispatchToProps)(Auth)
);
