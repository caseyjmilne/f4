export default function Select({ options = [], value, onChange, className = '', ...props }) {
  return (
    <select
      value={value}
      onChange={e => onChange && onChange(e.target.value)}
      className={`f4-form__field-input ${className}`}
      {...props}
    >
      {options.map(opt =>
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      )}
    </select>
  );
}