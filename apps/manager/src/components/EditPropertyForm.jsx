import { useState, useEffect } from 'react';
import Modal from './Modal';
import FieldSettingsForm from './FieldSettingsForm';
import { fetchFieldTypes, fetchFieldTypeDetails } from '../api/field';

export default function EditPropertyForm({ property, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...property });
  const [fieldOptions, setFieldOptions] = useState([]);
  const [fieldSettings, setFieldSettings] = useState([]); // now expecting array

  useEffect(() => {
    setFormData({ ...property });
  }, [property]);

  useEffect(() => {
    fetchFieldTypes()
      .then(setFieldOptions)
      .catch((err) => {
        console.error('Failed to load field types', err);
        setFieldOptions([{ label: 'Text', value: 'text' }]);
      });
  }, []);

  useEffect(() => {
    if (!formData.type) return;

    fetchFieldTypeDetails(formData.type)
      .then(data => {

        const supported = Array.isArray(data.supportedSettings) ? data.supportedSettings : [];
        setFieldSettings(supported);

        // Patch formData.settings to ensure all supported keys exist
        setFormData(prev => {
          const currentSettings = prev.settings || {};
          const patchedSettings = { ...currentSettings };

          for (const setting of supported) {
            if (!(setting in patchedSettings)) {
              patchedSettings[setting] = '';
            }
          }

          return { ...prev, settings: patchedSettings };
        });
      })
      .catch(err => {
        console.error('Failed to load field settings', err);
        setFieldSettings([]);
      });
  }, [formData.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (updater) => {
    setFormData(prev => {
      const newSettings = typeof updater === 'function'
        ? updater(prev.settings || {})
        : updater;

      return {
        ...prev,
        settings: { ...prev.settings, ...newSettings }
      };
    });
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
              {fieldOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
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

          <FieldSettingsForm
            settings={formData.settings || {}}
            fieldSettings={fieldSettings}
            onChange={handleSettingsChange}
          />

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
