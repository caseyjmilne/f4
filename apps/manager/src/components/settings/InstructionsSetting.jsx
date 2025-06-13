import TextArea from "../fields/TextArea";

export default function InstructionsSetting({ value, onChange, fieldSettings }) {
  if (!fieldSettings?.includes('instructions')) return null;
  return (
    <TextArea
      id="setting-instructions"
      label="Instructions"
      value={value}
      onChange={onChange}
    />
  );
}