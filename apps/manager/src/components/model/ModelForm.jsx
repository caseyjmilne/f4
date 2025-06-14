import { useState, useEffect, useRef } from 'react';
import Modal from '../ux/modal/Modal';
import FormField from '../form/FormField';
import FormSelect from '../form/FormSelect';
import FormFooter from '../form/FormFooter';

const MODEL_TYPE_OPTIONS = [
  { value: 'post', label: 'Post Type' },
  { value: 'scalable', label: 'Scalable Type' },
];

// Set fallback default form structure
const DEFAULT_FORM = {
  title: '',
  key: '',
  type: 'post',
};

function ModelForm({
  model = null,
  isOpen = true,
  onSubmit,
  onCancel,
  submitLabel = "Save Model",
  title = "Model"
}) {
  const [form, setForm] = useState(model || DEFAULT_FORM);
  const formRef = useRef();

  // Sync form state when the model changes
  useEffect(() => {
    setForm(model || DEFAULT_FORM);
  }, [model]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      footer={
        <FormFooter
          onCancel={onCancel}
          submitLabel={submitLabel}
          onSubmit={() => formRef.current && formRef.current.requestSubmit()}
        />
      }
    >
      <div className="f4-form">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="f4-form__wrap"
        >
          <FormSelect
            label="Type"
            id="model-type"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={MODEL_TYPE_OPTIONS}
          />
          <FormField
            label="Title"
            id="model-title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <FormField
            label="Key"
            id="model-key"
            name="key"
            value={form.key}
            onChange={handleChange}
          />
        </form>
      </div>
    </Modal>
  );
}

export default ModelForm;
