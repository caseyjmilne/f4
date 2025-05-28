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

    public function prefixTableName($name) {
        return $this->wpdb->prefix . $name;
    }

    public function removeClone($clone_table) {
        if (!$this->tableExists($clone_table)) {
            $this->logError("Remove failed: clone table '$clone_table' does not exist.");
            return false;
        }

        $dropped = $this->wpdb->query("DROP TABLE `$clone_table`");

        if ($dropped === false) {
            $this->logError("Remove failed: could not drop table '$clone_table'.");
            return false;
        }

        $this->wpdb->delete(
            $this->wpdb->prefix . 'f4_table_clones',
            ['clone_table' => $clone_table],
            ['%s']
        );

        return true;
    }

    public function removeClonesFor($original_table) {
        $clones = $this->getClonesFor($original_table);
        $allRemoved = true;

        foreach ($clones as $clone) {
            $removed = $this->removeClone($clone);
            if (!$removed) {
                $allRemoved = false; // Continue but flag failure
            }
        }

        return $allRemoved;
    }

    public function getClonesFor($original_table) {
        $results = $this->wpdb->get_col(
            $this->wpdb->prepare(
                "SELECT clone_table FROM {$this->wpdb->prefix}f4_table_clones WHERE original_table = %s",
                $original_table
            )
        );

        return $results ?: [];
    }

}
