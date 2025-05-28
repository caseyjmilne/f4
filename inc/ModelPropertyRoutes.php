<?php
// ModelPropertyRoutes.php

class ModelPropertyRoutes {

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        $namespace = 'custom/v1';
        $base = 'property';

        // GET all or filtered properties
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

    public function get_properties(\WP_REST_Request $request) {
        $model_id = $request->get_param('model_id');

        $args = [
            'post_type'   => 'property',
            'numberposts' => -1,
        ];

        if ($model_id) {
            $args['meta_query'] = [
                [
                    'key'     => 'model_id',
                    'value'   => $model_id,
                    'compare' => '='
                ]
            ];
        }

        $posts = get_posts($args);

        return array_map(function ($post) {
            return [
                'id'   => $post->ID,
                'type' => get_post_meta($post->ID, 'type', true),
                'key'  => get_post_meta($post->ID, 'key', true),
                'name' => get_post_meta($post->ID, 'name', true),
                'model_id' => get_post_meta($post->ID, 'model_id', true),
            ];
        }, $posts);
    }

    public function create_property(\WP_REST_Request $request) {
        $params = $request->get_json_params();

        if (empty($params['name']) || empty($params['key']) || empty($params['model_id'])) {
            return new WP_Error('missing_fields', 'Missing name, key, or model_id', ['status' => 400]);
        }

        $post_id = wp_insert_post([
            'post_type'   => 'property',
            'post_title'  => sanitize_text_field($params['name']),
            'post_name'   => sanitize_title($params['key']),
            'post_status' => 'publish',
        ]);

        if (is_wp_error($post_id)) {
            return $post_id;
        }

        update_post_meta($post_id, 'type', sanitize_text_field($params['type']));
        update_post_meta($post_id, 'key', sanitize_text_field($params['key']));
        update_post_meta($post_id, 'name', sanitize_text_field($params['name']));
        update_post_meta($post_id, 'model_id', intval($params['model_id']));

        return [
            'id'       => $post_id,
            'type'      => $params['type'],
            'key'      => $params['key'],
            'name'     => $params['name'],
            'model_id' => $params['model_id'],
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
            'ID'         => $id,
            'post_title' => isset($params['name']) ? sanitize_text_field($params['name']) : $post->post_title,
            'post_name'  => isset($params['key']) ? sanitize_title($params['key']) : $post->post_name,
        ], true);

        if (is_wp_error($updated_post)) {
            return $updated_post;
        }

        if (isset($params['type'])) {
            update_post_meta($id, 'type', sanitize_text_field($params['type']));
        }

        if (isset($params['key'])) {
            update_post_meta($id, 'key', sanitize_text_field($params['key']));
        }

        if (isset($params['name'])) {
            update_post_meta($id, 'name', sanitize_text_field($params['name']));
        }

        if (isset($params['model_id'])) {
            update_post_meta($id, 'model_id', intval($params['model_id']));
        }

        return [
            'id'       => $id,
            'key'      => $params['key'] ?? get_post_meta($id, 'key', true),
            'name'     => $params['name'] ?? get_post_meta($id, 'name', true),
            'model_id' => $params['model_id'] ?? get_post_meta($id, 'model_id', true),
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
