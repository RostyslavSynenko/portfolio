import React, { useEffect } from 'react';

import './Contacts.scss';

const Contacts = () => {
  useEffect(() => {
    document.title = 'Contacts';
  }, []);

  return <section>Contacts</section>;
};

export default Contacts;
