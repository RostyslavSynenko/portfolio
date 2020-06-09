import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import FlyInWelcome from '../../../shared/FlyInWelcome';
import avatarImage from '../../../assets/images/avatar-photo.jpg';

const Home = () => {
  const startSection = useRef(null);

  useEffect(() => {
    document.title = 'Rostyslav Synenko Portfolio';
    window.scrollTo(0, 0);

    const horizontalParalax = () => {
      const { scrollTop } = document.documentElement;

      startSection.current.style.transform = `translate(0, ${
        scrollTop / 2.2
      }px)`;
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
          <div
            className="start-section-container"
            ref={startSection}
          >
            <FlyInWelcome />
          </div>
        </div>
      </div>
      <div className="full-screen-container">
        <div className="container">
          <div className="hero-container">
            <div className="hero">
              <p className="text-block">
                Hello
                <br />
                <span className="hero-name">
                  I'm Rostyslav Synenko
                </span>
                <br />
                Front-End Developer
              </p>
              <p className="hero-about">
                I'm on vacation every single day 'cause I
                love my occupation.
              </p>
              <Link to="/about" className="button-primary">
                About
              </Link>
            </div>
            <div className="hero-photo-container">
              <div>
                <img
                  className="hero-photo"
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
