import React from "react";
import Label from "./Label";

export default function TextArea({ id, label, value, onChange, ...props }) {
  return (
    <div className="f4-form__field-group">
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
    </div>
  );
}