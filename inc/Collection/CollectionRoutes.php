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

        $filters_json = $request->get_param('filters');
        $meta_query = [];

        if ($filters_json) {
            $filters = json_decode($filters_json, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    if (!empty($filter['metaKey']) && isset($filter['value']) && $filter['value'] !== '') {
                        $meta_query[] = [
                            'key'     => $filter['metaKey'],
                            'value'   => $filter['value'],
                            'compare' => !empty($filter['compare']) ? $filter['compare'] : '=',
                            'type'    => !empty($filter['metaType']) ? $filter['metaType'] : 'CHAR',
                        ];
                    }
                }
            }
        }

        $query_args = [
            'post_type'      => 'testz',
            'posts_per_page' => 5,
            'post_status'    => 'publish',
        ];

        if (!empty($meta_query)) {
            $query_args['meta_query'] = $meta_query;
        }

        $query = new \WP_Query($query_args);

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $record = new \F4\Record\Record();
                $record->id = get_the_ID();
                $record->title = get_the_title();
                $record->description = get_the_excerpt();
                $record->summary = get_the_content(); // Use post content as summary
                $record->image = 'https://placehold.co/300x200'; // Use placeholder image
                $record->author = get_the_author();

                $records[] = $record->exportAsArray();
            }
            wp_reset_postdata();
        }

        return rest_ensure_response($records);
    }
}