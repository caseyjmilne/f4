// components/app/routes/EditModelRoute.jsx
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../ux/modal/Modal';
import ModelForm from '../../model/ModelForm';
import { useModelContext } from '../../../context/ModelContext';

export default function EditModelRoute() {
  const { models, updateModel } = useModelContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const model = models.find((m) => m.id === parseInt(id, 10));
  if (!model) return null; // optional fallback UI

  return (
    <Modal isOpen onClose={() => navigate(-1)}>
      <ModelForm
        model={model}
        onSubmit={async (updatedModel) => {
          await updateModel(updatedModel);
          navigate(-1); // Close modal after saving
        }}
        onCancel={() => navigate(-1)}
        submitLabel="Save Changes"
        title="Edit Model"
      />
    </Modal>
  );
}
