import React, { useState } from "react";

export default function Choices({ choices = [], onChange }) {
  const [localChoices, setLocalChoices] = useState(choices);

  // Update parent when localChoices changes
  React.useEffect(() => {
    onChange && onChange(localChoices);
  }, [localChoices, onChange]);

  const handleAdd = () => {
    setLocalChoices([...localChoices, { value: "", label: "" }]);
  };

  const handleChange = (idx, field, val) => {
    const updated = localChoices.map((choice, i) =>
      i === idx ? { ...choice, [field]: val } : choice
    );
    setLocalChoices(updated);
  };

  const handleDelete = (idx) => {
    setLocalChoices(localChoices.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label><strong>Choices</strong></label>
      {localChoices.map((choice, idx) => (
        <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
          <input
            type="text"
            placeholder="Value"
            value={choice.value}
            onChange={e => handleChange(idx, "value", e.target.value)}
            style={{ width: 100 }}
          />
          <input
            type="text"
            placeholder="Label"
            value={choice.label}
            onChange={e => handleChange(idx, "label", e.target.value)}
            style={{ width: 150 }}
          />
          <button type="button" onClick={() => handleDelete(idx)} aria-label="Delete choice">✕</button>
        </div>
      ))}
      <button type="button" onClick={handleAdd}>Add Choice</button>
    </div>
  );
}