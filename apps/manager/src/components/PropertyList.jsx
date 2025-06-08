import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import SortablePropertyItem from './SortablePropertyItem';

function PropertyList({
  properties,
  onEditClick,
  onDelete,
  onAdd,
  onReorder = () => {}, // fallback to avoid TypeError
  parentId = 0,
  level = 0,
  activeId,
  setActiveId,
}) {
  const filtered = properties.filter((p) => (p.parent_id ?? 0) === parentId);
  const itemIds = filtered.map((p) => p.id);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = filtered.findIndex((item) => item.id === active.id);
    const newIndex = filtered.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(filtered, oldIndex, newIndex);
    onReorder(newOrder, parentId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => setActiveId(event.active.id)}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <ul className={`property-list level-${level}`}>
          {filtered.map((prop) => (
            <SortablePropertyItem
              key={prop.id}
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
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default PropertyList;
