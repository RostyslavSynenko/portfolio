import React, { useState } from 'react';

import { INITIAL_VALUES /*, formspreeUrl*/ } from './const';

const ContactForm = () => {
  const [formValues, setFormValues] = useState(
    INITIAL_VALUES
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    status: '',
    message: '',
    data: null
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      /*
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      const data = await response.json();
      */
      setStatus({
        status: 'success',
        message: 'Success! Messege has been sent!'
        // ,data
      });
      setFormValues(INITIAL_VALUES);
    } catch (error) {
      setStatus({
        status: 'error',
        message: 'Ooops! There was an error...',
        data: error
      });
    }

    setIsSubmitting(false);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-wrapper">
        <label htmlFor="name">Name *</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          value={formValues.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="field-wrapper">
        <label htmlFor="email">Email *</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="field-wrapper">
        <label htmlFor="phone">Phone (optional)</label>
        <br />
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formValues.phone}
          onChange={handleChange}
        />
      </div>
      <div className="field-wrapper">
        <label htmlFor="message">Message *</label>
        <br />
        <textarea
          id="message"
          name="message"
          className="message-field"
          value={formValues.message}
          onChange={handleChange}
          required
        />
      </div>
      {status.status === 'error' && (
        <p className="error-status">status.message</p>
      )}
      {status.status === 'success' ? (
        <p className="success-status">Thanks!</p>
      ) : (
        <button
          type="submit"
          className="button-primary"
          disabled={isSubmitting}
        >
          Send
        </button>
      )}
    </form>
  );
};

export default ContactForm;
