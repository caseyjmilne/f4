function PropertyItem({ property, onEditClick, onDelete, level = 0 }) {
  return (
    <div
      className="property-item"
      style={{ marginLeft: `${level * 20}px`, padding: '4px 0' }}
    >
      <strong>{property.name}</strong> <em>({property.type})</em>
      <div className="property-actions">
        <button onClick={() => onEditClick(property)}>Edit</button>
        <button onClick={() => onDelete(property.id)}>Delete</button>
      </div>
    </div>
  );
}

export default PropertyItem;
