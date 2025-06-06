<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class DateField extends BaseField {

    /**
     * Render the date field.
     */
    public function render() {
        $value       = esc_attr($this->getValue());
        $key         = esc_attr($this->key);
        $name        = esc_html($this->name);
        $placeholder = isset($this->args['placeholder']) ? esc_attr($this->args['placeholder']) : '';

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<input 
                type='date' 
                id='{$key}' 
                name='{$key}' 
                value='{$value}' 
                class='f4-datefield__input' 
                placeholder='{$placeholder}'
              />";
        echo "</p>";
    }

    /**
     * This field supports a placeholder setting.
     */
    public static function supportsSettingPlaceholder(): bool {
        return true;
    }
}
