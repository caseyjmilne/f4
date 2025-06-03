# PluginActivation

**Namespace:** `F4`

## Description

The `PluginActivation` class handles setup tasks that need to occur when the F4 plugin is activated. Currently, its primary responsibility is to create the database table `wp_f4_table_clones` used to track cloned tables.

---

## Methods

### `activate(): void`

Creates the `f4_table_clones` database table if it does not already exist. This table tracks metadata about cloned database tables, including the original table name, the clone table name, and the timestamp when the clone was created.

- Uses the WordPress `dbDelta` function for safe table creation and updates.
- Utilizes the `$wpdb->prefix` to ensure the table name respects the WordPress table prefix.
- Adds indexes on the `original_table` and `clone_table` columns for performance.

---

## Database Table Structure Created

| Column          | Type          | Description                          |
|-----------------|---------------|------------------------------------|
| `id`            | INT UNSIGNED  | Auto-incrementing primary key      |
| `original_table` | VARCHAR(100)  | Name of the original source table  |
| `clone_table`   | VARCHAR(150)  | Name of the cloned table            |
| `created`       | DATETIME      | Timestamp when clone record created |

Indexes:

- Index on `original_table`
- Index on `clone_table`

---

## Usage Example

```php
// During plugin activation hook
register_activation_hook(__FILE__, ['F4\PluginActivation', 'activate']);
