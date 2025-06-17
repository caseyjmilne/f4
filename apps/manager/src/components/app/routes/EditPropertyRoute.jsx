import { useParams, useNavigate } from 'react-router-dom';
import { usePropertyContext } from '../../../context/PropertyContext';
import PropertyForm from '../../property/PropertyForm';

export default function EditPropertyRoute() {
  const { modelId, propertyId } = useParams();
  const navigate = useNavigate();
  const { properties, updatePropertyItem } = usePropertyContext();

  const property = properties.find((p) => p.id === parseInt(propertyId, 10));

  if (!property) return <p>Property not found</p>;

  return (
    <PropertyForm
      key={property.id}
      property={property}
      parentId={property.parent_id ?? 0}
      modelId={parseInt(modelId, 10)}
      mode="edit"
      onSave={async (updatedProperty) => {
        await updatePropertyItem(updatedProperty);
        navigate(`/model/${modelId}`);
      }}
      onCancel={() => navigate(`/model/${modelId}`)}
    />
  );
}
