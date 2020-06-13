import React from 'react';

const ModalLoader = ({ actionType }) => {
  return (
    <div className="modal-loader">
      <div className="loading-dots">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
      <div className="action">{actionType}</div>
    </div>
  );
};

export default ModalLoader;
