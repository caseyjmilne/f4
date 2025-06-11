import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchFieldTypes } from "../api/field";

const FieldTypeListContext = createContext([]);

export function FieldTypeListProvider({ children }) {
  const [fieldTypeList, setFieldTypeList] = useState([]);

  useEffect(() => {
    fetchFieldTypes()
      .then(setFieldTypeList)
      .catch(() => setFieldTypeList([{ label: "Text", value: "text" }]));
  }, []);

  return (
    <FieldTypeListContext.Provider value={fieldTypeList}>
      {children}
    </FieldTypeListContext.Provider>
  );
}

export function useFieldTypeList() {
  return useContext(FieldTypeListContext);
}