import { useState } from 'react';

function AddPropertyForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [type, setType] = useState('text'); // default to 'text'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !key) {
      alert('Name and key are required');
      return;
    }
    onSubmit({ name, key, type });
    setName('');
    setKey('');
    setType('text');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <div>
        <label>Name:</label><br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Key:</label><br />
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div>
        <label>Type:</label><br />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="text">Text</option>
          <option value="select">Select</option>
          <option value="image">Image</option>
        </select>
      </div>
      <button type="submit" style={{ marginTop: '1rem' }}>
        Add Property
      </button>
    </form>
  );
}

export default AddPropertyForm;
