import Conditions from "../settings/Conditions";

export default function ConditionalLogicSettingsTab({ settings, fieldSettings, handleChange }) {
  return (
    <>
      <Conditions
        value={settings.conditions}
        onChange={val => handleChange('conditions', val)}
        fieldSettings={fieldSettings}
      />
    </>
  );
}