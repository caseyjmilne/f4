import Choices from "../settings/Choices";
import TextInput from "../fields/TextInput";

export default function GeneralSettingsTab({ settings, fieldSettings, handleChange }) {
  return (
    <>
      {fieldSettings.includes('choices') && (
        <div className="f4-new-model-form__field-group">
          <label className="f4-new-model-form__field-label"><strong>Choices</strong></label>
          <Choices
            choices={settings.choices || []}
            onChange={choices => handleChange('choices', choices)}
          />
        </div>
      )}
      {fieldSettings.includes('prepend') && (
        <TextInput
          id="setting-prepend"
          label="Prepend"
          value={settings.prepend}
          onChange={val => handleChange('prepend', val)}
        />
      )}
      {fieldSettings.includes('append') && (
        <TextInput
          id="setting-append"
          label="Append"
          value={settings.append}
          onChange={val => handleChange('append', val)}
        />
      )}
      {fieldSettings.includes('placeholder') && (
        <TextInput
          id="setting-placeholder"
          label="Placeholder"
          value={settings.placeholder}
          onChange={val => handleChange('placeholder', val)}
        />
      )}
    </>
  );
}