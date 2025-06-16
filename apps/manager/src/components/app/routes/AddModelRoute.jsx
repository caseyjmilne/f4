import { useNavigate } from 'react-router-dom';
import Modal from '../../ux/modal/Modal';
import ModelForm from '../../model/ModelForm';
import { useModelContext } from '../../../context/ModelContext';

export default function AddModelRoute() {
  const navigate = useNavigate();
  const { createModel } = useModelContext();

  return (
    <Modal isOpen onClose={() => navigate(-1)}>
      <ModelForm
        onSubmit={async (model) => {
          await createModel(model);
          navigate(-1);
        }}
        onCancel={() => navigate(-1)}
        submitLabel="Add Model"
        title="Add Model"
      />
    </Modal>
  );
}
