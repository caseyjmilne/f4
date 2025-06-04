// PropertyList.jsx
import PropertyItem from './PropertyItem';

function PropertyList({ properties, onEditClick, onDelete, parentId = null, level = 0 }) {
  const filtered = properties.filter(p => p.parent_id === parentId);

  return (
    <ul className={`property-list level-${level}`}>
      {filtered.map((prop) => (
        <li key={prop.id}>
          <PropertyItem
            property={prop}
            onEditClick={onEditClick}
            onDelete={onDelete}
            level={level}
          />
          {/* Recursively render children */}
          <PropertyList
            properties={properties}
            onEditClick={onEditClick}
            onDelete={onDelete}
            parentId={prop.id}
            level={level + 1}
          />
        </li>
      ))}
    </ul>
  );
}

export default PropertyList;
