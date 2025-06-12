import Label from "../fields/Label";

function FormSelect({ label, id, name, value, onChange, options }) {
  return (
    <div className="f4-form__field-group">
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
    </div>
  );
}

export default FormSelect;