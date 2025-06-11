import { useState } from "react";
import AddPropertyForm from "./AddPropertyForm";
import EditPropertyForm from "./EditPropertyForm";

export default function PropertyForms({
  selectedModelId,
  showAdd,
  setShowAdd,
  editProperty,
  setEditProperty,
}) {
  return (
    <>
      {showAdd && (
        <AddPropertyForm
          parentId={selectedModelId}
          onSubmit={() => setShowAdd(false)}
          onCancel={() => setShowAdd(false)}
        />
      )}
      {editProperty && (
        <EditPropertyForm
          property={editProperty}
          onSave={() => setEditProperty(null)}
          onCancel={() => setEditProperty(null)}
        />
      )}
    </>
  );
}