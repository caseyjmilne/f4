import React from "react";
import "./Toggle.css"; // Optional: for custom styles

export default function Toggle({ checked, onChange, id, label }) {
  return (
    <label className="f4-toggle" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={!!checked}
        onChange={e => onChange(e.target.checked)}
        className="f4-toggle__input"
      />
      <span className="f4-toggle__slider" />
      {label && <span className="f4-toggle__label">{label}</span>}
    </label>
  );
}