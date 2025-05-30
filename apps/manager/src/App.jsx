import { useState, useEffect } from 'react';
import ModelProperties from './components/ModelProperties';
import NewModelForm from './components/NewModelForm';
import ModelList from './components/ModelList';
import ModelHeader from './components/ModelHeader';

function App() {

  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [showForm, setShowForm] = useState(false);


  const fetchModels = () => {
    fetch('http://test1.local/wp-json/custom/v1/model')
      .then(res => res.json())
      .then(data => {
        setModels(data);
        if (data.length > 0 && !selectedModelId) {
          setSelectedModelId(data[0].id);
        }
      })
      .catch(err => console.error('Failed to load models:', err));
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <>
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
              fetchModels();
              setShowForm(false);
            }}
          />
        )}

        {selectedModelId && (
          <>
            <header class="model-properties-header">
              <h3>Model Properties</h3>
              <p>For Model ID {selectedModelId}</p>
              <button class="f4-add-property-button">
                + Property
              </button>
            </header>
            <ModelProperties modelId={selectedModelId} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
