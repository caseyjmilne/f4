// PresentationSettingsTab.jsx
import Prepend from "../settings/Prepend";
import Append from "../settings/Append";
import Placeholder from "../settings/Placeholder";
import RowsSetting from "../settings/RowsSetting";
import InstructionsSetting from "../settings/InstructionsSetting";

export default function PresentationSettingsTab({ settings, fieldSettings, handleChange }) {
  return (
    <>
      <InstructionsSetting
        value={settings.instructions}
        onChange={val => handleChange('instructions', val)}
        fieldSettings={fieldSettings}
      />
      <RowsSetting
        value={settings.rows}
        onChange={val => handleChange('rows', val)}
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