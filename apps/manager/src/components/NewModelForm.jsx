import { useState } from 'react';

function NewModelForm({ onModelAdded }) {
  const [name, setTitle] = useState('');
  const [modelKey, setModelKey] = useState('');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  const handleAddModel = () => {
    if (!name.trim() || !modelKey.trim()) {
      setError('Both name and model key are required.');
      return;
    }

    setError(null);
    setAdding(true);

    fetch('http://test1.local/wp-json/custom/v1/model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, model_key: modelKey }),
    })
      .then(res => res.json())
      .then(data => {
        setTitle('');
        setModelKey('');
        onModelAdded(); // Tell parent to reload models
      })
      .catch(err => {
        console.error('Error adding model:', err);
        setError('Something went wrong.');
      })
      .finally(() => setAdding(false));
  };

  return (
    <div className="f4-new-model-form">
      <h3 className="f4-new-model-form__form-title">Add Model</h3>
      <div className="f4-new-model-form__form-wrap">
        <input
          type="text"
          placeholder="Model Title"
          value={name}
          onChange={e => setTitle(e.target.value)}
          style={{ marginRight: '0.5em' }}
        />
        <input
          type="text"
          placeholder="Model Key"
          value={modelKey}
          onChange={e => setModelKey(e.target.value)}
          style={{ marginRight: '0.5em' }}
        />
        <button onClick={handleAddModel} disabled={adding}>
          {adding ? 'Adding...' : 'Add Model'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default NewModelForm;
