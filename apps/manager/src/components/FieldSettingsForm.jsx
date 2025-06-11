import Choices from "./settings/Choices";
import { Tabs } from "./ux/tabs/Tabs";
import { TabList } from "./ux/tabs/TabList";
import { Tab } from "./ux/tabs/Tab";
import { TabPanel } from "./ux/tabs/TabPanel";

function FieldSettingsForm({ settings, fieldSettings, onChange }) {

  const handleChange = (field, value) => {

    console.log('handling change')
    console.log('field: ' + field )
    console.log('value:')
    console.log(value)

    onChange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      {fieldSettings.includes('prepend') && (
        <div className="f4-new-model-form__field-group">
          <label htmlFor="setting-prepend" className="f4-new-model-form__field-label">
            <strong>Prepend</strong>
          </label>
          <input
            id="setting-prepend"
            type="text"
            className="f4-form__field-input"
            value={settings.prepend || ''}
            onChange={e => handleChange('prepend', e.target.value)}
          />
        </div>
      )}

      {fieldSettings.includes('append') && (
        <div className="f4-new-model-form__field-group">
          <label htmlFor="setting-append" className="f4-new-model-form__field-label">
            <strong>Append</strong>
          </label>
          <input
            id="setting-append"
            type="text"
            className="f4-form__field-input"
            value={settings.append || ''}
            onChange={e => handleChange('append', e.target.value)}
          />
        </div>
      )}

      {fieldSettings.includes('placeholder') && (
        <div className="f4-new-model-form__field-group">
          <label htmlFor="setting-placeholder" className="f4-new-model-form__field-label">
            <strong>Placeholder</strong>
          </label>
          <input
            id="setting-placeholder"
            type="text"
            className="f4-form__field-input"
            value={settings.placeholder || ''}
            onChange={e => handleChange('placeholder', e.target.value)}
          />
        </div>
      )}

      {fieldSettings.includes('rows') && (
        <div className="f4-new-model-form__field-group">
          <label htmlFor="setting-rows" className="f4-new-model-form__field-label">
            <strong>Rows</strong>
          </label>
          <input
            id="setting-rows"
            type="number"
            min="1"
            className="f4-form__field-input"
            value={settings.rows || ''}
            onChange={e => handleChange('rows', e.target.value)}
          />
        </div>
      )}

      {fieldSettings.includes('maxLength') && (
        <div className="f4-new-model-form__field-group">
          <label htmlFor="setting-maxLength" className="f4-new-model-form__field-label">
            <strong>Max Length</strong>
          </label>
          <input
            id="setting-maxLength"
            type="number"
            min="1"
            className="f4-form__field-input"
            value={settings.maxLength || ''}
            onChange={e => handleChange('maxLength', e.target.value)}
          />
        </div>
      )}

      {fieldSettings.includes('choices') && (
        <div className="f4-new-model-form__field-group">
          <label className="f4-new-model-form__field-label">
            <strong>Choices</strong>
          </label>
          <Choices
            choices={settings.choices || []}
            onChange={choices => handleChange('choices', choices)}
          />
        </div>
      )}

      <Tabs defaultIndex={0}>
        <TabList>
          <Tab index={0}>Overview</Tab>
          <Tab index={1}>Settings</Tab>
          <Tab index={2}>Logs</Tab>
        </TabList>
        <TabPanel index={0}>This is the Overview content.</TabPanel>
        <TabPanel index={1}>This is the Settings content.</TabPanel>
        <TabPanel index={2}>This is the Logs content.</TabPanel>
      </Tabs>

    </>
  );
}

export default FieldSettingsForm;
