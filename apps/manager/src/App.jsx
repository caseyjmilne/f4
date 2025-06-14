import { useState, useEffect } from 'react';
import ModelForm from './components/model/ModelForm';
import ModelList from './components/ModelList';
import AppHeader from './components/AppHeader';
import ModelProperties from './components/ModelProperties';
import ModelDetails from './components/ModelDetails';
import Modal from './components/ux/modal/Modal';
import AppWrap from './components/AppWrap';
import {
  fetchModels as fetchModelsFromApi,
  deleteModel as deleteModelFromApi,
  updateModel,
  createModel as createModelFromApi
} from './api/models';
import { FieldTypeListProvider } from "./context/FieldTypeListContext";
import PropertyForm from "./components/property/PropertyForm";
import { updateProperty as updatePropertyApi } from './api/properties';

function App() {
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(0);
  const [showAddModelForm, setShowAddModelForm] = useState(false);
  const [showEditModelForm, setShowEditModelForm] = useState(false);
  const [properties, setProperties] = useState([]);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [editProperty, setEditProperty] = useState(null);

  const loadModels = () => {
    fetchModelsFromApi().then(setModels);
  };

  useEffect(() => {
    loadModels();
  }, []);

  const handlePropertyAdded = (property) => {
    setProperties(prev => [...prev, property]);
  };
  const handlePropertyUpdated = async (updated) => {
    try {
      const saved = await updatePropertyApi(updated);
      setProperties(prev => prev.map(p => (p.id === saved.id ? saved : p)));
    } catch (err) {
      alert('Failed to update property: ' + err.message);
    }
  };

  const handleCreateModel = async (form) => {

    try {
      await createModelFromApi(form);
      loadModels();
      setShowAddModelForm(false);
    } catch (err) {
      alert('Failed to create model: ' + err.message);
    }
  };

  const handleEditModel = async (updatedModel) => {
    try {
      await updateModel(updatedModel);
      loadModels();
      setShowEditModelForm(false);
    } catch (err) {
      alert('Failed to update model: ' + err.message);
    }
  };

  return (
    <FieldTypeListProvider>
      <AppWrap>
        <AppHeader
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
            <ModelForm
              onSubmit={handleCreateModel}
              onCancel={() => setShowAddModelForm(false)}
              submitLabel="Add Model"
              title="Add Model"
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

            <ModelProperties 
              selectedModelId={selectedModelId} 
              properties={properties} 
              setProperties={setProperties} 
              onAddPropertyClick={() => setShowAddProperty(true)}
              onEditPropertyClick={property => setEditProperty(property)}
            />
          </>
        )}

        {showEditModelForm && (
          <Modal isOpen={showEditModelForm} onClose={() => setShowEditModelForm(false)}>
            <ModelForm
              initialValues={models.find((m) => m.id === selectedModelId) || {}}
              onSubmit={handleEditModel}
              onCancel={() => setShowEditModelForm(false)}
              submitLabel="Save"
              title="Edit Model"
            />
          </Modal>
        )}

        {(showAddProperty || editProperty) && (
          <PropertyForm
            key={editProperty ? editProperty.id : "add"}
            parentId={selectedModelId}
            property={editProperty}
            mode={editProperty ? "edit" : "add"}
            onSave={editProperty ? (updated => {
              handlePropertyUpdated(updated);
              setEditProperty(null);
            }) : (added => {
              handlePropertyAdded(added);
              setShowAddProperty(false);
            })}
            onCancel={() => {
              setEditProperty(null);
              setShowAddProperty(false);
            }}
          />
        )}
      </AppWrap>
    </FieldTypeListProvider>
  );
}

export default App;
