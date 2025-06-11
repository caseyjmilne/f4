import { useContext } from "react";
import { TabsContext } from "./Tabs";

export function TabPanel({ children, index }) {
  const { activeIndex } = useContext(TabsContext);
  if (activeIndex !== index) return null;

  return (
    <div role="tabpanel" className="tabs__panel">
      {children}
    </div>
  );
}