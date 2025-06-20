<?php

namespace F4;

use WP_Error;
use \F4\Schema\SchemaGenerator;

class PluginActivation {

    public static function activate() {

        global $wpdb;

        $table_name = $wpdb->prefix . 'f4_table_clones';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS `$table_name` (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            original_table VARCHAR(100) NOT NULL,
            clone_table VARCHAR(150) NOT NULL,
            created DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            INDEX (original_table),
            INDEX (clone_table)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);

        $result = self::ensure_schema_directory();
        if (is_wp_error($result)) {
            return $result;
        }
    }

    public static function ensure_schema_directory() {

        $schemaGenerator = new SchemaGenerator($fieldSchemas);

        if (!$schemaGenerator->schema_directory_exists()) {
            $result = $schemaGenerator->install_schema_directory();
            if (is_wp_error($result)) {
                return $result;
            }
        }
        return true;
    }
}
