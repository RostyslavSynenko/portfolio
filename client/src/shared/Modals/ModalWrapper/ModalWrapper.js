import React, { useEffect } from 'react';

const ModalWrapper = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () =>
      document.body.classList.remove('overflow-hidden');
  });

  return (
    <div className="modal-wrapper">
      <div className="modal-container">{children}</div>
    </div>
  );
};

export default ModalWrapper;
