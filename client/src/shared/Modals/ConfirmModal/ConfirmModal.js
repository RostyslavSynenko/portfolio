import React, { useState } from 'react';

import ModalWrapper from '../ModalWrapper';
import ModalLoader from '../ModalLoader';
import ModalStatus from '../ModalStatus';

const ConfirmModal = ({
  handleOk,
  handleCancel,
  actionType,
  text,
  successMessage,
  error,
  loading,
  label
}) => {
  const [done, setDone] = useState(false);

  const handleConfirm = async () => {
    const item = await handleOk();

    setDone(true);

    if (item) {
      setTimeout(() => {
        handleCancel();
      }, 1000);
    }
  };

  if (loading) {
    return (
      <ModalWrapper>
        <ModalLoader actionType={actionType} />
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper>
      <div className="confirm-modal">
        {done ? (
          <ModalStatus
            successMessage={successMessage}
            errorMessage={error.message}
            handleCancel={handleCancel}
          />
        ) : (
          <>
            <div className="action-type">{actionType}</div>
            <div className="confirm-message">{text}</div>
            <div className="buttons-container">
              <button
                type="button"
                className="button-primary filled"
                onClick={handleConfirm}
              >
                {label ? label : 'Confirm'}
              </button>
              <button
                type="button"
                className="button-primary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </ModalWrapper>
  );
};

export default ConfirmModal;
