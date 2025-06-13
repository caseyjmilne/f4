import React from "react";

export default function TextArea({ id, label, value, onChange, ...props }) {
  return (
    <div className="f4-form__field-group">
      {label && (
        <label htmlFor={id} className="f4-form__field-label">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className="f4-form__field-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
}