import Label from "../fields/Label";
import FieldGroup from "../fields/FieldGroup";

function FormField({ label, id, name, value, onChange }) {
  return (
    <FieldGroup>
      <Label htmlFor={id} className="f4-form__field-label">
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        className="f4-form__field-input"
        required
      />
    </FieldGroup>
  );
}

export default FormField;