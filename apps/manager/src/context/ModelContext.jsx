import { createContext, useState, useEffect, useContext } from "react";
import { fetchModels, deleteModel, updateModel, createModel } from "../api/models";

const ModelContext = createContext();

export function useModelContext() {
  return useContext(ModelContext);
}

export function ModelProvider({ children }) {
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(0);

  const loadModels = () => fetchModels().then(setModels);

  useEffect(() => {
    loadModels();
  }, []);

  const value = {
    models,
    selectedModelId,
    setSelectedModelId,
    createModel: async (data) => {
      await createModel(data);
      loadModels();
    },
    updateModel: async (data) => {
      await updateModel(data);
      loadModels();
    },
    deleteModel: async (id) => {
      await deleteModel(id);
      setSelectedModelId(0);
      loadModels();
    },
  };

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>;
}
