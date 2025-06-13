import MaxLength from "../settings/MaxLength";
import Required from "../settings/Required";

export default function ValidationSettingsTab({ settings, fieldSettings, handleChange }) {
  return (
    <>
      <Required
        value={settings.required}
        onChange={val => handleChange('required', val)}
        fieldSettings={fieldSettings}
      />
      <MaxLength
        value={settings.maxLength}
        onChange={val => handleChange('maxLength', val)}
        fieldSettings={fieldSettings}
      />
    </>
  );
}