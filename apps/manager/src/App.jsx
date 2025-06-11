import { useState, useEffect } from 'react';
import AddModelForm from './components/AddModelForm';
import ModelList from './components/ModelList';
import ModelHeader from './components/ModelHeader';
import ModelProperties from './components/ModelProperties';
import ModelDetails from './components/ModelDetails';
import Modal from './components/Modal';
import EditModelForm from './components/EditModelForm';
import AppWrap from './components/AppWrap';
import {
  fetchModels as fetchModelsFromApi,
  deleteModel as deleteModelFromApi,
  updateModel
} from './api/models';
import { FieldTypeListProvider } from "./context/FieldTypeListContext";

function App() {
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(0);
  const [showAddModelForm, setShowAddModelForm] = useState(false);
  const [showEditModelForm, setShowEditModelForm] = useState(false);

  const loadModels = () => {
    fetchModelsFromApi().then(setModels);
  };

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <FieldTypeListProvider>
      <AppWrap>
        <ModelHeader 
          setShowForm={setShowAddModelForm} 
          setSelectedModelId={setSelectedModelId} 
        />

        <ModelList
          models={models}
          selectedModelId={selectedModelId}
          onSelect={(id) => {
            setSelectedModelId(id);
            setShowAddModelForm(false); // clear form when selecting
          }}
        />

        {showAddModelForm && (
          <Modal isOpen={showAddModelForm} onClose={() => setShowAddModelForm(false)}>
            <AddModelForm
              onModelAdded={() => {
                loadModels();
                setShowAddModelForm(false);
              }}
              onCancel={() => setShowAddModelForm(false)}
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
              onEditClick={() => setShowEditModelForm(true)}
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
      </AppWrap>
    </FieldTypeListProvider>
  );
}

export default App;
