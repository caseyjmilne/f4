// ValidationSettingsTab.jsx
import TextInput from "../fields/TextInput";

export default function ValidationSettingsTab({ settings, fieldSettings, handleChange }) {
  return (
    <>
      {fieldSettings.includes('maxLength') && (
        <TextInput
          id="setting-maxLength"
          label="Max Length"
          type="number"
          min="1"
          value={settings.maxLength}
          onChange={val => handleChange('maxLength', val)}
        />
      )}
    </>
  );
}