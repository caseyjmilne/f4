<?php

namespace F4\Front;

class PropertyLoader {

    /**
     * Loads all property posts related to a given model ID.
     *
     * @param int $model_id
     * @return array Array of WP_Post objects for properties
     */
    public function get_properties_for_model(int $model_id): array {
        return get_posts([
            'post_type'   => 'property',
            'post_status' => 'publish',
            'numberposts' => -1,
            'meta_key'    => 'model_id',
            'meta_value'  => $model_id,
        ]);
    }
}
