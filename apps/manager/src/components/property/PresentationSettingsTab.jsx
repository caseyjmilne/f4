// PresentationSettingsTab.jsx
export default function PresentationSettingsTab({ settings, fieldSettings, handleChange }) {
  return (
    <>
      {fieldSettings.includes('rows') && (
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
    </>
  );
}