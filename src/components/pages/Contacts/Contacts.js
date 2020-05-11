import React, { useEffect } from 'react';

import './Contacts.scss';

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
    </section>
  );
};

export default Contacts;
