import TextInput from "../fields/TextInput";
import Choices from "../settings/Choices";
import DefaultSetting from "../settings/DefaultSetting";
import TypeSetting from "../settings/TypeSetting";

export default function GeneralSettingsTab({ settings, fieldSettings, handleChange }) {
  return (
    <>
      <TypeSetting
        value={settings.type || "text"}
        onChange={val => handleChange('type', val)}
      />
      <TextInput
        id="property-name"
        label="Name"
        value={settings.name || ""}
        onChange={val => handleChange('name', val)}
      />
      <TextInput
        id="property-key"
        label="Key"
        value={settings.key || ""}
        onChange={val => handleChange('key', val)}
      />

      <Choices
        choices={settings.choices || []}
        onChange={choices => handleChange('choices', choices)}
        fieldSettings={fieldSettings}
      />

      <DefaultSetting
        value={settings.default || ""}
        onChange={val => handleChange('default', val)}
        fieldSettings={fieldSettings}
      />
    </>
  );
}