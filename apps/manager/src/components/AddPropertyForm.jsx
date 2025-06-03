import { useEffect, useState } from 'react';
import Modal from './Modal';
import { fetchFieldTypes, fetchFieldTypeDetails } from '../api/field';

function AddPropertyForm({ onSubmit, onCancel }) {
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('text');
  const [append, setAppend] = useState('');
  const [fieldOptions, setFieldOptions] = useState([]);
  const [fieldMeta, setFieldMeta] = useState(null);

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
      .then(setFieldMeta)
      .catch((err) => {
        console.error('Failed to load field type info', err);
        setFieldMeta(null);
      });
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { key, name, type };
    if (fieldMeta?.supports_append) {
      payload.append = append;
    }
    onSubmit(payload);
    setKey('');
    setName('');
    setType('text');
    setAppend('');
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

          {fieldMeta?.supports_append && (
            <div className="f4-new-model-form__field-group">
              <label htmlFor="property-append" className="f4-new-model-form__field-label">
                <strong>Append</strong>
              </label>
              <input
                id="property-append"
                type="text"
                value={append}
                onChange={(e) => setAppend(e.target.value)}
                className="f4-form__field-input"
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
