import TextInput from "../fields/TextInput";

export default function RowsSetting({ value, onChange, fieldSettings }) {
  if (!fieldSettings?.includes('rows')) return null;
  return (
    <TextInput
      id="setting-rows"
      label="Rows"
      type="number"
      min={1}
      value={value}
      onChange={onChange}
    />
  );
}