import SecondaryButton from '../ux/button/SecondaryButton/SecondaryButton';
import PrimaryButton from '../ux/button/PrimaryButton/PrimaryButton';

function FormFooter({ onCancel, submitLabel = 'Submit', onSubmit }) {
  return (
    <div className="f4-form-actions">
      <SecondaryButton type="button" onClick={onCancel}>
        Cancel
      </SecondaryButton>
      <PrimaryButton type="button" onClick={onSubmit}>
        {submitLabel}
      </PrimaryButton>
    </div>
  );
}

export default FormFooter;
