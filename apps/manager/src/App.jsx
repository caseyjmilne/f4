import { useState, useEffect } from 'react';
import ModelProperties from './ModelProperties';  // new component for properties
import './App.css';

function App() {
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(null);

  // Fetch models from your WP REST API
  useEffect(() => {
    fetch('http://test1.local/wp-json/custom/v1/model')
      .then(res => res.json())
      .then(data => {
        setModels(data);
        if (data.length > 0) setSelectedModelId(data[0].id); // auto-select first model
      })
      .catch(err => console.error('Failed to load models:', err));
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
