import React, { useState } from 'react';

const SignInForm = () => {
  const [fields, setFields] = useState({
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
    <div className="form-container sign-in-container">
      <form
        className="sign-in-form"
        onSubmit={handleSubmit}
      >
        <h1 className="form-title">Sign in</h1>
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
          <label htmlFor="sign-in-password">Password</label>
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

export default SignInForm;
