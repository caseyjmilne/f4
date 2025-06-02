
# 🗂️ Field Rendering Architecture in F4

## Overview

F4 allows dynamic field types to be rendered in the WordPress admin by:
1. Defining field classes (e.g. `TextField`, `NumberField`, `HiddenField`)
2. Registering those field types with a central `FieldRegistry`
3. Dynamically rendering the appropriate field using the registered type and stored model data

---

## 🔧 1. Field Classes

Each field type extends the `BaseField` class and must implement the `render()` method.

**Example: `TextField.php`**
```php
namespace F4\Field;

class TextField extends BaseField {
    public function render() {
        $value = esc_attr($this->getValue());
        $key = esc_attr($this->key);
        $name = esc_html($this->name);

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<input field-type='text98989' type='text' name='{$key}' id='{$key}' value='{$value}' class='widefat' /></p>";
    }
}
```

---

## 🧩 2. FieldRegistry

`FieldRegistry` is responsible for managing all available field types.

### Responsibilities:
- Registering custom field types
- Returning the correct class for a field type
- Throwing an error if the type isn't registered

### Example:
```php
FieldRegistry::register('text', \F4\Field\TextField::class);
FieldRegistry::register('number', \F4\Field\NumberField::class);
FieldRegistry::register('hidden', \F4\Field\HiddenField::class);
```

This should be called during plugin initialization (e.g., inside a service provider, bootstrap file, or hook).

---

## 🧠 3. Using the FieldRegistry

### Render Fields Dynamically:

```php
use F4\Field\FieldRegistry;

$type = 'text'; // loaded from property config
$fieldClass = FieldRegistry::get($type);

$field = new $fieldClass($key, $name, $value);
$field->render();
```

You typically do this in a loop over model properties associated with a post or entity.

---

## ✅ 4. Adding a New Field Type

To add a new field type:
1. Create a class under `inc/Fields/` that extends `BaseField`
2. Implement the `render()` method
3. Register it with `FieldRegistry` using a unique key

**Example: `HiddenField.php`**
```php
namespace F4\Field;

class HiddenField extends BaseField {
    public function render() {
        $value = esc_attr($this->getValue());
        $key = esc_attr($this->key);

        echo "<input field-type='hidden98989' type='hidden' name='{$key}' id='{$key}' value='{$value}' />";
    }
}
```

**Then register it:**
```php
FieldRegistry::register('hidden', \F4\Field\HiddenField::class);
```

---

## 🧱 Recommended File Structure

```
inc/
  Fields/
    BaseField.php
    TextField.php
    NumberField.php
    HiddenField.php
    FieldRegistry.php
```

---

## 🛠 Suggested Improvements (Optional)

- Add `FieldRegistry::has($type)` for validation before calling `get($type)`
- Create a `FieldRenderer::render($type, $key, $name, $value)` utility
- Cache resolved field instances if performance becomes a concern
