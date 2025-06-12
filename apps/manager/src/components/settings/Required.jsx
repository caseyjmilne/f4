import Toggle from "../ux/toggle/Toggle";

export default function Required({ value, onChange, fieldSettings }) {
  if (!fieldSettings?.includes('required')) return null;
  return (
    <Toggle
      id="setting-required"
      label="Required"
      checked={!!value}
      onChange={onChange}
    />
  );
}