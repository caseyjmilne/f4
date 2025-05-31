import { useState, useEffect } from 'react';

export default function EditPropertyForm({ property, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...property });

  useEffect(() => {
    setFormData({ ...property });
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div>
      <h3>Edit Property</h3>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="key" value={formData.key} onChange={handleChange} />
      <input name="value" value={formData.value} onChange={handleChange} />
      {/* Add condition editing logic here */}

      <button onClick={handleSubmit}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
