import { useEffect, useState } from 'react';
import Modal from './Modal';
import FieldSettingsForm from './FieldSettingsForm';
import { fetchFieldTypes, fetchFieldTypeDetails } from '../api/field';

function AddPropertyForm({ parentId = 0, onSubmit, onCancel }) {
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('text');
  const [fieldOptions, setFieldOptions] = useState([]);
  const [fieldSettings, setFieldSettings] = useState([]); // now an array
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchFieldTypes()
      .then(setFieldOptions)
      .catch((err) => {
        console.error('Failed to load field types', err);
        setFieldOptions([{ label: 'Text', value: 'text' }]);
      });
  }, []);

  useEffect(() => {
    if (!type) return;

    fetchFieldTypeDetails(type)
      .then(data => {
        console.log('Field type details:', data);

        const supported = Array.isArray(data.supportedSettings) ? data.supportedSettings : [];

        setFieldSettings(supported);

        const newSettings = {};
        for (const setting of supported) {
          newSettings[setting] = '';
        }

        setSettings(newSettings);
      })
      .catch(err => {
        console.error('Failed to load field settings', err);
        setFieldSettings([]);
        setSettings({});
      });
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ key, name, type, settings, parent_id: parentId });
    setKey('');
    setName('');
    setType('text');
    setSettings({});
  };

  return (
    <Modal isOpen={true} onClose={onCancel}>
      <div className="f4-new-model-form">
        <h4 className="f4-new-model-form__form-title">Add Property</h4>
        <form onSubmit={handleSubmit} className="f4-new-model-form__form-wrap">
          
          <div className="f4-new-model-form__field-group">
            <label htmlFor="property-type" className="f4-new-model-form__field-label">
              <strong>Type</strong>
            </label>
            <select
              id="property-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="f4-form__field-input"
            >
              {fieldOptions.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="f4-new-model-form__field-group">
            <label htmlFor="property-key" className="f4-new-model-form__field-label">
              <strong>Key</strong>
            </label>
            <input
              id="property-key"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="f4-form__field-input"
              required
            />
          </div>

          <div className="f4-new-model-form__field-group">
            <label htmlFor="property-name" className="f4-new-model-form__field-label">
              <strong>Name</strong>
            </label>
            <input
              id="property-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="f4-form__field-input"
              required
            />
          </div>

          <FieldSettingsForm
            settings={settings}
            fieldSettings={fieldSettings}
            onChange={setSettings}
          />

          <div className="f4-form-actions">
            <button type="button" onClick={onCancel} className="f4-button f4-button--secondary">
              Cancel
            </button>
            <button type="submit" className="f4-button">
              Add Property
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddPropertyForm;
