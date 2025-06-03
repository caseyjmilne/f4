<?php

namespace F4\Field;

class FieldRoutes {

    public static function register() {
        add_action('rest_api_init', [self::class, 'registerRoutes']);
    }

    public static function registerRoutes() {
        register_rest_route('f4/v1', '/field/(?P<type>[a-zA-Z0-9_-]+)', [
            'methods'  => 'GET',
            'callback' => [self::class, 'getFieldTypeInfo'],
            'permission_callback' => function () {
                return true;
            },
        ]);

        register_rest_route('f4/v1', '/fields', [
            'methods'  => 'GET',
            'callback' => [self::class, 'getFieldTypeList'],
            'permission_callback' => function () {
                return true;
            },
        ]);
    }

    public static function getFieldTypeInfo($request) {
        $type = sanitize_key($request['type']);
        $class = FieldRegistry::get($type);

        if (!$class || !class_exists($class)) {
            return new \WP_Error('field_type_not_found', 'Unknown field type.', ['status' => 404]);
        }

        return rest_ensure_response([
            'type'            => $type,
            'class'           => $class,
            'label'           => self::getLabelFromClass($class),
            'supports_append' => method_exists($class, 'supportsSettingAppend') ? $class::supportsSettingAppend() : false,
        ]);
    }

    public static function getFieldTypeList() {
        $types = FieldRegistry::all();
        $options = [];

        foreach ($types as $key => $class) {
            if (!class_exists($class)) continue;

            $options[] = [
                'label' => self::getLabelFromClass($class),
                'value' => $key,
            ];
        }

        return rest_ensure_response($options);
    }

    protected static function getLabelFromClass($class) {
        $parts = explode('\\', $class);
        $name = str_replace('Field', '', end($parts));
        return ucwords(str_replace('_', ' ', $name));
    }
}
