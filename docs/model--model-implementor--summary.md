## 🧩 Model Implementor

The `\F4\Model\ModelImplementor` namespace is responsible for translating F4 "Model" definitions into actual WordPress features such as custom post types and custom fields.

This layer decouples model storage from WordPress implementation logic, keeping your architecture clean and scalable.

---

### 🔧 PostTypeBuilder

Handles registration of WordPress custom post types (CPTs).

- Called by the `ModelSynchronizer`.
- Uses the model’s `key` (post meta) as the CPT slug.
- Uses the model’s `post_title` as the CPT label.
- All CPTs are registered with:
  - `public => true`
  - `show_in_menu => true`
  - `show_in_rest => true`
  - `supports => ['title', 'editor']`

---

### 🔩 FieldBuilder *(planned use)*

Will be responsible for creating meta fields and meta boxes based on model properties.

- Wraps `register_post_meta` and `add_meta_box`.
- Can later support input types, validation, sanitization, etc.

---

### 🧾 FormRenderer *(planned use)*

Responsible for rendering and saving form fields in the admin UI.

- Will be used with `add_meta_box` callbacks.
- Enables dynamic input rendering based on field definitions.

---

### 🔁 ModelSynchronizer

Orchestrates the translation of model definitions into CPTs.

- Hooks into `init`.
- Loops over all published posts of type `model`.
- Extracts the CPT key from the `key` post meta field.
- Uses the `post_title` as the label.
- Passes static arguments to `PostTypeBuilder`.

❗If a model post is missing a `key`, the synchronizer logs an error and skips that model.
