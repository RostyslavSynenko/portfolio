import React from 'react';

const ModalStatus = ({
  successMessage,
  errorMessage,
  handleCancel
}) => {
  const status = errorMessage ? 'Failure!' : 'Success!';
  const message = errorMessage
    ? errorMessage
    : successMessage;
  const classes = errorMessage ? 'error' : 'success';

  return (
    <div className={`modal-status ${classes}`}>
      <div className={`status ${classes}`}>{status}</div>
      <div className="status-message">{message}</div>
      {errorMessage && (
        <button
          type="button"
          className="button-primary cancel-button"
          onClick={handleCancel}
        >
          Close
        </button>
      )}
    </div>
  );
};

export default ModalStatus;
