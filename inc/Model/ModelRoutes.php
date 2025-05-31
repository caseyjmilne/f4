<?php

namespace F4\Model;

use F4\ModelInstance;

class ModelRoutes {

    public function __construct() {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes() {
        $namespace = 'custom/v1';
        $base = 'model';

        register_rest_route($namespace, '/' . $base, [
            'methods' => 'GET',
            'callback' => [$this, 'getModels'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($namespace, '/' . $base . '/(?P<id>\d+)', [
            'methods' => 'GET',
            'callback' => [$this, 'getModel'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [],
            ],
        ]);

        register_rest_route($namespace, '/' . $base, [
            'methods' => 'POST',
            'callback' => [$this, 'createModel'],
            'permission_callback' => '__return_true',
            'args' => [
                'name' => ['required' => true],
                'model_key' => ['required' => true],
            ],
        ]);

        register_rest_route($namespace, '/' . $base . '/(?P<id>\d+)', [
            'methods' => 'PUT',
            'callback' => [$this, 'updateModel'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [],
            ],
        ]);

        register_rest_route($namespace, '/' . $base . '/(?P<id>\d+)', [
            'methods' => 'DELETE',
            'callback' => [$this, 'deleteModel'],
            'permission_callback' => '__return_true',
            'args' => [
                'id' => [],
            ],
        ]);
    }

    public function getModels() {
        $args = [
            'post_type' => 'model',
            'post_status' => 'publish',
            'numberposts' => -1,
        ];
        $posts = get_posts($args);

        $result = [];
        foreach ($posts as $post) {
            $result[] = [
                'id' => $post->ID,
                'name' => get_the_title($post),
                'model_key' => get_post_meta($post->ID, 'model_key', true),
                'slug' => $post->post_name,
            ];
        }

        return rest_ensure_response($result);
    }

    public function getModel($request) {
        $id = (int) $request['id'];
        $post = get_post($id);

        if (!$post || $post->post_type !== 'model') {
            return new WP_Error('model_not_found', 'Model not found', ['status' => 404]);
        }

        return rest_ensure_response([
            'id' => $post->ID,
            'name' => get_the_title($post),
            'model_key' => get_post_meta($post->ID, 'model_key', true),
            'slug' => $post->post_name,
        ]);
    }

    public function createModel($request) {
        $params = $request->get_json_params();

        $name = sanitize_text_field($params['name'] ?? '');
        $model_key = sanitize_text_field($params['model_key'] ?? '');

        if (empty($name) || empty($model_key)) {
            return new WP_Error('missing_fields', 'Name and model_key are required', ['status' => 400]);
        }

        $post_id = wp_insert_post([
            'post_title' => $name,
            'post_type' => 'model',
            'post_status' => 'publish',
        ]);

        if (is_wp_error($post_id)) {
            return $post_id;
        }

        update_post_meta($post_id, 'model_key', $model_key);

        return rest_ensure_response([
            'id' => $post_id,
            'name' => $name,
            'model_key' => $model_key,
            'slug' => get_post_field('post_name', $post_id),
        ]);
    }

    public function updateModel($request) {
        $id = (int) $request['id'];
        $post = get_post($id);

        if (!$post || $post->post_type !== 'model') {
            return new WP_Error('model_not_found', 'Model not found', ['status' => 404]);
        }

        $params = $request->get_json_params();

        $name = isset($params['name']) ? sanitize_text_field($params['name']) : get_the_title($post);
        $model_key = isset($params['model_key']) ? sanitize_text_field($params['model_key']) : get_post_meta($id, 'model_key', true);

        $updated_post = [
            'ID' => $id,
            'post_title' => $name,
        ];

        $update_result = wp_update_post($updated_post);

        if (is_wp_error($update_result)) {
            return $update_result;
        }

        update_post_meta($id, 'model_key', $model_key);

        return rest_ensure_response([
            'id' => $id,
            'name' => $name,
            'model_key' => $model_key,
            'slug' => get_post_field('post_name', $id),
        ]);
    }

    public function deleteModel($request) {
        $id = (int) $request['id'];

        $post = get_post($id);
        if (!$post || $post->post_type !== 'model') {
            return new WP_Error('model_not_found', 'Model not found', ['status' => 404]);
        }

        $deleted = wp_delete_post($id, true);

        if (!$deleted) {
            return new WP_Error('delete_failed', 'Failed to delete model', ['status' => 500]);
        }

        return rest_ensure_response(['deleted' => true, 'id' => $id]);
    }
}
