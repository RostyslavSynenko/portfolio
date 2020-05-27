import React, { useEffect, useRef } from 'react';

const FlyInWelcome = ({ text = 'Welcome' }) => {
  const flyInText = useRef(null);

  const flyLetters = text.split('').map((letter, i) => (
    <span className="fly-letter" key={letter + i}>
      {letter}
    </span>
  ));

  useEffect(() => {
    flyInText.current.classList.remove('hidden');
  }, []);

  return (
    <div className="fly-in-text hidden" ref={flyInText}>
      {flyLetters}
    </div>
  );
};

export default FlyInWelcome;
