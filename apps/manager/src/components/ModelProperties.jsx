import { useState, useEffect } from 'react';
import {
  fetchProperties,
  createProperty,
  deleteProperty,
  updateProperty,
} from '../api/properties';
import PropertyList from './PropertyList';
import AddPropertyForm from './AddPropertyForm';
import Modal from './Modal';

function ModelProperties({ selectedModelId }) {
  const [properties, setProperties] = useState([]);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

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
      setShowAddPropertyModal(false);
    } catch (error) {
      alert('Failed to create property: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await deleteProperty(id);
      setProperties(prev => prev.filter(prop => prop.id !== id));
    } catch (error) {
      alert('Delete failed: ' + error.message);
    }
  };

  const handleEdit = async (updatedProp) => {
    try {
      const updated = await updateProperty(updatedProp);
      setProperties(prev =>
        prev.map(prop => (prop.id === updated.id ? updated : prop))
      );
    } catch (error) {
      alert('Update failed: ' + error.message);
    }
  };

  if (!selectedModelId) return null;

  return (
    <>
      <header className="model-properties-header">
        <h3>Model Properties</h3>
        <button
          className="f4-add-property-button"
          onClick={() => setShowAddPropertyModal(true)}
        >
          + Property
        </button>
      </header>

      <PropertyList
        properties={properties}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={showAddPropertyModal}
        onClose={() => setShowAddPropertyModal(false)}
      >
        <AddPropertyForm onSubmit={handleAddProperty} />
      </Modal>
    </>
  );
}

export default ModelProperties;
