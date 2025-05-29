<?php

namespace F4\Front;

class ModelInstance {
    protected $post_id;
    protected $post_title;
    protected $model_key;

    public function __construct(\WP_Post $post) {
        $this->post_id = $post->ID;
        $this->post_title = $post->post_title;
        $this->model_key = get_post_meta($post->ID, '_model_key', true);
    }

    public function getId() {
        return $this->post_id;
    }

    public function getTitle() {
        return $this->post_title;
    }

    public function getKey() {
        return $this->model_key;
    }

    public function getProperties(): array {
        $props = get_posts([
            'post_type' => 'property',
            'post_status' => 'publish',
            'meta_key' => 'model_id',
            'meta_value' => $this->post_id,
            'numberposts' => -1
        ]);

        return $props;
    }
}
