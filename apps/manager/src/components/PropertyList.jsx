import React from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortablePropertyItem from './SortablePropertyItem';
import DropZone from './DropZone';

function PropertyList({
  properties,
  onEditClick,
  onDelete,
  onAdd,
  onReorder = () => {},
  parentId = 0,
  level = 0,
  activeId,
  setActiveId,
}) {
  const filtered = properties.filter((p) => (p.parent_id ?? 0) === parentId);
  const visibleItems = activeId ? filtered.filter(p => p.id !== activeId) : filtered;
  const visibleItemIds = visibleItems.map((p) => p.id);

  return (
    <SortableContext items={visibleItemIds} strategy={verticalListSortingStrategy}>
      <ul className={`property-list level-${level}`}>
        {/* Drop zone at the very top */}
        <DropZone id={`dropzone-${parentId}-0`} />
        {visibleItems.map((prop, idx) => (
          <React.Fragment key={prop.id}>
            <SortablePropertyItem
              property={prop}
              properties={properties}
              onEditClick={onEditClick}
              onDelete={onDelete}
              onAdd={onAdd}
              onReorder={onReorder}
              parentId={parentId}
              level={level}
              activeId={activeId}
              setActiveId={setActiveId}
            />
            {/* Drop zone after each item */}
            <DropZone id={`dropzone-${parentId}-${idx + 1}`} />
          </React.Fragment>
        ))}
      </ul>
    </SortableContext>
  );
}

export default PropertyList;
