import { useState, useEffect } from 'react';
import NewModelForm from './components/NewModelForm';
import ModelList from './components/ModelList';
import ModelHeader from './components/ModelHeader';
import ModelProperties from './components/ModelProperties';

import { fetchModels as fetchModelsFromApi } from './api/models';

function App() {
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(0);
  const [showNewModelForm, setShowNewModelForm] = useState(false);

  const loadModels = () => {
    fetchModelsFromApi().then(setModels);
  };

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div className="f4-admin">

      <ModelHeader 
        setShowForm={setShowNewModelForm} 
        setSelectedModelId={setSelectedModelId} 
      />

      <ModelList
        models={models}
        selectedModelId={selectedModelId}
        onSelect={(id) => {
          setSelectedModelId(id);
          setShowNewModelForm(false); // clear form when selecting
        }}
      />

      {showNewModelForm && (
        <NewModelForm
          onModelAdded={() => {
            loadModels();
            setShowNewModelForm(false);
          }}
        />
      )}

      {selectedModelId !== 0 && (
        <ModelProperties selectedModelId={selectedModelId} />
      )}
      
    </div>
  );
}

export default App;
