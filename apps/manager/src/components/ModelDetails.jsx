import { useState } from 'react';
import Modal from './ux/modal/Modal';

function ModelDetails({ model, onDelete, onEditClick }) {

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!model) return null;

  const handleDelete = () => {
    onDelete(model.id);
    setShowConfirmModal(false);
  };

  return (
    <div className="model-details">
      <table className="model-details__table">
        <tbody>
          <tr>
            <th className="model-details__th">ID</th>
            <td className="model-details__td">{model.id}</td>
          </tr>
          <tr>
            <th className="model-details__th">Type</th>
            <td className="model-details__td">{model.type}</td>
          </tr>
          <tr>
            <th className="model-details__th">Title</th>
            <td className="model-details__td">{model.title}</td>
          </tr>
          <tr>
            <th className="model-details__th">Key</th>
            <td className="model-details__td">{model.key}</td>
          </tr>
        </tbody>
      </table>

      <div className="model-details__actions">
        <button className="f4-button" onClick={onEditClick}>
          Edit Model
        </button>
        <button
          className="f4-button f4-button--secondary"
          onClick={() => setShowConfirmModal(true)}
        >
          Delete Model
        </button>
      </div>

      {showConfirmModal && (
        <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
          <div className="model-details__confirm">
            <p>
              Are you sure you want to delete model "{model.key}"?
              This cannot be undone.
            </p>
            <div className="f4-form-actions">
              <button
                className="f4-button f4-button--secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="f4-button"
                onClick={handleDelete}
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
