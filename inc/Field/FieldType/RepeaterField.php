<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class RepeaterField extends BaseField {

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

    public static function renderSettings($settings = []) {
        // Optional: if you're rendering field settings in PHP, not JS
    }

    public function render() {
        echo 'Repeater Field Render.';
    }

}
