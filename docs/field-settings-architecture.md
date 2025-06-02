# Field Settings System

This document outlines the architecture for supporting field settings in the F4 plugin. Each field type can declare which settings it supports, enabling flexible rendering, validation, and UI generation similar to Advanced Custom Fields (ACF).

---

## 🧱 Field Setting Principles

1. **Field types declare their supported settings.**
2. **Each setting has a central schema definition.**
3. **The admin UI dynamically builds the field settings interface.**
4. **Field rendering and saving logic is aware of declared settings.**

---

## ✅ Core Supported Field Settings

| Setting         | Description                                               |
|------------------|-----------------------------------------------------------|
| `default_value`  | Value used when no user value exists                      |
| `placeholder`    | Placeholder text shown in the input                       |
| `prepend`        | Text or HTML shown before the field input                 |
| `append`         | Text or HTML shown after the field input                  |
| `required`       | Boolean that marks the field as required                  |
| `min`, `max`     | For numeric/date fields – range limits                    |
| `step`           | Step value for number/date fields                         |
| `choices`        | Array of choices for select, radio, checkbox fields       |
| `multiple`       | Whether the field accepts multiple values                 |
| `rows`           | Visible height (in rows) for textarea fields              |

---

## 🧩 Example: Field Declares Supported Settings

```
class TextField extends BaseField {

    public static function getSupportedSettings(): array {
        return [
            'default_value',
            'placeholder',
            'prepend',
            'append',
            'required',
        ];
    }

    public function render() {
        $value = $this->getValue();
        $prepend = $this->settings['prepend'] ?? '';
        $append = $this->settings['append'] ?? '';
        echo "<p>{$prepend}<input type='text' value='{$value}' />{$append}</p>";
    }
}
```

---

## 🧩 Example: Global Setting Definitions

Each setting is defined in a centralized registry:

```
return [
    'default_value' => [
        'type' => 'string',
        'label' => 'Default Value',
    ],
    'prepend' => [
        'type' => 'string',
        'label' => 'Prepend Text',
    ],
    'append' => [
        'type' => 'string',
        'label' => 'Append Text',
    ],
    'required' => [
        'type' => 'boolean',
        'label' => 'Required',
    ],
];
```

---

## 💡 Benefits

- ✅ Cleaner and modular field types.
- ✅ Dynamic field editor UI based on settings.
- ✅ Easy validation of field configuration.
- ✅ Custom field types can easily opt in or extend settings.

---

## 🧩 Future Extensions

- Add `conditional_logic` support.
- Create reusable React components to render the field settings UI.
- Register custom setting types (e.g. `media`, `color`, `post_object`).

---

## 📂 Location

- `inc/Fields/FieldSettingsRegistry.php` — stores central settings schema.
- `inc/FieldTypes/TextField.php` — implements field-specific settings.
- `assets/js/field-settings-ui/` — dynamic field settings editor.

---

This approach lays a solid foundation for building rich and extensible custom field UIs in WordPress.