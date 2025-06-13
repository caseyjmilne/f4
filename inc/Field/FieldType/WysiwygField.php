<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class WysiwygField extends BaseField {

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
        $value = $this->getValue();
        $editor_id = esc_attr($this->key);
        $name = esc_html($this->name);

        echo "<p><strong>{$name}</strong></p>";
        wp_editor($value, $editor_id, [
            'textarea_name' => $this->key,
            'textarea_rows' => $this->args['rows'] ?? 10,
            'media_buttons' => true,
            'teeny'         => false,
        ]);
    }
    
}
