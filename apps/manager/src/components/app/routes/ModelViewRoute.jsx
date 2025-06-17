import { useParams, useNavigate } from 'react-router-dom';
import { useModelContext } from '../../../context/ModelContext';
import { usePropertyContext } from '../../../context/PropertyContext';
import ModelDetails from '../../model/ModelDetails';
import ModelProperties from '../../model/ModelProperties';

export default function ModelViewRoute() {
  const { id } = useParams();
  const modelId = parseInt(id, 10);
  const navigate = useNavigate();

  const { models, deleteModel } = useModelContext();
  const { properties, setProperties } = usePropertyContext();

  const model = models.find((m) => m.id === modelId);

  if (!model) {
    return <p>Model not found.</p>;
  }

  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>
      <ModelDetails
        model={model}
        onDelete={async () => {
          await deleteModel(modelId);
          navigate('/'); // back to list after deletion
        }}
        onEditClick={() => navigate(`/edit/${modelId}`)}
      />
      <ModelProperties
        selectedModelId={modelId}
        properties={properties}
        setProperties={setProperties}
        onAddPropertyClick={() => navigate(`/model/${modelId}/add-property`)}
        onEditPropertyClick={(property) => navigate(`/model/${modelId}/edit-property/${property.id}`)}
      />
    </>
  );
}
