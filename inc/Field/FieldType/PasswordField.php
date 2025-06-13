<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class PasswordField extends BaseField {

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

        echo "<p>";
        echo "<label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<input type='password' name='{$key}' id='{$key}' class='widefat' value='{$value}' />";
        echo "</p>";
    }
    
}
