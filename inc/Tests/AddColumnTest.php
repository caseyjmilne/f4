<?php

namespace F4\Tests;

use F4\Utility\DatabaseHandler;

class AddColumnTest implements TestCaseInterface {

    public function run(): array {
        $table = 'wp_test2'; // Adjust as needed for your dev table
        $column = [
            'name' => 'status',
            'type' => "VARCHAR(20) NOT NULL DEFAULT 'draft'",
            'after' => 'id'
        ];

        $db = new DatabaseHandler();

        if (!$db->tableExists($table)) {
            return ['success' => false, 'message' => "Table '{$table}' does not exist."];
        }

        if ($db->tableColumnExists($table, $column['name'])) {
            return ['success' => false, 'message' => "Column '{$column['name']}' already exists in '{$table}'."];
        }

        $success = $db->addColumn($table, $column);

        if ($success) {
            return ['success' => true, 'message' => "Column '{$column['name']}' added to '{$table}'."];
        }

        return ['success' => false, 'message' => "Failed to add column '{$column['name']}' to '{$table}'."];
    }
}
