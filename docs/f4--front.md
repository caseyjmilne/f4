# F4 Plugin — `F4\Front` Namespace Overview

This document summarizes the key classes within the `F4\Front` namespace of the F4 WordPress plugin, describing their roles and usage.

---

## `F4\Front\ModelLoader`

### Purpose
`ModelLoader` is responsible for retrieving **Model** objects based on WordPress post types. It acts as an interface to load the `ModelInstance` associated with a given post type.

### Key Method
- `getModelForPostType(string $post_type): ?ModelInstance`  
  Returns a `ModelInstance` for the given post type slug, or `null` if none found.

### Usage
Typically used in template files or frontend logic to load the model data associated with the current post.

---

## `F4\Front\PropertyLoader`

### Purpose
`PropertyLoader` handles loading of **ModelProperty** posts linked to a specific model. It fetches properties that belong to a model via the `model_id` post meta.

### Key Method
- `get_properties_for_model(int $model_id): array`  
  Returns an array of `WP_Post` objects representing properties linked to the given model ID.

### Usage
Used in frontend templates or API endpoints to fetch and display properties related to a model.

---

## `F4\Front\TemplateLoader`

### Purpose
`TemplateLoader` hooks into WordPress template loading (`template_include` filter) to load a custom single model template (`model_single.php`) for any post type that corresponds to a registered model.

### Key Method
- `loadTemplate(string $template): string`  
  Checks if the current post is a singular model post type, and if so, returns the path to the plugin’s custom template file.

### Usage
Automatically activates the plugin’s custom template when viewing a single model post.

---

## Relationships and Flow

- `TemplateLoader` intercepts the template loading process and triggers loading of the custom model template.
- Within the template, `ModelLoader` fetches the current model object.
- `PropertyLoader` fetches properties related to that model for display.
- These classes decouple frontend display logic from WordPress core, organizing code within the F4 plugin’s frontend architecture.

---

## Notes

- Models are represented as custom post types registered in `F4\Model\ModelController`.
- Properties are custom post types linked via post meta `model_id`.
- Meta fields such as `name`, `key`, and `type` are stored and accessed via standard WordPress post meta functions.
- This modular approach ensures clean separation between data retrieval (ModelLoader, PropertyLoader) and presentation logic (TemplateLoader + templates).

---

If you need more detailed API docs or example usages, just ask!
