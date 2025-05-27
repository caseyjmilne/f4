<?php
// ModelPropertyRoutes.php

class ModelPropertyRoutes {

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        $namespace = 'custom/v1';
        $base = 'property';

        // GET all properties
        register_rest_route($namespace, '/' . $base, [
            'methods' => 'GET',
            'callback' => [$this, 'get_properties'],
            'permission_callback' => '__return_true',
        ]);

        // CREATE property
        register_rest_route($namespace, '/' . $base, [
            'methods' => 'POST',
            'callback' => [$this, 'create_property'],
            'permission_callback' => '__return_true',
        ]);

        // UPDATE property by ID
        register_rest_route($namespace, '/' . $base . '/(?P<id>\d+)', [
            'methods' => 'PUT',
            'callback' => [$this, 'update_property'],
            'permission_callback' => '__return_true',
        ]);

        // DELETE property by ID
        register_rest_route($namespace, '/' . $base . '/(?P<id>\d+)', [
            'methods' => 'DELETE',
            'callback' => [$this, 'delete_property'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function get_properties() {
        $posts = get_posts([
            'post_type' => 'property',
            'numberposts' => -1,
        ]);

        return array_map(function ($post) {
            return [
                'id' => $post->ID,
                'key' => $post->post_name,
                'name' => $post->post_title,
            ];
        }, $posts);
    }

    public function create_property(\WP_REST_Request $request) {
        $params = $request->get_json_params();

        if (empty($params['name']) || empty($params['key'])) {
            return new WP_Error('missing_fields', 'Missing name or key', ['status' => 400]);
        }

        $new_post_id = wp_insert_post([
            'post_type' => 'property',
            'post_title' => sanitize_text_field($params['name']),
            'post_name' => sanitize_title($params['key']),
            'post_status' => 'publish',
        ]);

        if (is_wp_error($new_post_id)) {
            return $new_post_id;
        }

        return [
            'id' => $new_post_id,
            'key' => $params['key'],
            'name' => $params['name'],
        ];
    }

    public function update_property(\WP_REST_Request $request) {
        $id = intval($request->get_param('id'));
        $params = $request->get_json_params();

        $post = get_post($id);
        if (!$post || $post->post_type !== 'property') {
            return new WP_Error('not_found', 'Property not found', ['status' => 404]);
        }

        $updated_post = wp_update_post([
            'ID' => $id,
            'post_title' => isset($params['name']) ? sanitize_text_field($params['name']) : $post->post_title,
            'post_name' => isset($params['key']) ? sanitize_title($params['key']) : $post->post_name,
        ], true);

        if (is_wp_error($updated_post)) {
            return $updated_post;
        }

        return [
            'id' => $id,
            'key' => $params['key'] ?? $post->post_name,
            'name' => $params['name'] ?? $post->post_title,
        ];
    }

    public function delete_property(\WP_REST_Request $request) {
        $id = intval($request->get_param('id'));
        $post = get_post($id);

        if (!$post || $post->post_type !== 'property') {
            return new WP_Error('not_found', 'Property not found', ['status' => 404]);
        }

        $deleted = wp_delete_post($id, true);

        if (!$deleted) {
            return new WP_Error('delete_failed', 'Failed to delete property', ['status' => 500]);
        }

        return ['deleted' => true, 'id' => $id];
    }
}
