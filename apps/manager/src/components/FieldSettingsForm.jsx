function FieldSettingsForm({ settings, fieldSettings, onChange }) {

  const handleChange = (field, value) => {
    onChange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      {fieldSettings.prepend && (
        <div className="f4-new-model-form__field-group">
          <label htmlFor="setting-prepend" className="f4-new-model-form__field-label">
            <strong>Prepend</strong>
          </label>
          <input
            id="setting-prepend"
            type="text"
            className="f4-form__field-input"
            value={settings.prepend || ''}
            onChange={e => handleChange('prepend', e.target.value)}
          />
        </div>
      )}

      {fieldSettings.append && (
        <div className="f4-new-model-form__field-group">
          <label htmlFor="setting-append" className="f4-new-model-form__field-label">
            <strong>Append</strong>
          </label>
          <input
            id="setting-append"
            type="text"
            className="f4-form__field-input"
            value={settings.append || ''}
            onChange={e => handleChange('append', e.target.value)}
          />
        </div>
      )}

      {fieldSettings.placeholder && (
        <div className="f4-new-model-form__field-group">
          <label htmlFor="setting-placeholder" className="f4-new-model-form__field-label">
            <strong>Placeholder</strong>
          </label>
          <input
            id="setting-placeholder"
            type="text"
            className="f4-form__field-input"
            value={settings.placeholder || ''}
            onChange={e => handleChange('placeholder', e.target.value)}
          />
        </div>
      )}

      {fieldSettings.rows && (
        <div className="f4-new-model-form__field-group">
          <label htmlFor="setting-rows" className="f4-new-model-form__field-label">
            <strong>Rows</strong>
          </label>
          <input
            id="setting-rows"
            type="number"
            min="1"
            className="f4-form__field-input"
            value={settings.rows || ''}
            onChange={e => handleChange('rows', e.target.value)}
          />
        </div>
      )}

      {fieldSettings.maxLength && (
        <div className="f4-new-model-form__field-group">
          <label htmlFor="setting-maxLength" className="f4-new-model-form__field-label">
            <strong>Max Length</strong>
          </label>
          <input
            id="setting-maxLength"
            type="number"
            min="1"
            className="f4-form__field-input"
            value={settings.maxLength || ''}
            onChange={e => handleChange('maxLength', e.target.value)}
          />
        </div>
      )}
    </>
  );
}

export default FieldSettingsForm;
