import React from 'react';

function FormFooter({ onCancel, submitLabel = 'Submit' }) {
  return (
    <div className="f4-form-actions">
      <button
        type="button"
        onClick={onCancel}
        className="f4-button f4-button--secondary"
      >
        Cancel
      </button>
      <button type="submit" className="f4-button">
        {submitLabel}
      </button>
    </div>
  );
}

export default FormFooter;
