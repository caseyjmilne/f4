import { useState, useEffect } from 'react';
import {
  fetchProperties,
  createProperty,
  deleteProperty,
  updateProperty,
} from '../api/properties';
import PropertyList from './PropertyList';
import AddPropertyForm from './AddPropertyForm';
import EditPropertyForm from './EditPropertyForm';
import Modal from './Modal';

function ModelProperties({ selectedModelId }) {
  const [properties, setProperties] = useState([]);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showEditPropertyModal, setShowEditPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  useEffect(() => {
    if (!selectedModelId) return;

    fetchProperties(selectedModelId)
      .then(setProperties)
      .catch(err => {
        console.error('Failed to load properties:', err);
      });
  }, [selectedModelId]);

  const handleAddProperty = async (property) => {
    try {
      const created = await createProperty({ ...property, model_id: selectedModelId });

      setProperties(prev => [...prev, created]);

      // Optionally hide modal only when adding to root
      if (!property.parent_id) {
        setShowAddPropertyModal(false);
      }
    } catch (error) {
      alert('Failed to create property: ' + error.message);
    }
  };

  const handleDelete = (id) => {
    setPropertyToDelete(id); // open confirmation modal
  };

  const confirmDelete = async () => {
    if (!propertyToDelete) return;
    try {
      await deleteProperty(propertyToDelete);
      setProperties(prev => prev.filter(prop => prop.id !== propertyToDelete));
      setPropertyToDelete(null);
    } catch (error) {
      alert('Delete failed: ' + error.message);
    }
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setShowEditPropertyModal(true);
  };

  const handleEditSave = async (updatedProp) => {
    try {
      const updated = await updateProperty(updatedProp);
      setProperties(prev =>
        prev.map(prop => (prop.id === updated.id ? updated : prop))
      );
      setShowEditPropertyModal(false);
      setSelectedProperty(null);
    } catch (error) {
      alert('Update failed: ' + error.message);
    }
  };

  if (!selectedModelId) return null;

  console.log('Properties at 75, ModelProperties.jsx')
  console.log(properties)

  return (
    <>
      <header className="model-properties-header">
        <h3>Model Properties</h3>
        <button
          className="f4-button"
          onClick={() => setShowAddPropertyModal(true)}
        >
          + Property
        </button>
      </header>

      <PropertyList
        properties={properties}
        onEditClick={handleEditClick}
        onDelete={handleDelete}
        onAdd={handleAddProperty}
      />

      {showAddPropertyModal && (
        <AddPropertyForm
          onSubmit={handleAddProperty}
          onCancel={() => setShowAddPropertyModal(false)}
        />
      )}

      {showEditPropertyModal && selectedProperty && (
        <EditPropertyForm
          property={selectedProperty}
          onSave={handleEditSave}
          onCancel={() => {
            setShowEditPropertyModal(false);
            setSelectedProperty(null);
          }}
        />
      )}

      {/* Delete confirmation modal */}
      {propertyToDelete !== null && (
        <Modal isOpen={true} onClose={() => setPropertyToDelete(null)}>
          <div className="f4-modal-confirm">
            <h4>Confirm Delete</h4>
            <p>Are you sure you want to delete this property?</p>
            <div className="f4-form-actions">
              <button
                className="f4-button f4-button--secondary"
                onClick={() => setPropertyToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="f4-button f4-button--danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ModelProperties;
