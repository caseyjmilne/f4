import { useState } from 'react';
import Modal from './Modal';
import AddPropertyForm from './AddPropertyForm';
import PropertyList from './PropertyList';

// Define which types support nesting here
const nestedFieldTypes = ['group', 'repeater'];

function PropertyItem({ property, properties, onEditClick, onDelete, onAdd, level = 0 }) {
  const [showAddChildModal, setShowAddChildModal] = useState(false);

  const supportsNested = nestedFieldTypes.includes(property.type);

  return (
    <div style={{ marginLeft: `${level * 20}px`, padding: '4px 0' }}>
      <div className="property-item">
        <strong>{property.name}</strong> <em>({property.type})</em>
        <div className="property-actions">
          <button onClick={() => onEditClick(property)}>Edit</button>
          <button onClick={() => onDelete(property.id)}>Delete</button>
          {supportsNested && (
            <button onClick={() => setShowAddChildModal(true)}>+ Add Field</button>
          )}
        </div>
      </div>

      {/* Nested properties list */}
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

      {/* Add child property modal */}
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
