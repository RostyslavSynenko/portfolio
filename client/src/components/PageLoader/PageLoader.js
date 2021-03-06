import React from 'react';

import { loaderLetters } from '../../configs';

const PageLoader = () => {
  const waveLetter = loaderLetters.map((letter, i) => (
    <span
      className="wave-letter"
      key={i + letter}
      style={{ animationDelay: `${0.1 * i}s` }}
    >
      {letter}
    </span>
  ));

  return (
    <div className="wave-loader-container">
      <div className="wave-loader">{waveLetter}</div>
    </div>
  );
};

export default PageLoader;
