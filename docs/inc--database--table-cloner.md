# TableCloner

**Namespace:** `F4\Database`

## Description

The `TableCloner` class manages cloning of database tables within the F4 plugin. It handles creating timestamped clones of existing tables, tracking cloned tables in a dedicated tracking table (`wp_f4_table_clones`), removing individual or all clones of a table, and verifying table existence.

---

## Overview

The `TableCloner` class provides utilities to:

- Clone an existing database table including structure and data.
- Track cloned tables with timestamps in the `f4_table_clones` tracking table.
- Remove specific clones or all clones associated with an original table.
- Retrieve all clones for a given original table.
- Verify table existence safely.
- Prepend the WordPress table prefix to table names.

---

## Methods

### `__construct(wpdb $wpdb = null)`

Constructor accepts an optional `wpdb` instance or defaults to the global `$wpdb`.

---

### `cloneTable(string $original_table): string|false`

Clones a table, creating a new one with a timestamp suffix, copying both structure and data.

- **Parameters:**
  - `$original_table` (string): Full name of the source table.
- **Returns:**
  - (string) The clone table name on success.
  - (false) On failure (if original table does not exist or clone fails).

---

### `removeClone(string $clone_table): bool`

Deletes a cloned table and removes its tracking record.

- **Parameters:**
  - `$clone_table` (string): Name of the clone table to delete.
- **Returns:**
  - (bool) True on successful removal; false otherwise.

---

### `removeClonesFor(string $original_table): bool`

Removes all clones associated with a specific original table.

- **Parameters:**
  - `$original_table` (string): Name of the original table.
- **Returns:**
  - (bool) True if all clones removed successfully; false if any removal failed.

---

### `getClonesFor(string $original_table): array`

Retrieves all clone table names associated with the original table.

- **Parameters:**
  - `$original_table` (string): Original table name.
- **Returns:**
  - (array) List of clone table names (empty if none).

---

### `tableExists(string $table): bool`

Checks if a database table exists.

- **Parameters:**
  - `$table` (string): Table name to check.
- **Returns:**
  - (bool) True if table exists; false otherwise.

---

### `prefixTableName(string $name): string`

Prepends the WordPress `$wpdb->prefix` to a table name if not already prefixed.

- **Parameters:**
  - `$name` (string): Table name.
- **Returns:**
  - (string) Prefixed table name.

---

## Internal Methods

### `trackClone(string $original, string $clone): bool`

Inserts a record into the `f4_table_clones` tracking table for the cloned table.

### `logError(string $message): void`

Logs errors related to cloning operations to the PHP error log.

---

## Tracking Table

The class tracks clones in a table named `wp_f4_table_clones` with columns:

| Column           | Type         | Description                     |
|------------------|--------------|--------------------------------|
| `id`             | INT AUTO     | Primary key                    |
| `original_table` | VARCHAR(255) | Source/original table name     |
| `clone_table`    | VARCHAR(255) | Name of the cloned table       |
| `created`        | DATETIME     | Timestamp of cloning operation |

---

## Example Usage

```php
use F4\Database\TableCloner;

$cloner = new TableCloner();

// Clone a table
$cloneName = $cloner->cloneTable('wp_my_table');

if ($cloneName !== false) {
    echo "Cloned table created: $cloneName";
}

// List all clones of a table
$clones = $cloner->getClonesFor('wp_my_table');

// Remove a clone
$success = $cloner->removeClone($cloneName);

// Remove all clones for a table
$allRemoved = $cloner->removeClonesFor('wp_my_table');
