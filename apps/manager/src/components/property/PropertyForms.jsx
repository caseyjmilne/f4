import { useState } from "react";
import AddPropertyForm from "../AddPropertyForm";
import EditPropertyForm from "../EditPropertyForm";
import {
  createProperty,
  updateProperty,
} from "../../api/properties";

export default function PropertyForms({
  selectedModelId,
  onPropertyAdded,
  onPropertyUpdated,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editProperty, setEditProperty] = useState(null);

  const handleAdd = async (property) => {
    try {
      const created = await createProperty({ ...property, model_id: selectedModelId });
      onPropertyAdded && onPropertyAdded(created);
      setShowAdd(false);
    } catch (err) {
      alert("Failed to add property: " + err.message);
    }
  };

  const handleEdit = async (property) => {
    try {
      const updated = await updateProperty(property);
      onPropertyUpdated && onPropertyUpdated(updated);
      setShowEdit(false);
      setEditProperty(null);
    } catch (err) {
      alert("Failed to update property: " + err.message);
    }
  };

  return (
    <>
      {showAdd && (
        <AddPropertyForm
          onSubmit={handleAdd}
          onCancel={() => setShowAdd(false)}
        />
      )}
      {showEdit && editProperty && (
        <EditPropertyForm
          property={editProperty}
          onSave={handleEdit}
          onCancel={() => {
            setShowEdit(false);
            setEditProperty(null);
          }}
        />
      )}
      {/* Expose controls to parent via render props or context if needed */}
      {/* Or export setShowAdd/setShowEdit/setEditProperty as needed */}
    </>
  );
}