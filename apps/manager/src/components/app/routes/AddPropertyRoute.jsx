import { useParams, useNavigate } from 'react-router-dom';
import { usePropertyContext } from '../../../context/PropertyContext';
import PropertyForm from '../../property/PropertyForm';

export default function AddPropertyRoute() {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const { addProperty } = usePropertyContext();

  return (
    <PropertyForm
      key="add"
      modelId={parseInt(modelId, 10)}
      parentId={0}
      mode="add"
      onSave={async (property) => {
        await addProperty(property);
        navigate(`/model/${modelId}`);
      }}
      onCancel={() => navigate(`/model/${modelId}`)}
    />
  );
}
