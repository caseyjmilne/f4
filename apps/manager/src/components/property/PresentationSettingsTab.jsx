// PresentationSettingsTab.jsx
import Prepend from "../settings/Prepend";
import Append from "../settings/Append";
import Placeholder from "../settings/Placeholder";
import RowsSetting from "../settings/RowsSetting";
import InstructionsSetting from "../settings/InstructionsSetting";

export default function PresentationSettingsTab({ settings, fieldSettings, onSettingsChange }) {
  return (
    <>
      <InstructionsSetting
        value={settings.instructions}
        onChange={val => onSettingsChange('instructions', val)}
        fieldSettings={fieldSettings}
      />
      <RowsSetting
        value={settings.rows}
        onChange={val => onSettingsChange('rows', val)}
        fieldSettings={fieldSettings}
      />
      <Prepend
        value={settings.prepend}
        onChange={val => onSettingsChange('prepend', val)}
        fieldSettings={fieldSettings}
      />
      <Append
        value={settings.append}
        onChange={val => onSettingsChange('append', val)}
        fieldSettings={fieldSettings}
      />
      <Placeholder
        value={settings.placeholder}
        onChange={val => onSettingsChange('placeholder', val)}
        fieldSettings={fieldSettings}
      />
    </>
  );
}