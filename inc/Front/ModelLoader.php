<?php

namespace F4\Front;

use \F4\Model\ModelInstance;

class ModelLoader {
    public static function getModelForPostType($post_type): ?ModelInstance {
        $models = get_posts([
            'post_type' => 'model',
            'post_status' => 'publish',
            'meta_key' => '_model_key',
            'meta_value' => $post_type,
            'numberposts' => 1
        ]);

        return $models ? new ModelInstance($models[0]) : null;
    }
}
