import { useState } from 'react';
import Modal from '../ux/modal/Modal';
import PrimaryButton from '../ux/button/PrimaryButton/PrimaryButton';
import SecondaryButton from '../ux/button/SecondaryButton/SecondaryButton';

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
        <PrimaryButton type="button" onClick={onEditClick}>
          Edit Model
        </PrimaryButton>
        <SecondaryButton
          type="button"
          onClick={() => setShowConfirmModal(true)}
        >
          Delete Model
        </SecondaryButton>
      </div>

      {showConfirmModal && (
        <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
          <div className="model-details__modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this model?</p>
            <div className="model-details__modal-actions">
              <PrimaryButton onClick={handleDelete}>Yes, Delete</PrimaryButton>
              <SecondaryButton onClick={() => setShowConfirmModal(false)}>
                Cancel
              </SecondaryButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ModelDetails;