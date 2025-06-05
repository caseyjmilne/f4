import { useState } from 'react';
import Modal from './Modal';
import AddPropertyForm from './AddPropertyForm';
import PropertyList from './PropertyList';

const nestedFieldTypes = ['group', 'repeater'];

function PropertyItem({ property, properties, onEditClick, onDelete, onAdd, level = 0 }) {
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const supportsNested = nestedFieldTypes.includes(property.type);

  return (
    <li className="property-item-wrapper">
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
    </li>
  );
}

export default PropertyItem;
