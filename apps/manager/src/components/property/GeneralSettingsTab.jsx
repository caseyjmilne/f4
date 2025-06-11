import Choices from "../settings/Choices";
import Prepend from "../settings/Prepend";
import Append from "../settings/Append";
import Placeholder from "../settings/Placeholder";

export default function GeneralSettingsTab({ settings, fieldSettings, handleChange }) {
  return (
    <>
      <Choices
        choices={settings.choices || []}
        onChange={choices => handleChange('choices', choices)}
        fieldSettings={fieldSettings}
      />
      <Prepend
        value={settings.prepend}
        onChange={val => handleChange('prepend', val)}
        fieldSettings={fieldSettings}
      />
      <Append
        value={settings.append}
        onChange={val => handleChange('append', val)}
        fieldSettings={fieldSettings}
      />
      <Placeholder
        value={settings.placeholder}
        onChange={val => handleChange('placeholder', val)}
        fieldSettings={fieldSettings}
      />
    </>
  );
}