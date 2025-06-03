# BaseField

**Namespace:** `F4\Field`  
**Abstract:** Yes

## Description

The `BaseField` class provides a foundation for all custom field types used in the F4 plugin. It defines core properties and methods related to rendering, saving, and retrieving field data attached to a WordPress post.

All concrete field classes must extend this base class and implement the `render()` method.

---

## Properties

| Property   | Type   | Description                                              |
|------------|--------|----------------------------------------------------------|
| `$key`     | string | The unique meta key used to store the field value.       |
| `$name`    | string | The human-readable field name (used for labeling).       |
| `$args`    | array  | Optional arguments for field configuration.              |
| `$post_id` | int|null | The post ID the field is associated with.               |

---

## Methods

### `__construct(string $key, string $name, array $args = [], int|null $post_id = null)`

Initializes the field with a key, label, arguments, and an optional post ID.

- **Parameters:**
  - `$key` (string): Meta key for the field.
  - `$name` (string): Label or display name of the field.
  - `$args` (array): Optional arguments (e.g., UI settings).
  - `$post_id` (int|null): Optional WordPress post ID.

---

### `abstract render(): void`

**Must be implemented by subclasses.** Responsible for rendering the field HTML in the UI.

---

### `save(mixed $value): void`

Saves the field value to the WordPress post meta table.

- **Behavior:**
  - Sanitizes input using `sanitize_text_field()`.
  - Calls `update_post_meta()` using the field’s `$key` and `$post_id`.

---

### `getValue(): mixed`

Retrieves the saved value from post meta.

- **Returns:** The current field value stored under the field's `$key`.

---

## Field Setting: `append`

Fields may support an optional `append` mode as part of their `$args` setting:

- **Usage:**  
  When `['append' => true]` is present in `$args`, the field should append new values to existing data rather than replacing them.

- **Note:**  
  `BaseField` does not implement this logic directly in `save()`; subclasses that support `append` must check for `$this->args['append']` and implement appending behavior themselves.

---

## Example Subclass

```php
class TextField extends BaseField {
    public function render() {
        $value = esc_attr($this->getValue());
        echo "<input type='text' name='{$this->key}' value='{$value}' />";
    }

    public function save($value) {
        if (!empty($this->args['append'])) {
            $existing = get_post_meta($this->post_id, $this->key, true);
            $value = $existing . $value;
        }
        parent::save($value);
    }
}
