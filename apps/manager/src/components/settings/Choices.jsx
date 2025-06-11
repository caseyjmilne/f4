import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Helper to generate a unique id
const genId = () => '_' + Math.random().toString(36).substr(2, 9);

function SortableChoiceItem({
  id,
  idx,
  choice,
  onChange,
  onDelete,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

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
      <button
        type="button"
        onClick={() => onDelete(idx)}
        aria-label="Delete choice"
      >
        ✕
      </button>
    </div>
  );
}

export default function Choices({ choices = [], onChange, fieldSettings }) {
  if (!fieldSettings?.includes('choices')) return null;

  // Ensure each choice has a stable id
  const withIds = (arr) =>
    arr.map((c) => (c.id ? c : { ...c, id: genId() }));

  const [localChoices, setLocalChoices] = useState(withIds(choices));

  useEffect(() => {
    setLocalChoices(withIds(choices));
    // eslint-disable-next-line
  }, [choices]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleAdd = () => {
    const updated = [...localChoices, { value: "", label: "", id: genId() }];
    setLocalChoices(updated);
    onChange && onChange(updated.filter(choice => choice.value && choice.label));
  };

  const handleChange = (idx, field, val) => {
    const updated = localChoices.map((choice, i) =>
      i === idx ? { ...choice, [field]: val } : choice
    );
    setLocalChoices(updated);
    onChange && onChange(updated.filter(choice => choice.value && choice.label));
  };

  const handleDelete = (idx) => {
    const updated = localChoices.filter((_, i) => i !== idx);
    setLocalChoices(updated);
    onChange && onChange(updated.filter(choice => choice.value && choice.label));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = localChoices.findIndex((c) => c.id === active.id);
      const newIndex = localChoices.findIndex((c) => c.id === over.id);
      const updated = arrayMove(localChoices, oldIndex, newIndex);
      setLocalChoices(updated);
      onChange && onChange(updated.filter(choice => choice.value && choice.label));
    }
  };

  return (
    <div>
      <label>
        <strong>Choices</strong>
      </label>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localChoices.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {localChoices.map((choice, idx) => (
            <SortableChoiceItem
              key={choice.id}
              id={choice.id}
              idx={idx}
              choice={choice}
              onChange={handleChange}
              onDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </DndContext>
      <button type="button" onClick={handleAdd}>
        Add Choice
      </button>
    </div>
  );
}