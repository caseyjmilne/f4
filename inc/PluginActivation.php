<?php

namespace F4;

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
    }
}
