<?php

namespace F4\Model;

use F4\Front\ModelInstance;

class ModelController {

    public function __construct() {
        add_action('init', [$this, 'register_model_post_type']);
        add_action('add_meta_boxes', [$this, 'add_meta_boxes']);
        add_action('save_post_model', [$this, 'save_meta_box']);
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

    public function add_meta_boxes() {
        add_meta_box(
            'model_key_meta',
            'Model Key',
            [$this, 'render_meta_box'],
            'model',
            'advanced',
            'default'
        );
    }

    public function render_meta_box($post) {
        $value = get_post_meta($post->ID, '_model_key', true);
        wp_nonce_field('save_model_key_meta', 'model_key_meta_nonce');
        ?>
        <label for="model_key_field">Key:</label>
        <input type="text" name="model_key_field" id="model_key_field" value="<?php echo esc_attr($value); ?>" style="width: 100%;">
        <?php
    }

    public function save_meta_box($post_id) {
        if (!isset($_POST['model_key_meta_nonce']) || !wp_verify_nonce($_POST['model_key_meta_nonce'], 'save_model_key_meta')) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        if (!current_user_can('edit_post', $post_id)) return;

        if (isset($_POST['model_key_field'])) {
            update_post_meta($post_id, '_model_key', sanitize_text_field($_POST['model_key_field']));
        }
    }

    /**
     * Returns all published models as ModelInstance objects.
     *
     * @return ModelInstance[]
     */
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

    /**
     * Get a model by a given post type (based on _model_key meta).
     *
     * @param string $post_type
     * @return ModelInstance|null
     */
    public function get_model_for_post_type(string $post_type): ?ModelInstance {
        $posts = get_posts([
            'post_type'   => 'model',
            'post_status' => 'publish',
            'meta_key'    => '_model_key',
            'meta_value'  => $post_type,
            'numberposts' => 1,
        ]);

        if (!empty($posts)) {
            return new ModelInstance($posts[0]);
        }

        return null;
    }

}
