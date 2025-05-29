<?php 

namespace F4\Field;

abstract class BaseField {

    protected $key;
    protected $name;
    protected $args;
    protected $post_id;

    public function __construct($key, $name, $args = [], $post_id = null) {
        $this->key = $key;
        $this->name = $name;
        $this->args = $args;
        $this->post_id = $post_id;
    }

    abstract public function render();

    public function save($value) {
        update_post_meta($this->post_id, $this->key, sanitize_text_field($value));
    }

    public function getValue() {
        return get_post_meta($this->post_id, $this->key, true);
    }
}
