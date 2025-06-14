import { useState, useEffect } from 'react';
import {
  fetchProperties,
  deleteProperty,
  updatePropertyOrder,
} from '../api/properties';
import PropertyList from './property/PropertyList';
import PropertyItem from './property/PropertyItem';
import Modal from './ux/modal/Modal';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { handlePropertyDragEnd } from '../dnd/handlePropertyDragEnd';

function ModelProperties({
  selectedModelId,
  onAddPropertyClick,
  onEditPropertyClick,
}) {
  const [properties, setProperties] = useState([]);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [draggedProperty, setDraggedProperty] = useState(null);

  useEffect(() => {
    if (!selectedModelId) return;

    fetchProperties(selectedModelId)
      .then(setProperties)
      .catch(err => {
        console.error('Failed to load properties:', err);
      });
  }, [selectedModelId]);

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
    onEditPropertyClick && onEditPropertyClick(property);
  };

  const handleReorder = async (newOrder, parentId) => {
    const reordered = newOrder.map((item, index) => ({
      ...item,
      order: index,
      parent_id: parentId,
    }));

    setProperties((prev) => {
      const unchanged = prev.filter(p => p.parent_id !== parentId);
      return [...unchanged, ...reordered];
    });

    try {
      await updatePropertyOrder(reordered);
    } catch (err) {
      console.error('Failed to save order', err);
      alert('Could not save new order.');
    }
  };

  if (!selectedModelId) return null;

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={event =>
        handlePropertyDragEnd({
          event,
          properties,
          setProperties,
          handleReorder,
          setActiveId,
          setDraggedProperty,
        })
      }
      onDragStart={event => {
        setActiveId(event.active.id);
        setDraggedProperty(properties.find(p => p.id === event.active.id));
      }}
    >
      <>
        <header className="model-properties-header">
          <h3>Model Properties</h3>
          <button
            className="f4-button"
            onClick={onAddPropertyClick}
          >
            + Property
          </button>
        </header>

        <PropertyList
          properties={properties}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onAdd={onAddPropertyClick}
          onReorder={handleReorder}
          parentId={0}
          level={0}
          activeId={activeId}
          setActiveId={setActiveId}
        />

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

        <DragOverlay>
          {draggedProperty ? (
            <PropertyItem
              property={draggedProperty}
              properties={properties}
              level={0}
            />
          ) : null}
        </DragOverlay>
      </>
    </DndContext>
  );
}

export default ModelProperties;
