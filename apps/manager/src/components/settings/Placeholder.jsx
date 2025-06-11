import TextInput from "../fields/TextInput";

export default function Placeholder({ value, onChange, fieldSettings }) {
  if (!fieldSettings?.includes('placeholder')) return null;
  return (
    <TextInput
      id="setting-placeholder"
      label="Placeholder"
      value={value}
      onChange={onChange}
    />
  );
}