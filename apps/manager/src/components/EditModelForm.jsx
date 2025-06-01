import { useState } from 'react';

function EditModelForm({ model, onSave, onCancel }) {
  const [key, setKey] = useState(model.key);
  const [title, setTitle] = useState(model.title);
  const [type, setType] = useState(model.type || 'post_type');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...model,
      model_key: key,
      model_title: title,
      model_type: type,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-model-form">

      <div className="edit-model-form-field-group">
        <label>Key</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>

      <div className="edit-model-form-field-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="edit-model-form-field-group">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="post_type">Post Type</option>
          <option value="scalable_type">Scalable Type</option>
        </select>
      </div>

      <div className="edit-model-form-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Save</button>
      </div>

    </form>
  );
}

export default EditModelForm;
