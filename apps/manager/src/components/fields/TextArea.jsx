import Label from "./Label";
import FieldGroup from "./FieldGroup";

export default function TextArea({ id, label, value, onChange, ...props }) {
  return (
    <FieldGroup>
      {label && (
        <Label htmlFor={id} className="f4-form__field-label">
          {label}
        </Label>
      )}
      <textarea
        id={id}
        className="f4-form__field-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        {...props}
      />
    </FieldGroup>
  );
}