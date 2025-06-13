<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class NumberField extends BaseField {

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
        $value = esc_attr($this->getValue());
        $key = esc_attr($this->key);
        $name = esc_html($this->name);

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<input type='number' name='{$key}' id='{$key}' value='{$value}' class='widefat' /></p>";
    }
}
