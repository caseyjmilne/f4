<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class RangeField extends BaseField {

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
        $key   = esc_attr($this->key);
        $name  = esc_html($this->name);

        // Settings fallback defaults
        $min       = isset($this->settings['min']) ? esc_attr($this->settings['min']) : '';
        $max       = isset($this->settings['max']) ? esc_attr($this->settings['max']) : '';
        $step      = isset($this->settings['step']) ? esc_attr($this->settings['step']) : '';
        $prepend   = isset($this->settings['prepend']) ? esc_html($this->settings['prepend']) : '';
        $append    = isset($this->settings['append']) ? esc_html($this->settings['append']) : '';

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";

        if ($prepend) {
            echo "<span class='f4-range-prepend'>{$prepend}</span> ";
        }

        echo "<input 
                type='range' 
                name='{$key}' 
                id='{$key}' 
                value='{$value}' 
                min='{$min}' 
                max='{$max}' 
                step='{$step}' 
                class='widefat' 
              />";

        if ($append) {
            echo " <span class='f4-range-append'>{$append}</span>";
        }

        echo "</p>";
    }
    
}
