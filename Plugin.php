<?php 

/*
 * Plugin Name: F4
 */

class Plugin {

    function __construct() {

        add_action('init', [$this, 'register_model_post_type']);


    }

    function register_model_post_type() {
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
            'show_in_rest'       => true, // Enables Gutenberg & REST API
            'supports'           => array('title', 'editor'),
            'menu_position'      => 20,
            'menu_icon'          => 'dashicons-database',
        );

        register_post_type('model', $args);
    }


}

new Plugin();