import React from 'react';
import { useHistory } from 'react-router-dom';

import './Home.scss';

import avatarImage from '../../../assets/avatar-photo.jpg';

const Home = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/about');
  };

  return (
    <section className="home">
      <div className="start-logo">
        <div>
          <h1 className="quote">
            Everything you can imagine is real.
          </h1>
          <br />
          <span className="author">– Pablo Picasso</span>
        </div>
      </div>
      <div className="intro-container">
        <div className="intro">
          <p>
            Hello
            <br />
            <span className="name">
              I'm Rostyslav Synenko
            </span>
            <br />
            Front-End Developer
          </p>
          <p className="briefly-about">
            I'm on vacation every single day 'cause I love
            my occupation.
          </p>
          <button type="button" onClick={handleClick}>
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
    </section>
  );
};

export default Home;
