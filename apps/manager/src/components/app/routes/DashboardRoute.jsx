import { useNavigate } from 'react-router-dom';
import { useModelContext } from '../../../context/ModelContext';
import ModelList from '../../model/ModelList';

export default function DashboardRoute() {
  const { models, selectedModelId, setSelectedModelId } = useModelContext();
  const navigate = useNavigate();

  return (
    <ModelList
      models={models}
      selectedModelId={selectedModelId}
      onSelect={(id) => {
        setSelectedModelId(id);
        navigate(`/model/${id}`);
      }}
    />
  );
}
