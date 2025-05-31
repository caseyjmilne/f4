import { useState, useEffect } from 'react';
import NewModelForm from './components/NewModelForm';
import ModelList from './components/ModelList';
import ModelHeader from './components/ModelHeader';
import ModelProperties from './components/ModelProperties';
import ModelDetails from './components/ModelDetails';
import { fetchModels as fetchModelsFromApi } from './api/models';
import { deleteModel as deleteModelFromApi } from './api/models';

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
        <>
          <ModelDetails
            model={models.find((m) => m.id === selectedModelId)}
            onDelete={async (id) => {
              try {
                await deleteModelFromApi(id);
                setSelectedModelId(0); // clear selection
                loadModels();          // reload remaining models
              } catch (err) {
                alert('Failed to delete model: ' + err.message);
              }
            }}
          />

          <ModelProperties selectedModelId={selectedModelId} />
        </>
      )}
      
    </div>
  );
}

export default App;
