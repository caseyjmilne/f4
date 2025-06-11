import TextInput from "../fields/TextInput";

export default function Append({ value, onChange, fieldSettings }) {
  if (!fieldSettings?.includes('append')) return null;
  return (
    <TextInput
      id="setting-append"
      label="Append"
      value={value}
      onChange={onChange}
    />
  );
}