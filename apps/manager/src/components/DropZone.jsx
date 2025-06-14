import { useDroppable } from '@dnd-kit/core';

function DropZone({ id, isActive }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <li
      ref={setNodeRef}
      className={`drop-zone${isOver || isActive ? ' drop-zone--active' : ''}`}
      style={{
        height: 12,
        background: isOver || isActive ? 'var(--offset-1)' : 'transparent',
        margin: '2px 0',
        transition: 'background 0.2s',
        listStyle: 'none',
      }}
    />
  );
}

export default DropZone;