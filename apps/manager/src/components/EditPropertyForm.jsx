import { useState, useEffect } from 'react';
import Modal from './Modal';

export default function EditPropertyForm({ property, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...property });

  useEffect(() => {
    setFormData({ ...property });
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={true} onClose={onCancel}>
      <div className="f4-new-model-form">
        <h4 className="f4-new-model-form__form-title">Edit Property</h4>
        <form onSubmit={handleSubmit} className="f4-new-model-form__form-wrap">

          <div className="f4-new-model-form__field-group">
            <label htmlFor="edit-type" className="f4-new-model-form__field-label">
              <strong>Type</strong>
            </label>
            <select
              id="edit-type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="f4-form__field-input"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          <div className="f4-new-model-form__field-group">
            <label htmlFor="edit-name" className="f4-new-model-form__field-label">
              <strong>Name</strong>
            </label>
            <input
              id="edit-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="f4-form__field-input"
              required
            />
          </div>

          <div className="f4-new-model-form__field-group">
            <label htmlFor="edit-key" className="f4-new-model-form__field-label">
              <strong>Key</strong>
            </label>
            <input
              id="edit-key"
              name="key"
              type="text"
              value={formData.key}
              onChange={handleChange}
              className="f4-form__field-input"
              required
            />
          </div>

          <div className="f4-form-actions">
            <button type="button" onClick={onCancel} className="f4-button f4-button--secondary">
              Cancel
            </button>
            <button type="submit" className="f4-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
