import TextInput from "../fields/TextInput";

export default function DefaultSetting({ value, onChange, fieldSettings }) {
  if (!fieldSettings?.includes('default')) return null;
  return (
    <TextInput
      id="setting-default"
      label="Default Value"
      value={value}
      onChange={onChange}
    />
  );
}