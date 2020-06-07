import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../HOC';
import { registerUser } from '../../../actions';

const SignUpForm = ({ registerUser, error }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [fields, setFields] = useState({
    name: '',
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
      const newUser = await registerUser(fields);

      if (newUser) {
        setFields({
          name: '',
          email: '',
          password: ''
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkErrorMessage = () => {
    if (errorMessage !== error.message) {
      if (error.id === 'REGISTER_FAIL') {
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
    <div className="form-container sign-up-container">
      <form
        className="sign-up-form"
        onSubmit={handleSubmit}
      >
        <h1 className="form-title">Create Account</h1>
        <div className="field-wrapper">
          <input
            type="text"
            name="name"
            id="sign-up-name"
            autoComplete="username"
            required
            value={fields.name}
            onChange={handleChange}
          />
          <label htmlFor="sign-up-name">Name</label>
        </div>
        <div className="field-wrapper">
          <input
            type="email"
            name="email"
            id="sign-up-email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={handleChange}
          />
          <label htmlFor="sign-up-email">Email</label>
        </div>
        <div className="field-wrapper">
          <input
            type="password"
            name="password"
            id="sign-up-password"
            autoComplete="current-password"
            required
            value={fields.password}
            onChange={handleChange}
          />
          <label htmlFor="sign-up-password">Password</label>
        </div>
        <button
          type="submit"
          className="button-primary filled sign-up-button"
        >
          Sign Up
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
    { registerUser: registerUser(httpService) },
    dispatch
  );

export default withHttpService()(
  connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
);
