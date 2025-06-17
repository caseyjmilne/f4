import { Routes, Route, useNavigate } from 'react-router-dom';
import EditModelRoute from './routes/EditModelRoute';
import AddModelRoute from './routes/AddModelRoute';
import ModelViewRoute from './routes/ModelViewRoute';
import AppWrap from './AppWrap';
import AppHeader from '../ux/app-header/AppHeader';
import Modal from '../ux/modal/Modal';
import ModelForm from '../model/ModelForm';
import ModelList from '../model/ModelList';
import ModelDetails from '../model/ModelDetails';
import ModelProperties from '../ModelProperties';
import PropertyForm from '../property/PropertyForm';
import { FieldTypeListProvider } from '../../context/FieldTypeListContext';
import { ModelProvider, useModelContext } from '../../context/ModelContext';
import { PropertyProvider, usePropertyContext } from '../../context/PropertyContext';
import useModalManager from '../../hooks/useModalManager';

function AppContent() {

  const navigate = useNavigate();

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
        setShowForm={() => navigate('/add')}
        setSelectedModelId={setSelectedModelId}
      />

      <ModelList
        models={models}
        selectedModelId={selectedModelId}
        onSelect={(id) => {
          navigate(`/model/${id}`);
        }}
      />

      <Routes>
        <Route path="/add" element={<AddModelRoute />} />
        <Route path="/edit/:id" element={<EditModelRoute />} />
        <Route path="/model/:id" element={<ModelViewRoute />} />
      </Routes>

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