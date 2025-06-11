import { useContext } from "react";
import { TabsContext } from "./Tabs";

export function Tab({ children, index }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const isActive = activeIndex === index;

  return (
    <button
      type="button"
      onClick={() => setActiveIndex(index)}
      className={`tabs__tab${isActive ? " tabs__tab--active" : ""}`}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  );
}