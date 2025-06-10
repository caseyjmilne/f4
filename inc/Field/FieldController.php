<?php

namespace F4\Field;

use F4\Field\FieldRegistry;

class FieldController
{
    /**
     * Import a FieldInstance from a structured array (ACF-style).
     * This is distinct from JSON or DB deserialization.
     */
    public static function importArray(array $def): FieldInstance
    {
        $type = $def['type'] ?? 'text';
        $fieldClass = FieldRegistry::get($type);

        if (!$fieldClass || !class_exists($fieldClass)) {
            throw new \Exception("Field type class not found: $fieldClass");
        }

        $key = $def['key'] ?? '';
        $name = $def['name'] ?? '';
        $args = $def; // Pass the whole array as args, or filter as needed

        $instance = new FieldInstance();
        $instance->setType(new $fieldClass($key, $name, $args));
        $instance->setKey($key);
        $instance->setName($name);
        $instance->setLabel($def['label'] ?? '');
        $instance->setDefault($def['default'] ?? null);
        $instance->setSettings($def); // or filter for only settings keys

        return $instance;
    }
}
