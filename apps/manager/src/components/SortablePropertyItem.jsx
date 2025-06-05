import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PropertyItem from './PropertyItem';

function SortablePropertyItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.property.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <PropertyItem {...props} />
    </li>
  );
}

export default SortablePropertyItem;
