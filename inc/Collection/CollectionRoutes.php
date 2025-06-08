<?php

namespace F4;

class CollectionRoutes {
    public static function register_routes() {
        add_action('rest_api_init', function () {
            register_rest_route('f4/v1', '/collection/refresh', [
                'methods'  => 'GET',
                'callback' => [self::class, 'refresh_collection'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public static function refresh_collection($request) {
        return rest_ensure_response(1);
    }
}

// Register the routes when plugins are loaded
add_action('plugins_loaded', [\F4\CollectionRoutes::class, 'register_routes']);