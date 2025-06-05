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
            'type'     => $class::getType(),
            'class'    => $class,
            'label'    => $class::getLabel(),
            'supports' => [
                'append'       => $class::supportsSettingAppend(),
                'prepend'      => $class::supportsSettingPrepend(),
                'placeholder'  => $class::supportsSettingPlaceholder(),
                'rows'         => $class::supportsSettingRows(),
                'maxLength'    => $class::supportsSettingMaxLength(),
                'nestedFields' => $class::supportsNestedFields(),
            ]
        ]);
    }

    public static function getFieldTypeList() {
        $types = FieldRegistry::all();
        $data = [];

        foreach ($types as $key => $class) {
            if (!class_exists($class)) continue;

            $data[] = [
                'type'     => $class::getType(),
                'class'    => $class,
                'label'    => $class::getLabel(),
                'supports' => [
                    'append'       => $class::supportsSettingAppend(),
                    'prepend'      => $class::supportsSettingPrepend(),
                    'placeholder'  => $class::supportsSettingPlaceholder(),
                    'rows'         => $class::supportsSettingRows(),
                    'maxLength'    => $class::supportsSettingMaxLength(),
                    'nestedFields' => $class::supportsNestedFields(),
                ],
            ];
        }

        return rest_ensure_response($data);
    }
}
