<?php

namespace F4\Database;

use wpdb;

class TableCloner {

    protected $wpdb;

    public function __construct(wpdb $wpdb = null) {
        $this->wpdb = $wpdb ?: $GLOBALS['wpdb'];
    }

    public function cloneTable($original_table) {
        $timestamp = date('Ymd_His');
        $clone_table = "{$original_table}_clone_{$timestamp}";

        if (!$this->tableExists($original_table)) {
            $this->logError("Clone failed: Table '$original_table' does not exist.");
            return false;
        }

        $create = $this->wpdb->query("CREATE TABLE `$clone_table` LIKE `$original_table`");
        if ($create === false) {
            $this->logError("Clone failed: Unable to create table structure for '$clone_table'.");
            return false;
        }

        $copy = $this->wpdb->query("INSERT INTO `$clone_table` SELECT * FROM `$original_table`");
        if ($copy === false) {
            $this->logError("Clone failed: Unable to copy data from '$original_table' to '$clone_table'.");
            return false;
        }

        $tracked = $this->trackClone($original_table, $clone_table);
        if (!$tracked) {
            $this->logError("Clone succeeded, but tracking insert failed for '$clone_table'.");
        }

        return $clone_table;
    }

    public function tableExists($table) {
        $table = esc_sql($table);
        $result = $this->wpdb->get_var("SHOW TABLES LIKE '{$table}'");
        return $result === $table;
    }

    protected function trackClone($original, $clone) {
        return $this->wpdb->insert(
            $this->wpdb->prefix . 'f4_table_clones',
            [
                'original_table' => $original,
                'clone_table' => $clone,
                'created' => current_time('mysql'),
            ],
            ['%s', '%s', '%s']
        ) !== false;
    }

    protected function logError($message) {
        error_log('[F4 TableCloner] ' . $message);
    }
}
