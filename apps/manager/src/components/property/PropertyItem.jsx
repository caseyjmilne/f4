import { useState } from 'react';
import Modal from '../ux/modal/Modal';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';

function PropertyItem({ property, properties, onEditClick, onDelete, onAdd, onReorder, level = 0, dragHandleProps, activeId, setActiveId }) {
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const supportsNested = ['group', 'repeater'].includes(property.type);

  return (
    <div style={{ marginLeft: `${level * 20}px`, padding: '4px 0' }}>
      <div className="property-item">
        <span className="drag-handle" {...dragHandleProps} style={{ cursor: 'grab', marginRight: '10px' }}>☰</span>
        {property.name} <em>({property.type})</em>

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
          onReorder={onReorder}
          parentId={property.id}
          level={level + 1}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      )}

      {showAddChildModal && (
        <Modal isOpen={true} onClose={() => setShowAddChildModal(false)}>
          <PropertyForm
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