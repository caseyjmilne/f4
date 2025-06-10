<?php

namespace F4\Field;

class FieldPostType
{
    public static function register(): void
    {
        add_action('init', [self::class, 'doRegister']);
    }

    public static function doRegister(): void
    {
        register_post_type('f4_field', [
            'labels' => [
                'name' => 'Fields',
                'singular_name' => 'Field',
                'add_new' => 'Add New Field',
                'add_new_item' => 'Add New Field',
                'edit_item' => 'Edit Field',
                'new_item' => 'New Field',
                'view_item' => 'View Field',
                'search_items' => 'Search Fields',
                'not_found' => 'No fields found',
                'not_found_in_trash' => 'No fields found in Trash',
                'all_items' => 'All Fields',
            ],
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_position' => 25,
            'menu_icon' => 'dashicons-feedback',
            'supports' => ['title', 'editor', 'custom-fields'],
            'has_archive' => false,
            'rewrite' => [
                'slug' => 'field',
                'with_front' => false,
            ],
            'capability_type' => 'post',
            'query_var' => true,
        ]);
    }
}
