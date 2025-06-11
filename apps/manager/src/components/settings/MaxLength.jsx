import TextInput from "../fields/TextInput";

export default function MaxLength({ value, onChange, fieldSettings }) {
  if (!fieldSettings?.includes('maxLength')) return null;
  return (
    <TextInput
      id="setting-maxLength"
      label="Max Length"
      type="number"
      min="1"
      value={value}
      onChange={onChange}
    />
  );
}