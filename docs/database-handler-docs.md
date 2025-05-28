## DatabaseHandler

Handles standardized database table creation and column manipulation for custom plugin tables.

### Overview

This class provides methods to safely create tables with a common structure and add or reorder columns with explicit positioning. It ensures safety by checking for table/column existence before attempting modifications.

---

### Methods

#### `__construct(wpdb $db = null)`

Initializes the handler with the WordPress database connection.

- **Parameters**
  - `wpdb $db` _(optional)_: WordPress DB connection object. Defaults to global `$wpdb`.

---

#### `createStandardTable(string $tableName): void`

Creates a new table with a standard structure: `id`, `created`, and `updated`.

- **Parameters**
  - `string $tableName`: Table name (without prefix).
- **Returns**
  - `void`
- **Behavior**
  - Skips creation if the table already exists.

---

#### `tableExists(string $tableName): bool`

Checks if a table already exists.

- **Parameters**
  - `string $tableName`: Table name (without prefix).
- **Returns**
  - `bool`: `true` if table exists, `false` otherwise.

---

#### `tableColumnExists(string $tableName, string $columnName): bool`

Checks if a column exists in a table.

- **Parameters**
  - `string $tableName`: Table name (without prefix).
  - `string $columnName`: Column name.
- **Returns**
  - `bool`: `true` if column exists, `false` otherwise.

---

#### `addColumn(string $tableName, array $columnData): bool`

Adds a single column to an existing table with optional positioning.

- **Parameters**
  - `string $tableName`: Table name (without prefix).
  - `array $columnData`: Column specification with the following keys:
    - `name` _(string, required)_: Column name.
    - `type` _(string, required)_: SQL type definition (e.g., `VARCHAR(255) NOT NULL`).
    - `after` _(string, optional)_: Name of the existing column to insert after. Defaults to no positioning.
- **Returns**
  - `bool`: `true` if added, `false` if skipped or failed.
- **Notes**
  - Fails gracefully if:
    - Table does not exist.
    - Column already exists.
    - "After" column is specified but doesn't exist.

---

#### `addColumns(string $tableName, array $columnsData): void`

Adds multiple columns to a table.

- **Parameters**
  - `string $tableName`: Table name (without prefix).
  - `array $columnsData`: Array of column specs (same format as `addColumn`).
- **Returns**
  - `void`

---

#### `reorderColumn(string $tableName, string $columnName, string $afterColumn): bool`

Repositions a custom column in the table, immediately after the specified existing column.

- **Parameters**
  - `string $tableName`: Table name (without prefix).
  - `string $columnName`: The column to move.
  - `string $afterColumn`: The column after which `$columnName` should be placed.
- **Returns**
  - `bool`: `true` if the column was successfully reordered.
- **Behavior**
  - Reorders a single column using the `ALTER TABLE ... CHANGE ... AFTER` syntax.
  - Column definition is preserved (type, nullability, default, extra).
  - Does not affect `id`, `created`, or `updated` columns (which should remain fixed).
- **Usage Notes**
  - Intended to be called after a drag-and-drop action in the admin UI.
  - UI should lock until server confirms the reorder to prevent overlapping operations.

---

### Example Usage

```php
$handler = new DatabaseHandler();

// Create a standard table
$handler->createStandardTable('articles');

// Add columns
$handler->addColumns('articles', [
    ['name' => 'title', 'type' => 'VARCHAR(255) NOT NULL', 'after' => 'id'],
    ['name' => 'author', 'type' => 'VARCHAR(100)', 'after' => 'title'],
    ['name' => 'status', 'type' => "VARCHAR(20) DEFAULT 'draft'", 'after' => 'author'],
]);

// Reorder column 'status' to come after 'title'
$handler->reorderColumn('articles', 'status', 'title');
