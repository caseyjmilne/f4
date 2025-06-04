import { useEffect, useState } from 'react';
import Modal from './Modal';
import { fetchFieldTypes, fetchFieldTypeDetails } from '../api/field';

function AddPropertyForm({ onSubmit, onCancel }) {
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('text');
  const [fieldOptions, setFieldOptions] = useState([]);
  const [fieldSettings, setFieldSettings] = useState({});
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchFieldTypes()
      .then(setFieldOptions)
      .catch((err) => {
        console.error('Failed to load field types', err);
        setFieldOptions([{ label: 'Text', value: 'text' }]); // fallback
      });
  }, []);

  useEffect(() => {
    if (!type) return;

    fetchFieldTypeDetails(type)
      .then(data => {
        setFieldSettings(data.supports || {});
      })
      .catch(err => {
        console.error('Failed to load field settings', err);
        setFieldSettings({});
      });
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ key, name, type, settings });
    setKey('');
    setName('');
    setType('text');
    setSettings({});
  };

  const handleSettingChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
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
                <option key={value} value={value}>
                  {label}
                </option>
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

          {/* Optional settings */}
          {fieldSettings.prepend && (
            <div className="f4-new-model-form__field-group">
              <label htmlFor="setting-prepend" className="f4-new-model-form__field-label">
                <strong>Prepend</strong>
              </label>
              <input
                id="setting-prepend"
                type="text"
                className="f4-form__field-input"
                value={settings.prepend || ''}
                onChange={e => handleSettingChange('prepend', e.target.value)}
              />
            </div>
          )}

          {fieldSettings.append && (
            <div className="f4-new-model-form__field-group">
              <label htmlFor="setting-append" className="f4-new-model-form__field-label">
                <strong>Append</strong>
              </label>
              <input
                id="setting-append"
                type="text"
                className="f4-form__field-input"
                value={settings.append || ''}
                onChange={e => handleSettingChange('append', e.target.value)}
              />
            </div>
          )}

          {fieldSettings.placeholder && (
            <div className="f4-new-model-form__field-group">
              <label htmlFor="setting-placeholder" className="f4-new-model-form__field-label">
                <strong>Placeholder</strong>
              </label>
              <input
                id="setting-placeholder"
                type="text"
                className="f4-form__field-input"
                value={settings.placeholder || ''}
                onChange={e => handleSettingChange('placeholder', e.target.value)}
              />
            </div>
          )}

          {fieldSettings.rows && (
            <div className="f4-new-model-form__field-group">
              <label htmlFor="setting-rows" className="f4-new-model-form__field-label">
                <strong>Rows</strong>
              </label>
              <input
                id="setting-rows"
                type="number"
                min="1"
                className="f4-form__field-input"
                value={settings.rows || ''}
                onChange={e => handleSettingChange('rows', e.target.value)}
              />
            </div>
          )}

          {fieldSettings.maxLength && (
            <div className="f4-new-model-form__field-group">
              <label htmlFor="setting-maxLength" className="f4-new-model-form__field-label">
                <strong>Max Length</strong>
              </label>
              <input
                id="setting-maxLength"
                type="number"
                min="1"
                className="f4-form__field-input"
                value={settings.maxLength || ''}
                onChange={e => handleSettingChange('maxLength', e.target.value)}
              />
            </div>
          )}


          <div className="f4-form-actions">
            <button type="button" onClick={onCancel} className="f4-button f4-button--secondary">Cancel</button>
            <button type="submit" className="f4-button">Add Property</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddPropertyForm;
