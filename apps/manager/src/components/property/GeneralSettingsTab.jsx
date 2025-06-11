import TextInput from "../fields/TextInput";
import Choices from "../settings/Choices";
import { useFieldTypeList } from "../../context/FieldTypeListContext";

export default function GeneralSettingsTab({ settings, fieldSettings, handleChange }) {
  const fieldTypeList = useFieldTypeList();

  return (
    <>
      <div className="f4-new-model-form__field-group">
        <label htmlFor="property-type" className="f4-new-model-form__field-label">
          <strong>Type</strong>
        </label>
        <select
          id="property-type"
          value={settings.type || ""}
          onChange={e => handleChange('type', e.target.value)}
          className="f4-form__field-input"
        >
          {fieldTypeList.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
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
    </>
  );
}