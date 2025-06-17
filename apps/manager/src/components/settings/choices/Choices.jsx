import { useState, useEffect } from "react";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Label from "../../fields/Label";
import PrimaryButton from "../../ux/button/PrimaryButton/PrimaryButton";
import SortableChoiceItem from "./SortableChoiceItem";
import { withIds, genId } from "./helpers";

export default function Choices({ choices = [], onChange, fieldSettings }) {
  
  const [localChoices, setLocalChoices] = useState(() => withIds(choices));

  console.log('localChoices:')
  console.log(localChoices)


  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleAdd = () => {
    const updated = [...localChoices, { value: "", label: "", id: genId() }];
    setLocalChoices(updated);
    onChange?.(updated.filter((c) => c.value && c.label));
  };

  if (!fieldSettings?.includes("choices")) return null;

  const handleChange = (idx, field, val) => {
    const updated = localChoices.map((c, i) =>
      i === idx ? { ...c, [field]: val } : c
    );
    setLocalChoices(updated);
    onChange?.(updated.filter((c) => c.value && c.label));
  };

  const handleDelete = (idx) => {
    const updated = localChoices.filter((_, i) => i !== idx);
    setLocalChoices(updated);
    onChange?.(updated.filter((c) => c.value && c.label));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = localChoices.findIndex((c) => c.id === active.id);
      const newIndex = localChoices.findIndex((c) => c.id === over.id);
      const updated = arrayMove(localChoices, oldIndex, newIndex);
      setLocalChoices(updated);
      onChange?.(updated.filter((c) => c.value && c.label));
    }
  };

  return (
    <div>
      <Label>Choices</Label>

      {localChoices.length > 0 ? (
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
      ) : (
        <p style={{ fontStyle: "italic", color: "#666" }}>No choices yet.</p>
      )}

      <PrimaryButton type="button" onClick={handleAdd}>
        Add Choice
      </PrimaryButton>
    </div>
  );
}
