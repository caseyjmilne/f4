import { createContext, useContext, useState } from "react";
import { createProperty, updateProperty } from "../api/properties";

const PropertyContext = createContext();

export function usePropertyContext() {
  return useContext(PropertyContext);
}

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);

  const addProperty = async (property) => {
    const created = await createProperty(property);
    setProperties((prev) => [...prev, created]);
  };

  const updatePropertyItem = async (updated) => {
    const saved = await updateProperty(updated);
    setProperties((prev) =>
      prev.map((p) => (p.id === saved.id ? saved : p))
    );
  };

  return (
    <PropertyContext.Provider
      value={{ properties, setProperties, addProperty, updatePropertyItem }}
    >
      {children}
    </PropertyContext.Provider>
  );
}
