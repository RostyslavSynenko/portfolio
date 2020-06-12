import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../../HOC';
import { login } from '../../../../actions';

const SignInForm = ({ login, error }) => {
  const history = useHistory();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [fields, setFields] = useState({
    email: '',
    password: ''
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const user = await login(fields);
      history.push('/');

      if (user) {
        setTimeout(() => {
          const { from } = location.state || {
            from: { pathname: '/' }
          };

          history.push(from.pathname);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkErrorMessage = () => {
    if (errorMessage !== error.message) {
      if (error.id === 'LOGIN_FAIL') {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(null);
      }
    }
  };

  useEffect(() => {
    if (error.message) {
      checkErrorMessage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error.message]);

  return (
    <div className="form-container sign-in-container">
      <form
        className="sign-in-form"
        onSubmit={handleSubmit}
      >
        <h1 className="form-title">Sign in</h1>
        <div className="fields-container">
          <div className="field-wrapper">
            <input
              type="email"
              name="email"
              id="sign-in-email"
              autoComplete="email"
              required
              value={fields.email}
              onChange={handleChange}
            />
            <label htmlFor="sign-in-email">Email</label>
          </div>
          <div className="field-wrapper">
            <input
              type="password"
              name="password"
              id="sign-in-password"
              autoComplete="current-password"
              required
              value={fields.password}
              onChange={handleChange}
            />
            <label htmlFor="sign-in-password">
              Password
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="button-primary filled sign-in-button"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ error }) => ({
  error
});

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    { login: login(httpService) },
    dispatch
  );

export default withHttpService()(
  connect(mapStateToProps, mapDispatchToProps)(SignInForm)
);
