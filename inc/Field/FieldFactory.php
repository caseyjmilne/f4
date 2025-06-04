<?php

namespace F4\Field;

class FieldFactory {

    /**
     * Create a field instance from definition array.
     *
     * @param array $definition Array with keys: 'key', 'name', 'type', (optional) 'args'
     * @param int|null $post_id
     * @return BaseField|null
     */
    public static function make(array $definition, $post_id = null): ?BaseField {
        $type = $definition['type'] ?? 'text';
        $key = $definition['key'] ?? null;
        $name = $definition['name'] ?? $key;

        if (!$key) {
            return null;
        }

        $fieldClass = FieldRegistry::get($type);

        if (!$fieldClass || !class_exists($fieldClass)) {
            return null;
        }

        $args = $definition['args'] ?? $definition;

        return new $fieldClass($key, $name, $args, $post_id);
    }
}
