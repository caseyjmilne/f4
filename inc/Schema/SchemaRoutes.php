<?php

namespace F4\Schema;

use WP_REST_Request;
use WP_REST_Response;

class SchemaRoutes {

    public static function init(): void {
        add_action('rest_api_init', [self::class, 'register']);
    }

    public static function register(): void {
        register_rest_route('f4/v1', '/schema/(?P<name>[a-zA-Z0-9_\-]+)', [
            'methods'             => 'GET',
            'callback'            => [self::class, 'getSchemaByName'],
            'permission_callback' => '__return_true',
            'args' => [
                'name' => [
                    'required' => true,
                    'validate_callback' => function($param) {
                        return preg_match('/^[a-zA-Z0-9_\-]+$/', $param);
                    }
                ]
            ]
        ]);
    }

    public static function getSchemaByName(WP_REST_Request $request): WP_REST_Response {
        $name = $request->get_param('name');
        $schemaFile = F4_PATH . '/schema/' . $name . '.json';

        if (!file_exists($schemaFile)) {
            return new WP_REST_Response(['error' => 'Schema file not found.'], 404);
        }

        $schemaContent = file_get_contents($schemaFile);
        $schema = json_decode($schemaContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return new WP_REST_Response(['error' => 'Invalid JSON in schema file.'], 500);
        }

        return rest_ensure_response($schema);
    }
}
