import { useState } from 'react';

function EditModelForm({ model, onSave, onCancel }) {
  const [key, setKey] = useState(model.key);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...model, model_key: key });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-model-form">

      <div class="edit-model-form-field-group">
        <label>
          Key
        </label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>

      <div className="edit-model-form-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Save</button>
      </div>

    </form>
  );
}

export default EditModelForm;
