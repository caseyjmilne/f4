import { useState, useEffect, useRef } from 'react';
import Modal from '../ux/modal/Modal';
import FormField from '../form/FormField';
import FormSelect from '../form/FormSelect';
import FormFooter from '../form/FormFooter';
import { modelSchema } from "./modelSchema";

const MODEL_TYPE_OPTIONS = [
  { value: 'post', label: 'Post Type' },
  { value: 'scalable', label: 'Scalable Type' },
];

// Set fallback default form structure
const DEFAULT_FORM_DATA = {
  id: 0,
  type: 'post',
  title: '',
  key: '',
};

function ModelForm({
  model = null,
  isOpen = true,
  onSubmit,
  onCancel,
  submitLabel = "Save Model",
  title = "Model"
}) {
  
  const [formData, setFormData] = useState({});
  const formRef = useRef();
  const [errors, setErrors] = useState({});

  console.log("formData")
  console.log(formData)


  // Sync form state when the model changes
  useEffect(() => {
    setFormData(model || DEFAULT_FORM_DATA);
  }, [model]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('formData')
    console.log(formData)

    const result = modelSchema.safeParse(formData);

    console.log('validation result')
    console.log(result)


    if (!result.success) {
      // Convert Zod errors to a simple object
      const fieldErrors = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(formData);
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
          noValidate
        >
          <FormSelect
            label="Type"
            id="model-type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={MODEL_TYPE_OPTIONS}
          />
          {errors.type && <div className="error">{errors.type}</div>}
          <FormField
            label="Title"
            id="model-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div className="error">{errors.title}</div>}
          <FormField
            label="Key"
            id="model-key"
            name="key"
            value={formData.key}
            onChange={handleChange}
          />
          {errors.key && <div className="error">{errors.key}</div>}
        </form>
      </div>
    </Modal>
  );
}

export default ModelForm;
