import { Routes, Route, useNavigate } from 'react-router-dom';
import EditModelRoute from './routes/EditModelRoute';
import AddModelRoute from './routes/AddModelRoute';
import ModelViewRoute from './routes/ModelViewRoute';
import AddPropertyRoute from './routes/AddPropertyRoute';
import EditPropertyRoute from './routes/EditPropertyRoute';
import DashboardRoute from './routes/DashboardRoute';
import AppWrap from './AppWrap';
import AppHeader from '../ux/app-header/AppHeader';
import { FieldTypeListProvider } from '../../context/FieldTypeListContext';
import { ModelProvider, useModelContext } from '../../context/ModelContext';
import { PropertyProvider } from '../../context/PropertyContext';
import PracticeFormRoute from './routes/PracticeFormRoute';
import ViewSchemaRoute from './routes/ViewSchemaRoute';

function AppContent() {
  const navigate = useNavigate();
  const { setSelectedModelId } = useModelContext();

  return (
    <AppWrap>
      <AppHeader
        setShowForm={() => navigate('/add')}
        setSelectedModelId={setSelectedModelId}
      />

      <Routes>
        <Route path="/" element={<DashboardRoute />} />
        <Route path="/add" element={<AddModelRoute />} />
        <Route path="/edit/:id" element={<EditModelRoute />} />
        <Route path="/model/:id" element={<ModelViewRoute />} />
        <Route path="/model/:modelId/add-property" element={<AddPropertyRoute />} />
        <Route path="/model/:modelId/edit-property/:propertyId" element={<EditPropertyRoute />} />
        <Route path="/form" element={<PracticeFormRoute />} />
        <Route path="/schema" element={<ViewSchemaRoute />} />
      </Routes>
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
