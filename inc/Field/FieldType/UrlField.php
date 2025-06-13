<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class UrlField extends BaseField {

    public static function getSupportedSettings(): array {
        return [
            'default', 
            'required', 
            'instructions', 
            'append', 
            'placeholder', 
            'prepend', 
            'maxLength',
            'conditions'
        ];
    }

    public function render() {
        $value = esc_url($this->getValue());
        $key   = esc_attr($this->key);
        $name  = esc_html($this->name);
        $placeholder = isset($this->args['placeholder']) ? esc_attr($this->args['placeholder']) : '';

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<input type='url' name='{$key}' id='{$key}' class='widefat' value='{$value}' placeholder='{$placeholder}' />";
        echo "</p>";
    }

    public function save($value) {
        update_post_meta($this->post_id, $this->key, esc_url_raw($value));
    }

    public static function getLabel(): string {
        return 'URL';
    }
}
