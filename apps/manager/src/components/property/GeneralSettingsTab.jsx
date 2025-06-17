import TextInput from "../fields/TextInput";
import Choices from "../settings/choices/Choices";
import DefaultSetting from "../settings/DefaultSetting";
import TypeSetting from "../settings/TypeSetting";

export default function GeneralSettingsTab({ formData, settings = {}, fieldSettings, onMainChange, onSettingsChange }) {
  return (
    <>
      <TypeSetting
        value={formData.type || "text"}
        onChange={val => onMainChange('type', val)}
      />
      <TextInput
        id="property-name"
        label="Name"
        value={formData.name || ""}
        onChange={val => onMainChange('name', val)}
      />
      <TextInput
        id="property-key"
        label="Key"
        value={formData.key || ""}
        onChange={val => onMainChange('key', val)}
      />

      <Choices
        choices={settings.choices || []}
        onChange={choices => onSettingsChange('choices', choices)}
        fieldSettings={fieldSettings}
      />

      <DefaultSetting
        value={settings.default || ""}
        onChange={val => onSettingsChange('default', val)}
        fieldSettings={fieldSettings}
      />
    </>
  );
}