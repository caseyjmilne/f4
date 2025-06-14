// App.jsx
import AppWrap from './components/AppWrap';
import AppHeader from './components/ux/app-header/AppHeader';
import Modal from './components/ux/modal/Modal';
import ModelForm from './components/model/ModelForm';
import ModelList from './components/ModelList';
import ModelDetails from './components/model/ModelDetails';
import ModelProperties from './components/ModelProperties';
import PropertyForm from './components/property/PropertyForm';
import { FieldTypeListProvider } from './context/FieldTypeListContext';
import { ModelProvider, useModelContext } from './context/ModelContext';
import { PropertyProvider, usePropertyContext } from './context/PropertyContext';
import useModalManager from './hooks/useModalManager';

function AppContent() {
  const {
    models,
    selectedModelId,
    setSelectedModelId,
    createModel,
    updateModel,
    deleteModel,
  } = useModelContext();

  const {
    properties,
    setProperties,
    addProperty,
    updatePropertyItem,
  } = usePropertyContext();

  const {
    showAddModelForm,
    setShowAddModelForm,
    showEditModelForm,
    setShowEditModelForm,
    showAddProperty,
    setShowAddProperty,
    editProperty,
    setEditProperty,
  } = useModalManager();

  return (
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
          setShowAddModelForm(false);
        }}
      />

      {showAddModelForm && (
        <Modal isOpen onClose={() => setShowAddModelForm(false)}>
          <ModelForm
            onSubmit={createModel}
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
            onDelete={deleteModel}
            onEditClick={() => setShowEditModelForm(true)}
          />
          <ModelProperties
            selectedModelId={selectedModelId}
            properties={properties}
            setProperties={setProperties}
            onAddPropertyClick={() => setShowAddProperty(true)}
            onEditPropertyClick={setEditProperty}
          />
        </>
      )}

      {showEditModelForm && (
        <Modal isOpen onClose={() => setShowEditModelForm(false)}>
          <ModelForm
            initialValues={models.find((m) => m.id === selectedModelId) || {}}
            onSubmit={updateModel}
            onCancel={() => setShowEditModelForm(false)}
            submitLabel="Save"
            title="Edit Model"
          />
        </Modal>
      )}

      {(showAddProperty || editProperty) && (
        <PropertyForm
          key={editProperty ? editProperty.id : 'add'}
          property={editProperty}
          parentId={editProperty?.parent_id ?? 0}
          modelId={selectedModelId}
          mode={editProperty ? 'edit' : 'add'}
          onSave={async (property) => {
            if (editProperty) {
              await updatePropertyItem(property);
              setEditProperty(null);
            } else {
              await addProperty(property);
              setShowAddProperty(false);
            }
          }}
          onCancel={() => {
            setEditProperty(null);
            setShowAddProperty(false);
          }}
        />
      )}
    </AppWrap>
  );
}

export default function App() {
  return (
    <FieldTypeListProvider>
      <ModelProvider>
        <PropertyProvider>
          <AppContent />
        </PropertyProvider>
      </ModelProvider>
    </FieldTypeListProvider>
  );
}