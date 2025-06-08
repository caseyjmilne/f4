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

        for ($i = 1; $i <= 5; $i++) {
            $record = new Record();
            $record->id = $i;
            $record->title = "Record Title $i";
            $record->description = "Description for record $i.";
            $record->summary = "Summary $i";
            $record->image = "https://via.placeholder.com/150?text=Image+$i";
            $record->author = "Author $i";
            $records[] = $record;
        }

        return rest_ensure_response($records);
    }
}