<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class ImageField extends BaseField {

    /**
     * Render the image field.
     * Displays a preview (if a URL is saved), and a text input for the image URL.
     */
    public function render() {
        $value       = esc_url($this->getValue());
        $key         = esc_attr($this->key);
        $name        = esc_html($this->name);
        $placeholder = isset($this->args['placeholder']) ? esc_attr($this->args['placeholder']) : '';

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";

        // If there's an existing URL, show a small preview
        if (!empty($value)) {
            echo "<div class='f4-imagefield__preview'>
                    <img src='{$value}' alt='' style='max-width:150px;height:auto;margin-bottom:8px;'/>
                  </div>";
        }

        // Input for image URL
        echo "<input 
                  type='url' 
                  name='{$key}' 
                  id='{$key}' 
                  class='widefat f4-imagefield__input' 
                  value='{$value}' 
                  placeholder='{$placeholder}' 
              />";
        echo "</p>";
    }

    /**
     * Indicates that this field supports a "Placeholder" setting.
     */
    public static function supportsSettingPlaceholder(): bool {
        return true;
    }
}
