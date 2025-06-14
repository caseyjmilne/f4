import MaxLength from "../settings/MaxLength";
import Required from "../settings/Required";

export default function ValidationSettingsTab({ settings, fieldSettings, onSettingsChange }) {

  console.log('settings in validation tab')
  console.log(settings)

  return (
    <>
      <Required
        value={settings.required}
        onChange={val => onSettingsChange('required', val)}
        fieldSettings={fieldSettings}
      />
      <MaxLength
        value={settings.maxLength}
        onChange={val => onSettingsChange('maxLength', val)}
        fieldSettings={fieldSettings}
      />
    </>
  );
}