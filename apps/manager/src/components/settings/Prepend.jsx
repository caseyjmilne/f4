import TextInput from "../fields/TextInput";

export default function Prepend({ value, onChange, fieldSettings }) {
  if (!fieldSettings?.includes('prepend')) return null;
  return (
    <TextInput
      id="setting-prepend"
      label="Prepend"
      value={value}
      onChange={onChange}
    />
  );
}