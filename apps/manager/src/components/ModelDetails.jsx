import React from 'react';

function ModelDetails({ model, onDelete }) {
  if (!model) return null;

  return (
    <div className="model-details">
      <h3>Model Details</h3>
      <p><strong>ID:</strong> {model.id}</p>
      <p><strong>Key:</strong> {model.model_key}</p>

      <button
        className="f4-delete-model-button"
        onClick={() => {
          if (window.confirm(`Delete model "${model.key}"? This cannot be undone.`)) {
            onDelete(model.id);
          }
        }}
      >
        Delete Model
      </button>
    </div>
  );
}

export default ModelDetails;
