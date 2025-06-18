import { useState, useEffect, useRef } from 'react';
import Modal from '../ux/modal/Modal';
import FieldSettingsForm from './FieldSettingsForm';
import { fetchFieldTypeDetails } from '../../api/field';
import FormFooter from '../form/FormFooter';
import { propertySchema } from "./propertySchema";

const DEFAULT_FORM_DATA = {
  type: "text",
  name: "",
  key: "",
  settings: {},
};

export default function PropertyForm({
  property = null,
  parentId = 0,
  modelId = 0,
  onSave,
  onCancel,
  mode = "add"
}) {

  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [fieldSettings, setFieldSettings] = useState([]);
  const [errors, setErrors] = useState([]);
  const formRef = useRef();

  // When property changes (edit mode), update formData
  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        settings: { ...(property.settings || {}) }
      });
    }
  }, [property]);

  // When type changes, fetch supported settings and patch formData.settings
  useEffect(() => {
    const type = formData.type || "text";
    fetchFieldTypeDetails(type)
      .then(data => {
        const supported = Array.isArray(data.supportedSettings) ? data.supportedSettings : [];
        setFieldSettings(supported);

        // Patch settings to ensure all supported keys exist
        setFormData(prev => {
          const currentSettings = prev.settings || {};
          const patchedSettings = { ...currentSettings };
          for (const setting of supported) {
            if (!(setting in patchedSettings)) {
              patchedSettings[setting] = '';
            }
          }
          return { ...prev, settings: patchedSettings, type };
        });
      })
      .catch(() => {
        setFieldSettings([]);
      });
  }, [formData.type]);

  // Handle changes to main fields (type, name, key)
  const handleMainChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle changes to settings fields
  const handleSettingsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [field]: value
      }
    }));
  };

  // Handle submit
  const handleSubmit = e => {
    e.preventDefault();
    const result = propertySchema.safeParse(formData);
    if (!result.success) {
      // Gather all error messages
      const errorList = result.error.errors.map(err => err.message);
      setErrors(errorList);
      return;
    }
    setErrors([]);
    if (mode === "edit") {
      onSave(formData);
    } else {
      onSave({
        key: formData.key,
        name: formData.name,
        type: formData.type,
        settings: formData.settings,
        parent_id: parentId,
        model_id: modelId
      });
      setFormData({ type: "text", name: "", key: "", settings: {} });
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={mode === "edit" ? "Edit Property" : "Add Property"}
      footer={
        <FormFooter
          onCancel={onCancel}
          submitLabel={mode === "edit" ? "Save Property" : "Add Property"}
          onSubmit={handleSubmit}
        />
      }
    >
      <div className="f4-form">
        {errors.length > 0 && (
          <div className="f4-form-errors" style={{ color: "red", marginBottom: "1em" }}>
            <ul>
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <form ref={formRef} onSubmit={handleSubmit} className="f4-form__form-wrap">
          <FieldSettingsForm
            formData={formData}
            fieldSettings={fieldSettings}
            onMainChange={handleMainChange}
            onSettingsChange={handleSettingsChange}
          />
        </form>
      </div>
    </Modal>
  );
}