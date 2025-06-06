<?php

namespace F4\Model;

use \F4\Property\PropertyController;

class ModelInstance {

    protected $id;
    protected $type;
    protected $title;
    protected $key;
    protected $properties;

    public function __construct(\WP_Post $post) {
        $this->id = $post->ID;
        $this->title = $post->post_title;
        $this->type = get_post_meta($post->ID, 'model_type', true);
        $this->key = get_post_meta($post->ID, 'model_key', true);
        $this->properties = $this->loadProperties();
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

    public function getProperties() {
        return $this->properties;
    }

    private function loadProperties() {
        $pc = new PropertyController();
        return $pc->get_property_instances( $this->getId() );
    }

    public function to_array(): array {
        return get_object_vars($this);
    }

}
