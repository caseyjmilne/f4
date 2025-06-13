import React from 'react';
import SecondaryButton from '../ux/button/SecondaryButton/SecondaryButton';

function FormFooter({ onCancel, submitLabel = 'Submit' }) {
  return (
    <div className="f4-form-actions">
      <SecondaryButton type="button" onClick={onCancel}>
        Cancel
      </SecondaryButton>
      <button type="submit" className="f4-button">
        {submitLabel}
      </button>
    </div>
  );
}

export default FormFooter;
