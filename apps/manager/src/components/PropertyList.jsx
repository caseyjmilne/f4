import PropertyItem from './PropertyItem';

function PropertyList({ properties, onEditClick, onDelete, onAdd, parentId = 0, level = 0 }) {
  const filtered = properties.filter(p => (p.parent_id ?? 0) === parentId);

  return (
    <ul className={`property-list level-${level}`}>
      {filtered.map((prop) => (
        <li key={prop.id}>
          <PropertyItem
            property={prop}
            properties={properties}
            onEditClick={onEditClick}
            onDelete={onDelete}
            onAdd={onAdd}
            level={level}
          />
        </li>
      ))}
    </ul>
  );
}

export default PropertyList;
