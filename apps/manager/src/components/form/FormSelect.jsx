function FormSelect({ label, id, name, value, onChange, options }) {
  return (
    <div className="f4-new-model-form__field-group">
      <label htmlFor={id} className="f4-new-model-form__field-label">
        <strong>{label}</strong>
      </label>
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