import { useState } from 'react';
import Modal from './ux/modal/Modal';
import FormField from './form/FormField';
import FormSelect from './form/FormSelect';
import FormFooter from './form/FormFooter';
import { submitNewModel } from '../utils/modelHandlers';

const MODEL_TYPE_OPTIONS = [
  { value: 'post', label: 'Post Type' },
  { value: 'scalable', label: 'Scalable Type' },
];

function AddModelForm({ onModelAdded, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    key: '',
    type: 'post',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitNewModel(form, onModelAdded);
      setForm({ title: '', key: '', type: 'post' });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Modal isOpen={true} onClose={onCancel}>
      <div className="f4-new-model-form">
        <h4 className="f4-new-model-form__form-title">Add Model</h4>

        <form onSubmit={handleSubmit} className="f4-new-model-form__form-wrap">

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

          <FormSelect
            label="Type"
            id="model-type"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={MODEL_TYPE_OPTIONS}
          />

          <FormFooter onCancel={onCancel} submitLabel="Add Model" />

        </form>
      </div>
    </Modal>
  );
}

export default AddModelForm;