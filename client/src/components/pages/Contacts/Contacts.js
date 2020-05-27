import React, { useEffect, useRef } from 'react';

import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ScrollDown from '../../../shared/ScrollDown';

const Contacts = () => {
  const contactsContainer = useRef(null);

  useEffect(() => {
    document.title = 'Contacts';
    window.scrollTo(0, 0);

    const handleContactsScroll = () => {
      const scrollTop = document.documentElement.scrollTop;

      if (scrollTop > 0) {
        contactsContainer.current.style.marginTop =
          -scrollTop / 1.2 + 'px';
      }
    };

    window.addEventListener('scroll', handleContactsScroll);

    return () =>
      window.removeEventListener(
        'scroll',
        handleContactsScroll
      );
  }, []);

  return (
    <section className="contacts-page">
      <div className="photo-container">
        <div className="container">
          <div className="contacts-description">
            <h2 className="contacts-page-title">
              Contacts
            </h2>
            <p className="text-block">
              For any enquiries, or just to say hello, get
              in touch and contact me.
            </p>
          </div>
        </div>
        <ScrollDown />
      </div>
      <div className="contacts-wrapper">
        <div className="container">
          <div
            className="contacts-container"
            ref={contactsContainer}
          >
            <div className="contact-form-wrapper">
              <ContactForm />
            </div>
            <div className="contact-info-wrapper">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
