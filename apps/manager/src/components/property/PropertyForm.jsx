import { useState, useEffect } from 'react';
import Modal from '../ux/modal/Modal';
import FieldSettingsForm from './FieldSettingsForm';
import { fetchFieldTypes, fetchFieldTypeDetails } from '../../api/field';
import FormFooter from '../form/FormFooter';

export default function PropertyForm({
  property = null,
  parentId = 0,
  onSave,
  onCancel,
  mode = "add" // "add" or "edit"
}) {
  // If editing, start with property data, else start with blank
  const [formData, setFormData] = useState(
    property
      ? { ...property, settings: { ...(property.settings || {}) } }
      : { type: "text", name: "", key: "", settings: {} }
  );
  const [fieldOptions, setFieldOptions] = useState([]);
  const [fieldSettings, setFieldSettings] = useState([]);

  // Load field type options (for edit, if needed)
  useEffect(() => {
    fetchFieldTypes?.()
      .then(setFieldOptions)
      .catch(() => setFieldOptions([{ label: 'Text', value: 'text' }]));
  }, []);

  // When property changes (edit mode), update formData
  useEffect(() => {
    if (property) {
      setFormData({ ...property, settings: { ...(property.settings || {}) } });
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
    // eslint-disable-next-line
  }, [formData.type]);

  // Handle changes to main fields (type, name, key)
  const handleMainChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle changes to settings fields
  const handleSettingsChange = updater => {
    setFormData(prev => {
      const newSettings =
        typeof updater === 'function'
          ? updater(prev.settings || {})
          : updater;
      return {
        ...prev,
        settings: { ...prev.settings, ...newSettings }
      };
    });
  };

  // Handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if (mode === "edit") {
      onSave(formData);
    } else {
      onSave({
        key: formData.key,
        name: formData.name,
        type: formData.type,
        settings: formData.settings,
        parent_id: parentId
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
          submitLabel={mode === "edit" ? "Save" : "Add Property"}
        />
      }
    >
      <div className="f4-form">
        <form onSubmit={handleSubmit} className="f4-form__form-wrap">
          {/* Optionally, you can add type/name/key fields here if needed */}
          <FieldSettingsForm
            settings={formData.settings || {}}
            fieldSettings={fieldSettings}
            onChange={handleSettingsChange}
          />
        </form>
      </div>
    </Modal>
  );
}