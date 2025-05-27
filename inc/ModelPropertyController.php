<?php

class ModelPropertyController {
    
    public function __construct() {
        add_action('init', [$this, 'register_post_type']);
        add_action('add_meta_boxes', [$this, 'add_meta_boxes']);
        add_action('save_post_property', [$this, 'save_meta']);
    }

    public function register_post_type() {
        $labels = [
            'name'               => 'Properties',
            'singular_name'      => 'Property',
            'menu_name'          => 'Properties',
            'name_admin_bar'     => 'Property',
            'add_new'            => 'Add New',
            'add_new_item'       => 'Add New Property',
            'new_item'           => 'New Property',
            'edit_item'          => 'Edit Property',
            'view_item'          => 'View Property',
            'all_items'          => 'All Properties',
            'search_items'       => 'Search Properties',
            'not_found'          => 'No properties found.',
            'not_found_in_trash' => 'No properties found in Trash.',
        ];

        $args = [
            'labels'             => $labels,
            'public'             => true,
            'has_archive'        => true,
            'rewrite'            => ['slug' => 'properties'],
            'show_in_rest'       => true,
            'supports'           => ['title'],
            'menu_position'      => 21,
            'menu_icon'          => 'dashicons-admin-generic',
        ];

        register_post_type('property', $args);
    }

    public function add_meta_boxes() {
        add_meta_box('property_key', 'Property Key', [$this, 'render_key_box'], 'property', 'normal', 'default');
        add_meta_box('property_name', 'Property Name', [$this, 'render_name_box'], 'property', 'normal', 'default');
    }

    public function render_key_box($post) {
        $value = get_post_meta($post->ID, '_property_key', true);
        wp_nonce_field('save_property_meta', 'property_meta_nonce');
        echo '<input type="text" name="property_key" value="' . esc_attr($value) . '" style="width:100%;">';
    }

    public function render_name_box($post) {
        $value = get_post_meta($post->ID, '_property_name', true);
        echo '<input type="text" name="property_name" value="' . esc_attr($value) . '" style="width:100%;">';
    }

    public function save_meta($post_id) {
        if (!isset($_POST['property_meta_nonce']) || !wp_verify_nonce($_POST['property_meta_nonce'], 'save_property_meta')) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        if (!current_user_can('edit_post', $post_id)) return;

        if (isset($_POST['property_key'])) {
            update_post_meta($post_id, '_property_key', sanitize_text_field($_POST['property_key']));
        }

        if (isset($_POST['property_name'])) {
            update_post_meta($post_id, '_property_name', sanitize_text_field($_POST['property_name']));
        }
    }
}