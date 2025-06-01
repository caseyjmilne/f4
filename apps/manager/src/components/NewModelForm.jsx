import { useState } from 'react';
import Modal from './Modal';

function NewModelForm({ onModelAdded, onCancel }) {
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
        <h4 className="f4-new-model-form__form-title">Add New Model</h4>
        <form onSubmit={handleSubmit} className="f4-new-model-form__form-wrap">
          <p>
            <label htmlFor="model-title"><strong>Title</strong></label><br />
            <input
              id="model-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="widefat"
              required
            />
          </p>

          <p>
            <label htmlFor="model-key"><strong>Key</strong></label><br />
            <input
              id="model-key"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="widefat"
              required
            />
          </p>

          <p>
            <label htmlFor="model-type"><strong>Type</strong></label><br />
            <select
              id="model-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="widefat"
            >
              <option value="post">Post Type</option>
              <option value="scalable">Scalable Type</option>
            </select>
          </p>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={onCancel} className="f4-cancel-button">Cancel</button>
            <button type="submit" className="f4-add-model-button">Add Model</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default NewModelForm;
