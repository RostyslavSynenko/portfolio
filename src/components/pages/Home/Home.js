import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import avatarImage from '../../../assets/avatar-photo.jpg';

const Home = () => {
  const history = useHistory();
  const logo = useRef(null);

  const handleClick = () => {
    history.push('/about');
  };

  useEffect(() => {
    document.title = 'Rostyslav Synenko Portfolio';
    window.scrollTo(0, 0);

    const horizontalParalax = () => {
      const { scrollTop } = document.documentElement;

      logo.current.style.transform = `translate(0, ${
        scrollTop / 2.2
      }px`;
    };

    window.addEventListener('scroll', horizontalParalax);

    return () =>
      window.removeEventListener(
        'scroll',
        horizontalParalax
      );
  }, []);

  return (
    <div className="home-page">
      <div className="start-page">
        <div className="container">
          <div className="start-logo-container" ref={logo}>
            <h1 className="quote">
              Everything you can imagine is real.
            </h1>
            <br />
            <span className="author">– Pablo Picasso</span>
          </div>
        </div>
      </div>
      <div className="gradient-container">
        <div className="container">
          <div className="hero-container">
            <div className="hero">
              <p className="text-block">
                Hello
                <br />
                <span className="name">
                  I'm Rostyslav Synenko
                </span>
                <br />
                Front-End Developer
              </p>
              <p className="briefly-about">
                I'm on vacation every single day 'cause I
                love my occupation.
              </p>
              <button
                type="button"
                className="button-primary"
                onClick={handleClick}
              >
                About
              </button>
            </div>
            <div className="photo-container">
              <div>
                <img
                  className="photo"
                  src={avatarImage}
                  alt="Rostyslav Synenko"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
