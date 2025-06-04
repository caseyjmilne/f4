
# Field Type Optional Settings in F4 Plugin

## ✅ Current Implementation

The F4 plugin architecture now supports optional field-specific settings through a dynamic mechanism coordinated between the backend (PHP) and frontend (React).

### 🧱 Backend (PHP)
Each field type extends the `F4\Field\BaseField` class and can optionally override methods like:
- `supportsSettingAppend()`
- `supportsSettingPrepend()`
- `supportsSettingPlaceholder()`
- `supportsSettingRows()`
- `supportsSettingMaxLength()`

These methods return `true` if the field type supports a given setting.

The REST API endpoint `/wp-json/f4/v1/field/{type}` returns a JSON object like:

```json
{
  "type": "textarea",
  "class": "F4\\Field\\FieldType\\TextareaField",
  "label": "Textarea",
  "supports": {
    "append": false,
    "prepend": false,
    "placeholder": false,
    "rows": true,
    "maxLength": false
  }
}
```

This enables the frontend to conditionally render settings fields.

### 🎨 Frontend (React)
In `AddPropertyForm.js`, we read the field type's supported settings and conditionally render appropriate inputs (e.g., `prepend`, `append`, `placeholder`, `rows`, `maxLength`).

The logic is driven by the dynamic `fieldSettings` object derived from the REST API.

Example:
```js
{fieldSettings.rows && (
  <input
    id="setting-rows"
    type="number"
    value={settings.rows || ''}
    onChange={e => handleSettingChange('rows', e.target.value)}
  />
)}
```

---

## 🔮 Future Plans and Considerations

### 🧠 Pushing Unique Settings from Field Types
While current support is boolean-based per setting, some field types may eventually need to **push in complex or custom-defined settings structures**.

#### Example Case: `TextareaField`
- The `rows` setting is uniquely relevant to `textarea`, and its inclusion in the shared interface is arguable.
- Instead, `TextareaField` could push a custom settings schema or fields to the frontend dynamically.

#### Proposed Mechanism
- Define a new method in `BaseField`:
```php
public static function customSettings(): array {
    return [];
}
```
- This method could return a schema or render configuration that the frontend interprets.
- The API endpoint would expose this under a new key, e.g., `"customSettings"`.

#### Benefits
- Allows complex UI settings to be defined per field type.
- Decouples frontend logic from hardcoded conditionals.
- Enables extensibility without bloating the base class with too many boolean methods.

---

## 🧩 Conclusion
The current system is robust for standardized settings. For non-standard or custom behaviors, introducing a structured way for field types to define their own settings dynamically will be key to future extensibility.
