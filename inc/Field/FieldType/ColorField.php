<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class ColorField extends BaseField {

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

    /**
     * Render the color field.
     */
    public function render() {
        $value       = esc_attr($this->getValue());
        $key         = esc_attr($this->key);
        $name        = esc_html($this->name);
        $placeholder = isset($this->args['placeholder']) ? esc_attr($this->args['placeholder']) : '';

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<input 
                type='color' 
                id='{$key}' 
                name='{$key}' 
                value='{$value}' 
                class='f4-colorfield__input' 
                placeholder='{$placeholder}'
              />";
        echo "</p>";
    }

}
