import React from 'react';

import OverlayButton from '../OverlayButton';

const CrudButtons = ({ handleEdit, handleDelete }) => {
  return (
    <div className="crud-buttons-container">
      <OverlayButton label="Edit" handleClick={handleEdit}>
        <i className="far fa-edit edit-icon"></i>
      </OverlayButton>
      <OverlayButton
        label="Delete"
        handleClick={handleDelete}
      >
        <i className="fas fa-trash-alt delete-icon"></i>
      </OverlayButton>
    </div>
  );
};

export default CrudButtons;
