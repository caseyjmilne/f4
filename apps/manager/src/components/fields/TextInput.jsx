import Label from "./Label";

export default function TextInput({
  id,
  label,
  value,
  type = "text",
  onChange,
  ...props
}) {
  return (
    <div className="f4-form__field-group">
      <Label htmlFor={id} className="f4-form__field-label">
        {label}
      </Label>
      <input
        id={id}
        type={type}
        className="f4-form__field-input"
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
}