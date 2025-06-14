import GeneralSettingsTab from "./GeneralSettingsTab";
import ValidationSettingsTab from "./ValidationSettingsTab";
import PresentationSettingsTab from "./PresentationSettingsTab";
import ConditionalLogicSettingsTab from "./ConditionalLogicSettingsTab";
import { Tabs } from "../ux/tabs/Tabs";
import { TabList } from "../ux/tabs/TabList";
import { Tab } from "../ux/tabs/Tab";
import { TabPanel } from "../ux/tabs/TabPanel";

function FieldSettingsForm({ formData, fieldSettings, onMainChange, onSettingsChange }) {

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
          formData={formData}
          settings={formData.settings}
          fieldSettings={fieldSettings}
          onMainChange={onMainChange}
          onSettingsChange={onSettingsChange}
        />
      </TabPanel>
      <TabPanel index={1}>
        <ValidationSettingsTab
          settings={formData.settings}
          fieldSettings={fieldSettings}
          onSettingsChange={onSettingsChange}
        />
      </TabPanel>
      <TabPanel index={2}>
        <PresentationSettingsTab
          settings={formData.settings}
          fieldSettings={fieldSettings}
          onSettingsChange={onSettingsChange}
        />
      </TabPanel>
      <TabPanel index={3}>
        <ConditionalLogicSettingsTab
          settings={formData.settings}
          fieldSettings={fieldSettings}
          onSettingsChange={onSettingsChange}
        />
      </TabPanel>
    </Tabs>
  );
}

export default FieldSettingsForm;
