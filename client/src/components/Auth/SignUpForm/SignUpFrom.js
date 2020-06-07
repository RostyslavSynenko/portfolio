import React, { useState } from 'react';

const SignUpForm = () => {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div className="form-container sign-up-container">
      <form className="sign-up-form">
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

export default SignUpForm;
