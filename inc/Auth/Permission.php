<?php

namespace F4\Auth;

use WP_Error;

class Permission {
    public static function allow_admin_or_key(): callable {
        return function () {
            if (is_user_logged_in() && current_user_can('manage_options')) {
                return true;
            }

            $key_from_get = isset($_GET['access_key']) ? sanitize_text_field($_GET['access_key']) : null;
            $key_from_header = isset($_SERVER['HTTP_AUTHORIZATION']) ? trim(str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION'])) : null;

            if ($key_from_get === F4_ACCESS_KEY || $key_from_header === F4_ACCESS_KEY) {
                return true;
            }

            return new WP_Error('forbidden', 'Unauthorized access', ['status' => 403]);
        };
    }
}