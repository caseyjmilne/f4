import { useState, useEffect } from 'react';
import NewModelForm from './components/NewModelForm';
import ModelList from './components/ModelList';
import ModelHeader from './components/ModelHeader';
import ModelProperties from './components/ModelProperties';
import ModelDetails from './components/ModelDetails';
import Modal from './components/Modal';
import EditModelForm from './components/EditModelForm';
import {
  fetchModels as fetchModelsFromApi,
  deleteModel as deleteModelFromApi,
  updateModel
} from './api/models';

function App() {
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(0);
  const [showNewModelForm, setShowNewModelForm] = useState(false);
  const [showEditModelForm, setShowEditModelForm] = useState(false);

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
        <Modal isOpen={showNewModelForm} onClose={() => setShowNewModelForm(false)}>
          <NewModelForm
            onModelAdded={() => {
              loadModels();
              setShowNewModelForm(false);
            }}
            onCancel={() => setShowNewModelForm(false)}
          />
        </Modal>
      )}

      {selectedModelId !== 0 && (
        <>
          <ModelDetails
            model={models.find((m) => m.id === selectedModelId)}
            onDelete={async (id) => {
              try {
                await deleteModelFromApi(id);
                setSelectedModelId(0);
                loadModels();
              } catch (err) {
                alert('Failed to delete model: ' + err.message);
              }
            }}
            onEditClick={() => setShowEditModelForm(true)}  // <-- moved here
          />

          <ModelProperties selectedModelId={selectedModelId} />
        </>
      )}

      {showEditModelForm && (
        <Modal isOpen={showEditModelForm} onClose={() => setShowEditModelForm(false)}>
          <EditModelForm
            model={models.find((m) => m.id === selectedModelId)}
            onSave={async (updatedModel) => {
              try {
                await updateModel(updatedModel);
                loadModels();
                setShowEditModelForm(false);
              } catch (err) {
                alert('Failed to update model: ' + err.message);
              }
            }}
            onCancel={() => setShowEditModelForm(false)}
          />
        </Modal>
      )}
      
    </div>
  );
}

export default App;
