import { useState } from 'react';

function AddPropertyForm({ onSubmit }) {
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ key, name, type });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Key</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>

      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
        </select>
      </div>

      <button type="submit">Add Property</button>
    </form>
  );
}

export default AddPropertyForm;
