import React from 'react';

import SocialMediaLinks from '../../../../shared/SocialMediaLinks';

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <h2 className="contact-info-title">
        Contact Information
      </h2>
      <div className="info">
        <ul className="info-list">
          <li className="info-item">
            <i className="fas fa-map-marked-alt icon"></i>
            <span className="info-item-text">
              Lviv, Lviv Oblast, Ukraine
              <br /> 7900
            </span>
          </li>
          <li className="info-item">
            <i className="fas fa-mobile-alt icon"></i>
            <span className="info-item-text">
              +38(096)7146518
            </span>
          </li>
          <li className="info-item">
            <i className="fas fa-at icon"></i>
            <span className="info-item-text">
              rostyslav.synenko@gmail.com
            </span>
          </li>
        </ul>
      </div>
      <div className="links">
        <SocialMediaLinks isTitle={false} />
      </div>
    </div>
  );
};

export default ContactInfo;
