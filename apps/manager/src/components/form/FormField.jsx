function FormField({ label, id, name, value, onChange }) {
  return (
    <div className="f4-new-model-form__field-group">
      <label htmlFor={id} className="f4-new-model-form__field-label">
        <strong>{label}</strong>
      </label>
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