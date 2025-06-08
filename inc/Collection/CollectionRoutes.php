<?php

namespace F4\Collection;

use \F4\Record\Record;

class CollectionRoutes {
    public static function register_routes() {
        add_action('rest_api_init', function () {
            register_rest_route('f4/v1', '/collection/refresh', [
                'methods'  => 'GET',
                'callback' => [self::class, 'refresh_collection'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public static function refresh_collection($request) {
        $records = [];

        $query = new \WP_Query([
            'post_type'      => 'country',
            'posts_per_page' => 5,
            'post_status'    => 'publish',
        ]);

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $record = new Record();
                $record->id = get_the_ID();
                $record->title = get_the_title();
                $record->description = get_the_excerpt();
                $record->summary = get_post_meta(get_the_ID(), 'summary', true) ?: '';
                $record->image = get_the_post_thumbnail_url(get_the_ID(), 'medium') ?: '';
                $record->author = get_the_author();

                $records[] = $record->exportAsArray();
            }
            wp_reset_postdata();
        }

        return rest_ensure_response($records);
    }
}