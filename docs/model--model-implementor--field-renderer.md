## FieldRenderer

The `FieldRenderer` class handles the rendering and saving of custom meta fields for F4 models, which are implemented as custom post types (CPTs). These fields are defined using separate `property` posts linked to each `model`.

---

### Responsibilities

- Attach meta boxes to CPTs created from models.
- Render input fields for each property (currently only text fields).
- Save input values to WordPress post meta when a model post is saved.

---

### How It Works

1. **Model Registration**
   - Each `model` post includes a `_model_key` meta value, used as the CPT slug.
   
2. **Property Configuration**
   - Each `property` post:
     - Links to its model via `_model_id`.
     - Stores its field key as `_model_key`.
     - Stores its label as `_model_name`.

3. **Field Rendering**
   - A meta box labeled "F4 Fields" appears on the post editor screen for each model CPT.
   - Each property appears as a labeled `<input type="text">`.
   - If no fields exist, a fallback message is shown.

4. **Field Saving**
   - On post save, the input values are captured and saved using `update_post_meta`.

---

### Meta Box Behavior

- **Title:** F4 Fields
- **Location:** Normal (main editor column)
- **Priority:** High
- **Fallback Message:**  
  _"No F4 Fields for this Model."_

---

### Security

- A nonce field is used to protect the save operation:

  ```php
  wp_nonce_field('f4_fields_nonce_action', 'f4_fields_nonce');
