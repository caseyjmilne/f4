import { useState, useEffect } from 'react';
import ModelProperties from './components/ModelProperties';
import NewModelForm from './components/NewModelForm';
import ModelList from './components/ModelList';
import ModelHeader from './components/ModelHeader';

import { fetchModels as fetchModelsFromApi } from './api/models';

function App() {
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadModels = () => {
    fetchModelsFromApi().then(setModels);
  };

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div className="f4-admin">
      <ModelHeader setShowForm={setShowForm} setSelectedModelId={setSelectedModelId} />

      <ModelList
        models={models}
        selectedModelId={selectedModelId}
        onSelect={setSelectedModelId}
      />

      {showForm && (
        <NewModelForm
          onModelAdded={() => {
            loadModels();
            setShowForm(false);
          }}
        />
      )}

      {selectedModelId && (
        <>
          <header className="model-properties-header">
            <h3>Model Properties</h3>
            <p>For Model ID {selectedModelId}</p>
            <button className="f4-add-property-button">
              + Property
            </button>
          </header>
          <ModelProperties modelId={selectedModelId} />
        </>
      )}
    </div>
  );
}

export default App;
