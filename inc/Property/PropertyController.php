<?php

namespace F4\Property;

class PropertyController {

    public function get_properties($model_id = null) {
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
            return (new PropertyInstance($post))->to_array();
        }, $posts);
    }

    public function create_property(array $data) {
        if (empty($data['name']) || empty($data['key']) || empty($data['model_id'])) {
            return new \WP_Error('missing_fields', 'Missing required fields', ['status' => 400]);
        }

        $post_id = wp_insert_post([
            'post_type'   => 'property',
            'post_title'  => sanitize_text_field($data['name']),
            'post_name'   => sanitize_title($data['key']),
            'post_status' => 'publish',
        ]);

        if (is_wp_error($post_id)) {
            return $post_id;
        }

        update_post_meta($post_id, 'type', sanitize_text_field($data['type'] ?? ''));
        update_post_meta($post_id, 'key', sanitize_text_field($data['key']));
        update_post_meta($post_id, 'name', sanitize_text_field($data['name']));
        update_post_meta($post_id, 'model_id', (int) $data['model_id']);

        $post = get_post($post_id);
        return (new PropertyInstance($post))->to_array();
    }

    public function update_property($id, array $data) {
        $post = get_post($id);
        if (!$post || $post->post_type !== 'property') {
            return new \WP_Error('not_found', 'Property not found', ['status' => 404]);
        }

        $updated_post = wp_update_post([
            'ID'         => $id,
            'post_title' => $data['name'] ?? $post->post_title,
            'post_name'  => isset($data['key']) ? sanitize_title($data['key']) : $post->post_name,
        ], true);

        if (is_wp_error($updated_post)) {
            return $updated_post;
        }

        if (isset($data['type'])) {
            update_post_meta($id, 'type', sanitize_text_field($data['type']));
        }

        if (isset($data['key'])) {
            update_post_meta($id, 'key', sanitize_text_field($data['key']));
        }

        if (isset($data['name'])) {
            update_post_meta($id, 'name', sanitize_text_field($data['name']));
        }

        if (isset($data['model_id'])) {
            update_post_meta($id, 'model_id', (int) $data['model_id']);
        }

        $post = get_post($id);
        return (new PropertyInstance($post))->to_array();
    }

    public function delete_property($id) {
        $post = get_post($id);
        if (!$post || $post->post_type !== 'property') {
            return new \WP_Error('not_found', 'Property not found', ['status' => 404]);
        }

        $deleted = wp_delete_post($id, true);

        if (!$deleted) {
            return new \WP_Error('delete_failed', 'Failed to delete property', ['status' => 500]);
        }

        return ['deleted' => true, 'id' => $id];
    }
}
