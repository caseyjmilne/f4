import { useDroppable } from '@dnd-kit/core';
import './drop-zone.css';

function DropZone({ id, isActive }) {

  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <li
      ref={setNodeRef}
      className={`drop-zone${isOver || isActive ? ' drop-zone--active' : ''}`}
    />
  );

}

export default DropZone;