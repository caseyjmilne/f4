import React, { useState } from 'react';
import Modal from './Modal';

function ModelDetails({ model, onDelete, onEditClick }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!model) return null;

  const handleDelete = () => {
    onDelete(model.id);
    setShowConfirmModal(false);
  };

  return (
    <div className="model-details">

      <table className="model-details__table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ccc' }}>Model ID</th>
            <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{model.id}</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ccc' }}>Title</th>
            <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{model.title}</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ccc' }}>Key</th>
            <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{model.key}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '12px' }}>
        <button
          className="f4-edit-model-button"
          onClick={onEditClick}
          style={{ marginRight: '10px' }}
        >
          Edit Model
        </button>

        <button
          className="f4-delete-model-button"
          onClick={() => setShowConfirmModal(true)}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          Delete Model
        </button>
      </div>

      {showConfirmModal && (
        <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
          <div style={{ padding: '20px' }}>
            <p>Are you sure you want to delete model "<strong>{model.key}</strong>"? This cannot be undone.</p>
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{ marginRight: '10px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ModelDetails;
