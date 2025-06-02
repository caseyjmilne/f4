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
    <div className="f4-new-model-form">
      <h4 className="f4-new-model-form__form-title">Edit Model</h4>
      <form onSubmit={handleSubmit} className="f4-new-model-form__form-wrap">

        <div className="f4-new-model-form__field-group">
          <label className="f4-new-model-form__field-label">Key</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="f4-form__field-input"
          />
        </div>

        <div className="f4-new-model-form__field-group">
          <label className="f4-new-model-form__field-label">Title</label>
          <input
            type="text"
            value={title}
            className="f4-form__field-input"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="f4-new-model-form__field-group">
          <label className="f4-new-model-form__field-label">Type</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            className="f4-form__field-input"
          >
            <option value="post">Post Type</option>
            <option value="scalable">Scalable Type</option>
          </select>
        </div>

        <div className="edit-model-form-actions">
          <button type="button" onClick={onCancel} className="f4-button f4-button--secondary">Cancel</button>
          <button type="submit" className="f4-button">Save</button>
        </div>

      </form>
    </div>
  );
}

export default EditModelForm;
