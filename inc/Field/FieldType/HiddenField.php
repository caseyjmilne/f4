<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class HiddenField extends BaseField {

    public static function getSupportedSettings(): array {
        return [
            'default', 
            'required', 
            'conditions'
        ];
    }

    public function render() {
        $value = esc_attr($this->getValue());
        $key = esc_attr($this->key);

        echo "<input type='hidden' name='{$key}' id='{$key}' value='{$value}' />";
    }
}
