import { useState } from 'react';
import Modal from './Modal';

function AddModelForm({ onModelAdded, onCancel }) {
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [type, setType] = useState('post');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://test1.local/wp-json/custom/v1/model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, model_type: type, model_key: key }),
    });

    if (response.ok) {
      onModelAdded();
      setTitle('');
      setKey('');
      setType('post');
    } else {
      alert('Failed to create model');
    }
  };

  return (
    <Modal isOpen={true} onClose={onCancel}>
      <div className="f4-new-model-form">
        <h4 className="f4-new-model-form__form-title">Add Model</h4>
        <form onSubmit={handleSubmit} className="f4-new-model-form__form-wrap">
          
          <div className="f4-new-model-form__field-group">
            <label htmlFor="model-title" className="f4-new-model-form__field-label">
              <strong>Title</strong>
            </label>
            <input
              id="model-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="f4-form__field-input"
              required
            />
          </div>

          <div className="f4-new-model-form__field-group">
            <label htmlFor="model-key" className="f4-new-model-form__field-label">
              <strong>Key</strong>
            </label>
            <input
              id="model-key"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="f4-form__field-input"
              required
            />
          </div>

          <div className="f4-new-model-form__field-group">
            <label htmlFor="model-type" className="f4-new-model-form__field-label">
              <strong>Type</strong>
            </label>
            <select
              id="model-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="f4-form__field-input"
            >
              <option value="post">Post Type</option>
              <option value="scalable">Scalable Type</option>
            </select>
          </div>

          <div className="f4-form-actions">
            <button type="button" onClick={onCancel} className="f4-button f4-button--secondary">Cancel</button>
            <button type="submit" className="f4-button">Add Model</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddModelForm;
