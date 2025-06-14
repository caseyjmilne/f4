import { useState } from "react";

export default function useModalManager() {
  const [showAddModelForm, setShowAddModelForm] = useState(false);
  const [showEditModelForm, setShowEditModelForm] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [editProperty, setEditProperty] = useState(null);

  return {
    showAddModelForm, setShowAddModelForm,
    showEditModelForm, setShowEditModelForm,
    showAddProperty, setShowAddProperty,
    editProperty, setEditProperty
  };
}
