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
    <Modal isOpen={true} onClose={onCancel} title="Add Model">
      <div className="f4-form">

        <form onSubmit={handleSubmit} className="f4-form__wrap">

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

          <FormFooter onCancel={onCancel} submitLabel="Add Model" />

        </form>
      </div>
    </Modal>
  );
}

export default AddModelForm;