<?php 

namespace F4\Field;

class FieldRegistry {

    protected static $types = [];

    /**
     * Register a field type.
     *
     * @param string $type The field type key, e.g. 'text', 'select_image'
     * @param string $class Fully qualified class name
     */
    public static function register($type, $class) {
        self::$types[$type] = $class;
    }

    /**
     * Get the class for a given field type.
     *
     * @param string $type
     * @return string|null
     */
    public static function get($type) {
        $types = apply_filters('f4_field_types', self::$types);
        return $types[$type] ?? null;
    }

    /**
     * Get all registered field types.
     *
     * @return array
     */
    public static function all() {
        return apply_filters('f4_field_types', self::$types);
    }
}
