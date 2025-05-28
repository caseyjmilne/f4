<?php

class ModelPropertyController {
    
    public function __construct() {
        add_action('init', [$this, 'register_post_type']);
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

}
