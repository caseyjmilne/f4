import { useEffect, useState } from 'react';
import Modal from './Modal';
import FieldSettingsForm from './FieldSettingsForm';
import { fetchFieldTypeDetails } from '../api/field';
import FormFooter from './form/FormFooter';

function AddPropertyForm({ parentId = 0, onSubmit, onCancel }) {

  const [fieldSettings, setFieldSettings] = useState([]);
  const [settings, setSettings] = useState({ type: "text" }); // Set default type to "text"

  useEffect(() => {
    if (!settings.type) return;

    fetchFieldTypeDetails(settings.type)
      .then(data => {
        const supported = Array.isArray(data.supportedSettings) ? data.supportedSettings : [];
        setFieldSettings(supported);

        // Preserve type, name, key
        const newSettings = {
          type: settings.type || "text",
          name: settings.name || "",
          key: settings.key || ""
        };
        for (const setting of supported) {
          if (!(setting in newSettings)) {
            newSettings[setting] = '';
          }
        }
        setSettings(newSettings);
      })
      .catch(err => {
        console.error('Failed to load field settings', err);
        setFieldSettings([]);
        setSettings({ type: "text" }); // Reset to default type on error
      });
  }, [settings.type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      key: settings.key, 
      name: settings.name, 
      type: settings.type, 
      settings, 
      parent_id: parentId 
    });
    setSettings({});
  };

  return (
    <Modal isOpen={true} onClose={onCancel}>
      <div className="f4-new-model-form">
        <h4 className="f4-new-model-form__form-title">Add Property</h4>
        <form onSubmit={handleSubmit} className="f4-new-model-form__form-wrap">

          <FieldSettingsForm
            settings={settings}
            fieldSettings={fieldSettings}
            onChange={setSettings}
          />

          <FormFooter onCancel={onCancel} submitLabel="Add Property" />
        </form>
      </div>
    </Modal>
  );
}

export default AddPropertyForm;
