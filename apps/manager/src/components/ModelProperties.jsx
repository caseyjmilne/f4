import { useState, useEffect } from 'react';
import {
  fetchProperties,
  createProperty,
  deleteProperty,
  updateProperty,
  updatePropertyOrder,
} from '../api/properties';
import PropertyList from './PropertyList';
import AddPropertyForm from './AddPropertyForm';
import EditPropertyForm from './EditPropertyForm';
import Modal from './Modal';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import PropertyItem from './PropertyItem'; // or whatever you want to show as overlay
import { handlePropertyDragEnd } from '../dnd/handlePropertyDragEnd';

function ModelProperties({ selectedModelId }) {
  const [properties, setProperties] = useState([]);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showEditPropertyModal, setShowEditPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
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

  const handleReorder = async (newOrder, parentId) => {
    // Build updated structure
    const reordered = newOrder.map((item, index) => ({
      ...item,
      order: index,
      parent_id: parentId,
    }));

    // Update local state
    setProperties((prev) => {
      const unchanged = prev.filter(p => p.parent_id !== parentId);
      return [...unchanged, ...reordered];
    });

    // Save to DB
    try {
      await updatePropertyOrder(reordered);
    } catch (err) {
      console.error('Failed to save order', err);
      alert('Could not save new order.');
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    setDraggedProperty(null);

    if (!over) return;

    // DropZone id format: dropzone-parentId-index
    if (over.id.startsWith('dropzone-')) {
      const [, parentIdStr, indexStr] = over.id.split('-');
      const newParentId = Number(parentIdStr);
      const insertAt = Number(indexStr);

      // Remove dragged from its old position
      const withoutDragged = properties.filter(p => p.id !== active.id);

      // Find siblings in new parent
      const siblings = withoutDragged.filter(p => (p.parent_id ?? 0) === newParentId);

      // Insert at the correct position
      const newSiblings = [
        ...siblings.slice(0, insertAt),
        { ...properties.find(p => p.id === active.id), parent_id: newParentId },
        ...siblings.slice(insertAt),
      ];

      // Reassign order
      const reordered = newSiblings.map((item, idx) => ({
        ...item,
        order: idx,
        parent_id: newParentId,
      }));

      // Merge back into properties
      const updatedProperties = withoutDragged
        .filter(p => (p.parent_id ?? 0) !== newParentId)
        .concat(reordered);

      setProperties(updatedProperties);
      handleReorder(reordered, newParentId);
      return;
    }

    // Fallback: dropped on an item (could be child or sibling)
    const dragged = properties.find(p => p.id === active.id);
    if (!dragged) return;

    const overProp = properties.find(p => p.id === over.id);

    let newParentId = 0;
    if (overProp && ['group', 'repeater'].includes(overProp.type)) {
      newParentId = overProp.id;
    } else if (overProp) {
      newParentId = overProp.parent_id ?? 0;
    } else {
      // Dropped at root level (not on an item)
      newParentId = 0;
    }

    const siblings = properties
      .filter(p => (p.parent_id ?? 0) === newParentId && p.id !== dragged.id);

    const overIndex = siblings.findIndex(p => p.id === over.id);
    const insertAt = overIndex === -1 ? siblings.length : overIndex;

    const newSiblings = [
      ...siblings.slice(0, insertAt),
      { ...dragged, parent_id: newParentId },
      ...siblings.slice(insertAt)
    ];

    const reordered = newSiblings.map((item, idx) => ({
      ...item,
      order: idx,
      parent_id: newParentId,
    }));

    // Only remove the dragged item, not all siblings
    const updatedProperties = properties
      .filter(p => p.id !== dragged.id)
      .concat(reordered);

    setProperties(updatedProperties);

    handleReorder(reordered, newParentId);
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
          onReorder={handleReorder}
          parentId={0}
          level={0}
          activeId={activeId}
          setActiveId={setActiveId}
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

        <DragOverlay>
          {draggedProperty ? (
            <PropertyItem
              property={draggedProperty}
              properties={properties}
              level={0}
              // pass other props as needed
            />
          ) : null}
        </DragOverlay>
      </>
    </DndContext>
  );
}

export default ModelProperties;
