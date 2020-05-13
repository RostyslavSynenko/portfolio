import React, { useEffect } from 'react';

import './Contacts.scss';

import ContactForm from './ContactForm';
// import ContactLinks from './ContactLinks';

const Contacts = () => {
  useEffect(() => {
    document.title = 'Contacts';
  }, []);

  return (
    <section className="contacts-page">
      <h2>Contacts</h2>
      <p>
        For any enquiries, or just to say hello, get in
        touch and contact me.
      </p>
      {/* <ContactLinks /> */}
      <div className="flex-container">
        <ContactForm />
      </div>
    </section>
  );
};

export default Contacts;
