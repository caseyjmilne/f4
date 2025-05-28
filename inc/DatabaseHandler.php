<?php 

namespace F4\Utility;

use wpdb;

class DatabaseHandler {

    protected wpdb $db;
    protected string $charsetCollate;

    public function __construct(wpdb $db = null) {
        global $wpdb;
        $this->db = $db ?? $wpdb;
        $this->charsetCollate = $this->db->get_charset_collate();
    }

    /**
     * Create a table with `id`, `created`, and `updated` columns.
     *
     * @param string $tableName The unprefixed table name (e.g., 'my_table')
     * @return void
     */
    public function createStandardTable(string $tableName): void {

        $fullTableName = $this->db->prefix . $tableName;

        // Check if the table already exists
        if ($this->tableExists($fullTableName)) {
            return; // Table doesn't exist
        }

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        $sql = "CREATE TABLE $fullTableName (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) {$this->charsetCollate};";

        dbDelta($sql);
    }

    public function tableExists(string $tableName): bool {
        $fullTableName = $this->db->prefix . $tableName;

        $result = $this->db->get_var(
            $this->db->prepare("SHOW TABLES LIKE %s", $fullTableName)
        );

        return $result === $fullTableName;
    }

    public function tableColumnExists(string $tableName, string $columnName): bool {
        $fullTableName = $this->db->prefix . $tableName;

        $result = $this->db->get_results(
            $this->db->prepare("SHOW COLUMNS FROM `$fullTableName` LIKE %s", $columnName)
        );

        return !empty($result);
    }

    public function addColumn(string $tableName, array $columnData): bool {
        $fullTableName = $this->db->prefix . $tableName;

        if (!$this->tableExists($tableName)) {
            return false; // Table doesn't exist
        }

        if (!isset($columnData['name']) || !isset($columnData['type'])) {
            return false; // Missing required keys
        }

        $columnName = $columnData['name'];

        if ($this->tableColumnExists($tableName, $columnName)) {
            return false; // Column already exists
        }

        $afterClause = '';
        if (isset($columnData['after'])) {
            if (!$this->tableColumnExists($tableName, $columnData['after'])) {
                return false; // Referenced "after" column doesn't exist
            }
            $afterClause = "AFTER `{$columnData['after']}`";
        }

        $type = $columnData['type'];

        $sql = "ALTER TABLE `$fullTableName` ADD COLUMN `$columnName` $type $afterClause;";

        return (bool) $this->db->query($sql);
    }

    public function addColumns(string $tableName, array $columnsData): void {
        foreach ($columnsData as $columnData) {
            $this->addColumn($tableName, $columnData);
        }
    }

    public function reorderColumn(string $tableName, string $columnName, string $afterColumn): bool {
        
        $fullTableName = $this->db->prefix . $tableName;

        if (!$this->tableExists($tableName)) return false;
        if (!$this->tableColumnExists($tableName, $columnName)) return false;
        if (!$this->tableColumnExists($tableName, $afterColumn)) return false;

        // Get column definition
        $col = $this->db->get_row(
            $this->db->prepare("SHOW FULL COLUMNS FROM `$fullTableName` WHERE Field = %s", $columnName)
        );

        if (!$col) return false;

        $type = strtoupper($col->Type);
        $null = $col->Null === 'NO' ? 'NOT NULL' : 'NULL';
        $default = $col->Default !== null ? "DEFAULT '{$col->Default}'" : '';
        $extra = $col->Extra ? $col->Extra : '';

        $sql = "ALTER TABLE `$fullTableName` 
                CHANGE `$columnName` `$columnName` $type $null $default $extra AFTER `$afterColumn`;";

        return (bool) $this->db->query($sql);
    }

}
