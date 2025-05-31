import { useState } from 'react';

function EditModelForm({ model, onSave, onCancel }) {
  const [key, setKey] = useState(model.model_key);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...model, model_key: key });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-model-form">
      <label>
        Model Key:
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </label>

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default EditModelForm;
