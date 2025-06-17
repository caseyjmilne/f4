import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableChoiceItem({ id, idx, choice, onChange, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    gap: 8,
    marginBottom: 4,
    alignItems: "center",
    background: "#f9f9f9",
    padding: "2px 0",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <span
        {...attributes}
        {...listeners}
        style={{ cursor: "grab", padding: "0 4px", userSelect: "none" }}
        aria-label="Drag"
      >
        ☰
      </span>
      <input
        type="text"
        placeholder="Value"
        value={choice.value}
        onChange={(e) => onChange(idx, "value", e.target.value)}
        style={{ width: 100 }}
      />
      <input
        type="text"
        placeholder="Label"
        value={choice.label}
        onChange={(e) => onChange(idx, "label", e.target.value)}
        style={{ width: 150 }}
      />
      <button type="button" onClick={() => onDelete(idx)} aria-label="Delete choice">
        ✕
      </button>
    </div>
  );
}
