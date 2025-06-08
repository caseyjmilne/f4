/**
 * Handles drag end for property lists, supporting dropzones and direct item drops.
 * @param {object} params
 * @param {object} params.event - dnd-kit drag end event
 * @param {Array} params.properties - current properties array
 * @param {Function} params.setProperties - setter for properties
 * @param {Function} params.handleReorder - callback for reorder API
 * @param {Function} params.setActiveId - setter for activeId
 * @param {Function} params.setDraggedProperty - setter for draggedProperty
 */
export function handlePropertyDragEnd({
  event,
  properties,
  setProperties,
  handleReorder,
  setActiveId,
  setDraggedProperty,
}) {
  const { active, over } = event;
  setActiveId(null);
  setDraggedProperty(null);

  if (!over) return;

  // DropZone id format: dropzone-parentId-index
  if (typeof over.id === 'string' && over.id.startsWith('dropzone-')) {
    const [, parentIdStr, indexStr] = over.id.split('-');
    const newParentId = Number(parentIdStr);
    const insertAt = Number(indexStr);

    const withoutDragged = properties.filter(p => p.id !== active.id);
    const siblings = withoutDragged.filter(p => (p.parent_id ?? 0) === newParentId);

    const newSiblings = [
      ...siblings.slice(0, insertAt),
      { ...properties.find(p => p.id === active.id), parent_id: newParentId },
      ...siblings.slice(insertAt),
    ];

    const reordered = newSiblings.map((item, idx) => ({
      ...item,
      order: idx,
      parent_id: newParentId,
    }));

    const updatedProperties = withoutDragged
      .filter(p => (p.parent_id ?? 0) !== newParentId)
      .concat(reordered);

    setProperties(updatedProperties);
    handleReorder(reordered, newParentId);
    return;
  }

  // Dropping directly on an item (could be as sibling)
  if (typeof over.id === 'number') {
    const overProp = properties.find(p => p.id === over.id);
    const dragged = properties.find(p => p.id === active.id);

    let newParentId = overProp.parent_id ?? 0;
    let insertAt = properties
      .filter(p => (p.parent_id ?? 0) === newParentId)
      .findIndex(p => p.id === overProp.id);

    // Uncomment below to allow dropping as child if overProp supports nesting:
    // if (['group', 'repeater'].includes(overProp.type)) {
    //   newParentId = overProp.id;
    //   insertAt = 0;
    // }

    const withoutDragged = properties.filter(p => p.id !== active.id);
    const siblings = withoutDragged.filter(p => (p.parent_id ?? 0) === newParentId);

    const newSiblings = [
      ...siblings.slice(0, insertAt),
      { ...dragged, parent_id: newParentId },
      ...siblings.slice(insertAt),
    ];

    const reordered = newSiblings.map((item, idx) => ({
      ...item,
      order: idx,
      parent_id: newParentId,
    }));

    const updatedProperties = withoutDragged
      .filter(p => (p.parent_id ?? 0) !== newParentId)
      .concat(reordered);

    setProperties(updatedProperties);
    handleReorder(reordered, newParentId);
    return;
  }
}