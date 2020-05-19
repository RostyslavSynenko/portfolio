import React, { useEffect } from 'react';

import { skills, cvUrl } from './const';

const About = () => {
  const skillsList = skills.map(({ title, url }) => {
    return (
      <li key={title}>
        <img src={url} alt={title} />
        {title}
      </li>
    );
  });

  useEffect(() => {
    document.title = 'About';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <section className="about-section">
        <h2 className="title">About me</h2>
        <div className="about-me-container">
          <p>
            I graduated from Drogobych Ivan Franko
            University in 2014.
          </p>
          <p>
            I’ve always been really interested in tech and
            figured, why not make it my job. IT jobs will
            always be in demand because technological
            innovation never stops and there will always be
            a lot of interesting work.
          </p>
          <p>
            I am a self-motivated person and very good at
            working with other people. I'm learning
            programming at leisure, simply out of a passion
            to learn how to code. I like to learn something
            new.
          </p>
          <p>
            My dream job is to have a workplace that is
            welcoming and friendly. It's a place where I’ll
            have opportunities to develop my skills, take on
            interesting projects, and work with people I can
            really learn from.
          </p>
        </div>
      </section>
      <section className="hobbies-section">
        <h2 className="title">Hobbies</h2>
        <div className="hobbies-container">
          <p>
            My hobby is a workout. I like it because when I
            finish my workout I am always with a lot of
            positiveness, clear mind and a smile on my face.
            It's something bigger than a hobby, it's my
            lifestyle. I like to ride on a bicycle and
            swimming as well.
          </p>
          <p>
            Also, I like listen to the music, watch
            interesting movies and spend my free time with
            my friends. And, honestly, I like memes and
            video games, as well.
          </p>
        </div>
      </section>
      <section className="skills-section">
        <h2 className="title">Skills</h2>
        <div className="skills-container">
          <ul className="skills-list">{skillsList}</ul>
        </div>
      </section>
      <a
        href={cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="button-primary cv-link"
      >
        Check CV
      </a>
    </div>
  );
};

export default About;
