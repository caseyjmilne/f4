<?php 

namespace F4\Property;

class PropertyInstance {

    protected $id;
    protected $model_id;
    protected $key;
    protected $name;
    protected $type;
    protected $parent_id = 0;
    protected $test = 132;

    public function __construct(\WP_Post $post) {
        $this->id = $post->ID;
        $this->model_id = get_post_meta($post->ID, 'model_id', true);
        $this->key = get_post_meta($post->ID, 'key', true);
        $this->name = get_post_meta($post->ID, 'name', true);
        $this->type = get_post_meta($post->ID, 'type', true);
        $this->parent_id = (int) get_post_meta($post->ID, 'parent_id', true) ?: 0;
    }

    public function getId() {
        return $this->id;
    }

    public function getModelId() {
        return $this->model_id;
    }

    public function getKey() {
        return $this->key;
    }

    public function getName() {
        return $this->name;
    }

    public function getType() {
        return $this->type;
    }

    public function getParentId() {
        return $this->parent_id;
    }

    public function to_array(): array {
        return [
            'id' => $this->id,
            'model_id' => $this->model_id,
            'key' => $this->key,
            'name' => $this->name,
            'type' => $this->type,
            'parent_id' => $this->getParentId(), // ensures 0 is included
        ];
    }

}
