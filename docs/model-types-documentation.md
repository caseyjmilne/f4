
# 🔧 Model Types: `post_type` vs `scalable`

Each `ModelInstance` now has a `$type` property that determines **how its data is stored and managed**. This allows your plugin to support different scalability strategies depending on the model's intended use case.

## Available Types

### 1. `post_type`
- **Storage**: Uses native WordPress post types (e.g., `f4_model`) and stores field data in post meta.
- **Best for**: Simpler models, quick prototyping, and compatibility with native WP features like REST, admin UI, and search.
- **Advantages**:
  - Easy integration with WordPress admin.
  - No custom table setup required.
  - Supports WP query filters, taxonomies, and more.

### 2. `scalable`
- **Storage**: Uses **custom database tables** designed for your model’s fields.
- **Best for**: High-performance needs, large data volumes, or when fine-grained schema control is required.
- **Advantages**:
  - Optimized performance at scale.
  - Cleaner schema design tailored to your model.
  - Decouples from post meta limitations.

## Example

```php
$model = new \F4\Model\ModelInstance();
$model->setType('post_type'); // or 'scalable'
```

## Switching Type
Once a model is created, switching between types may require a data migration step (e.g., moving field values between post meta and custom tables). Automated migration tooling is planned in a future version.
