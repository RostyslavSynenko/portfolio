import React from 'react';

const OverlayButton = ({
  label,
  handleClick,
  variant,
  children
}) => {
  return (
    <div
      className={`overlay-button-container ${
        variant ? `${variant}` : ''
      }`}
      onClick={handleClick}
    >
      <div className="label-container">
        <div className="overlay-button-label">{label}</div>
      </div>
      <button className="overlay-button">{children}</button>
    </div>
  );
};

export default OverlayButton;
