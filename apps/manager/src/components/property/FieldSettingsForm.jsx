import GeneralSettingsTab from "./GeneralSettingsTab";
import ValidationSettingsTab from "./ValidationSettingsTab";
import PresentationSettingsTab from "./PresentationSettingsTab";
import ConditionalLogicSettingsTab from "./ConditionalLogicSettingsTab";
import { Tabs } from "../ux/tabs/Tabs";
import { TabList } from "../ux/tabs/TabList";
import { Tab } from "../ux/tabs/Tab";
import { TabPanel } from "../ux/tabs/TabPanel";

function FieldSettingsForm({ settings, fieldSettings, onChange }) {
  const handleChange = (field, value) => {
    onChange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Tabs defaultIndex={0}>
      <TabList>
        <Tab index={0}>General</Tab>
        <Tab index={1}>Validation</Tab>
        <Tab index={2}>Presentation</Tab>
        <Tab index={3}>Conditions</Tab>
      </TabList>
      <TabPanel index={0}>
        <GeneralSettingsTab
          settings={settings}
          fieldSettings={fieldSettings}
          handleChange={(field, value) => {
            if (["type", "name", "key"].includes(field)) {
              onMainChange(field, value);
            } else {
              onSettingsChange(settings => ({ ...settings, [field]: value }));
            }
          }}
        />
      </TabPanel>
      <TabPanel index={1}>
        <ValidationSettingsTab
          settings={settings}
          fieldSettings={fieldSettings}
          handleChange={handleChange}
        />
      </TabPanel>
      <TabPanel index={2}>
        <PresentationSettingsTab
          settings={settings}
          fieldSettings={fieldSettings}
          handleChange={handleChange}
        />
      </TabPanel>
      <TabPanel index={3}>
        <ConditionalLogicSettingsTab
          settings={settings}
          fieldSettings={fieldSettings}
          handleChange={handleChange}
        />
      </TabPanel>
    </Tabs>
  );
}

export default FieldSettingsForm;
