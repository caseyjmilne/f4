import { useFieldTypeList } from "../../context/FieldTypeListContext";
import Label from "../fields/Label";
import Select from "../fields/Select";
import FieldGroup from "../fields/FieldGroup";

export default function TypeSetting({ value, onChange }) {
  
  const fieldTypeList = useFieldTypeList();

  return (
    <FieldGroup>
      <Label htmlFor="property-type" className="f4-new-model-form__field-label">
        Type
      </Label>
      <Select
        id="property-type"
        value={value || ""}
        onChange={onChange}
        options={fieldTypeList}
      />
    </FieldGroup>
  );
}