import React, { useState } from 'react';
import Modal from './Modal';
import AddPropertyForm from './AddPropertyForm';
import PropertyList from './PropertyList';

function PropertyItem({ property, properties, onEditClick, onDelete, onAdd, level = 0, dragHandleProps }) {
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const supportsNested = ['group', 'repeater'].includes(property.type);

  return (
    <div style={{ marginLeft: `${level * 20}px`, padding: '4px 0' }}>
      <div className="property-item">
        <span className="drag-handle" {...dragHandleProps} style={{ cursor: 'grab', marginRight: '10px' }}>☰</span>
        <strong>{property.name}</strong> <em>({property.type})</em>

        <div className="property-actions">
          <button onClick={() => onEditClick(property)}>Edit</button>
          <button onClick={() => onDelete(property.id)}>Delete</button>
          {supportsNested && (
            <button onClick={() => setShowAddChildModal(true)}>+ Add Field</button>
          )}
        </div>
      </div>

      {supportsNested && (
        <PropertyList
          properties={properties}
          onEditClick={onEditClick}
          onDelete={onDelete}
          onAdd={onAdd}
          parentId={property.id}
          level={level + 1}
        />
      )}

      {showAddChildModal && (
        <Modal isOpen={true} onClose={() => setShowAddChildModal(false)}>
          <AddPropertyForm
            parentId={property.id}
            onSubmit={(newProp) => {
              onAdd(newProp);
              setShowAddChildModal(false);
            }}
            onCancel={() => setShowAddChildModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default PropertyItem;