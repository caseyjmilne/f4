## TableCloner

Handles database table cloning and clone management for the F4 plugin.

### Overview

The `\F4\Database\TableCloner` class provides utilities to:
- Clone an existing table with timestamped names
- Track cloned tables in `wp_f4_table_clones`
- Remove specific or all clones of a table
- Retrieve clones associated with a table
- Safely check for table existence and manage naming

### Methods

#### `cloneTable(string $original_table): string|false`

Clones a table by creating a copy with structure and data. Adds a timestamp to the clone's name and tracks it in the `f4_table_clones` table.

- **Parameters**:
  - `$original_table` (string): The full table name to clone.
- **Returns**:
  - (string) Clone table name on success.
  - (false) on failure.

---

#### `removeClone(string $clone_table): bool`

Deletes a specific cloned table and its tracking record.

- **Parameters**:
  - `$clone_table` (string): The name of the cloned table to remove.
- **Returns**:
  - (bool) `true` on success, `false` on failure.

---

#### `removeClonesFor(string $original_table): bool`

Removes all clones associated with a given original table.

- **Parameters**:
  - `$original_table` (string): The name of the original table.
- **Returns**:
  - (bool) `true` if all clones removed successfully; `false` if any fail.

---

#### `getClonesFor(string $original_table): array`

Returns a list of clone table names associated with the original table.

- **Parameters**:
  - `$original_table` (string): Full name of the original table.
- **Returns**:
  - (array) List of clone table names.

---

#### `tableExists(string $table): bool`

Checks whether a table exists in the database.

- **Parameters**:
  - `$table` (string): Full table name.
- **Returns**:
  - (bool) `true` if table exists, `false` otherwise.

---

#### `prefixTableName(string $name): string`

Utility to prepend the current `$wpdb->prefix` to a table name if not already prefixed.

- **Parameters**:
  - `$name` (string): Raw or unprefixed table name.
- **Returns**:
  - (string) Prefixed table name.

---

### Tracking Table

Clones are tracked in a table named `wp_f4_table_clones` with the following fields:

| Column         | Type         | Description                     |
|----------------|--------------|---------------------------------|
| id             | INT AUTO     | Primary key                     |
| original_table | VARCHAR(255) | Name of the source table        |
| clone_table    | VARCHAR(255) | Name of the cloned table        |
| created        | DATETIME     | Timestamp of when it was cloned |

The tracking table is automatically created during plugin activation.

---

### Example

```php
$cloner = new \F4\Databas
