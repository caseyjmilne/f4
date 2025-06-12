import Label from "../fields/Label";

function FormField({ label, id, name, value, onChange }) {
  return (
    <div className="f4-form__field-group">
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
    </div>
  );
}

export default FormField;