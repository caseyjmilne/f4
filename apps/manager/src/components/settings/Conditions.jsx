import Toggle from "../ux/toggle/Toggle";

export default function Conditions({ value, onChange, fieldSettings }) {
  if (!fieldSettings?.includes('conditions')) return null;
  return (
    <Toggle
      id="setting-conditions"
      label="Conditions"
      checked={!!value}
      onChange={onChange}
    />
  );
}