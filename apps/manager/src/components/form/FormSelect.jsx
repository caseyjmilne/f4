import Label from "../fields/Label";
import FieldGroup from "../fields/FieldGroup";

function FormSelect({ label, id, name, value, onChange, options }) {
  return (
    <FieldGroup>
      <Label htmlFor={id} className="f4-form__field-label">
        {label}
      </Label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="f4-form__field-input"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </FieldGroup>
  );
}

export default FormSelect;