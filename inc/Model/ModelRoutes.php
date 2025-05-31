<?php

namespace F4\Model;

use WP_REST_Request;
use WP_Error;
use function rest_ensure_response;

class ModelRoutes {

    protected ModelController $controller;

    public function __construct() {
        $this->controller = new ModelController();
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes(): void {
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
        ]);

        register_rest_route($namespace, '/' . $base, [
            'methods' => 'POST',
            'callback' => [$this, 'createModel'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($namespace, '/' . $base . '/(?P<id>\d+)', [
            'methods' => 'PUT',
            'callback' => [$this, 'updateModel'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($namespace, '/' . $base . '/(?P<id>\d+)', [
            'methods' => 'DELETE',
            'callback' => [$this, 'deleteModel'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function getModels() {
        $instances = $this->controller->get_all_models();

        return rest_ensure_response(array_map(fn($instance) => $instance->to_array(), $instances));
    }

    public function getModel(WP_REST_Request $request) {
        $id = (int) $request['id'];
        $post = get_post($id);

        if (!$post || $post->post_type !== 'model') {
            return new WP_Error('model_not_found', 'Model not found', ['status' => 404]);
        }

        return rest_ensure_response((new ModelInstance($post))->to_array());
    }

    public function createModel(WP_REST_Request $request) {
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

        update_post_meta($post_id, '_model_key', $model_key);

        return rest_ensure_response((new ModelInstance(get_post($post_id)))->to_array());
    }

    public function updateModel(WP_REST_Request $request) {
        $id = (int) $request['id'];
        $post = get_post($id);

        if (!$post || $post->post_type !== 'model') {
            return new WP_Error('model_not_found', 'Model not found', ['status' => 404]);
        }

        $params = $request->get_json_params();

        $name = isset($params['name']) ? sanitize_text_field($params['name']) : get_the_title($post);
        $model_key = isset($params['model_key']) ? sanitize_text_field($params['model_key']) : get_post_meta($id, '_model_key', true);

        $update_result = wp_update_post([
            'ID' => $id,
            'post_title' => $name,
        ]);

        if (is_wp_error($update_result)) {
            return $update_result;
        }

        update_post_meta($id, '_model_key', $model_key);

        return rest_ensure_response((new ModelInstance(get_post($id)))->to_array());
    }

    public function deleteModel(WP_REST_Request $request) {
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
