<?php

namespace F4\Model;

class ModelInstance {

    protected $id;
    protected $type;
    protected $title;
    protected $key;

    public function __construct(\WP_Post $post) {
        $this->id = $post->ID;
        $this->title = $post->post_title;
        $this->type = get_post_meta($post->ID, 'model_type', true);
        $this->key = get_post_meta($post->ID, 'model_key', true);
    }

    public function getId() {
        return $this->id;
    }

    public function getType() {
        return $this->title;
    }

    public function getTitle() {
        return $this->title;
    }

    public function getKey() {
        return $this->key;
    }

    public function getProperties(): array {
        return get_posts([
            'post_type' => 'property',
            'post_status' => 'publish',
            'meta_key' => 'model_id',
            'meta_value' => $this->id,
            'numberposts' => -1
        ]);
    }

    public function to_array(): array {
        return get_object_vars($this);
    }

}
