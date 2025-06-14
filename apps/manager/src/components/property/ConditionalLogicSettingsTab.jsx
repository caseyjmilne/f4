import Conditions from "../settings/Conditions";

export default function ConditionalLogicSettingsTab({ settings, fieldSettings, onSettingsChange }) {
  return (
    <>
      <Conditions
        value={settings.conditions}
        onChange={val => onSettingsChange('conditions', val)}
        fieldSettings={fieldSettings}
      />
    </>
  );
}