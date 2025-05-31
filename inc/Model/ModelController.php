<?php

namespace F4\Model;

use WP_Error;
use WP_Post;

class ModelController {

    public function __construct() {
        add_action('init', [$this, 'register_model_post_type']);
    }

    public function register_model_post_type() {
        $labels = array(
            'name'               => 'Models',
            'singular_name'      => 'Model',
            'menu_name'          => 'Models',
            'name_admin_bar'     => 'Model',
            'add_new'            => 'Add New',
            'add_new_item'       => 'Add New Model',
            'new_item'           => 'New Model',
            'edit_item'          => 'Edit Model',
            'view_item'          => 'View Model',
            'all_items'          => 'All Models',
            'search_items'       => 'Search Models',
            'not_found'          => 'No models found.',
            'not_found_in_trash' => 'No models found in Trash.'
        );

        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'models'),
            'show_in_rest'       => true,
            'supports'           => array('title', 'editor'),
            'menu_position'      => 20,
            'menu_icon'          => 'dashicons-database',
        );

        register_post_type('model', $args);
    }

    public function get_all_models(): array {
        $posts = get_posts([
            'post_type'   => 'model',
            'post_status' => 'publish',
            'numberposts' => -1,
        ]);

        return array_map(function($post) {
            return new ModelInstance($post);
        }, $posts);
    }

    public function get_model_for_post_type(string $post_type): ?ModelInstance {
        $posts = get_posts([
            'post_type'   => 'model',
            'post_status' => 'publish',
            'meta_key'    => 'model_key',
            'meta_value'  => $post_type,
            'numberposts' => 1,
        ]);

        if (!empty($posts)) {
            return new ModelInstance($posts[0]);
        }

        return null;
    }

    public function create_model(string $name, string $model_key): ModelInstance|WP_Error {
        $post_id = wp_insert_post([
            'post_title'   => $name,
            'post_type'    => 'model',
            'post_status'  => 'publish',
        ]);

        if (is_wp_error($post_id)) {
            return $post_id;
        }

        update_post_meta($post_id, 'model_key', $model_key);

        return new ModelInstance(get_post($post_id));
    }

    public function update_model(int $id, array $data): ModelInstance|WP_Error {
        $post = get_post($id);
        if (!$post || $post->post_type !== 'model') {
            return new WP_Error('model_not_found', 'Model not found', ['status' => 404]);
        }

        $updated_post = [
            'ID'          => $id,
            'post_title'  => $data['name'] ?? $post->post_title,
        ];

        $update_result = wp_update_post($updated_post, true);
        if (is_wp_error($update_result)) {
            return $update_result;
        }

        if (isset($data['model_key'])) {
            update_post_meta($id, 'model_key', sanitize_text_field($data['model_key']));
        }

        return new ModelInstance(get_post($id));
    }
}
