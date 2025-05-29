import { useState, useEffect } from 'react';
import ModelProperties from './ModelProperties';
import NewModelForm from './components/NewModelForm';

function App() {
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(null);

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
      <h2>Models</h2>
      <ul>
        {models.map(model => (
          <li key={model.id}>
            <button
              style={{ fontWeight: model.id === selectedModelId ? 'bold' : 'normal' }}
              onClick={() => setSelectedModelId(model.id)}
            >
              {model.name}
            </button>
          </li>
        ))}
      </ul>

      <NewModelForm onModelAdded={fetchModels} />

      {selectedModelId && (
        <>
          <h3>Properties for Model ID: {selectedModelId}</h3>
          <ModelProperties modelId={selectedModelId} />
        </>
      )}
    </>
  );
}

export default App;
