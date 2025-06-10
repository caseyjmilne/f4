<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class CheckboxField extends BaseField {

    /**
     * Return supported settings for this field type.
     */
    public static function getSupportedSettings(): array {
        return ['choices'];
    }

    /**
     * Render the checkbox field.
     * Renders multiple checkboxes based on 'choices' in settings.
     */
    public function render() {
        $key   = esc_attr($this->key);
        $name  = esc_html($this->name);
        $value = $this->getValue();
        $value = is_array($value) ? $value : explode(',', $value);

        $choices = $this->getSetting('choices');
        if (!is_array($choices)) {
            $choices = [];
        }

        echo "<p><strong>{$name}</strong></p>";

        foreach ($choices as $choice) {
            // Support both ['value'=>'','label'=>''] and ['value'=>'label'] formats
            if (is_array($choice) && isset($choice['value'], $choice['label'])) {
                $choice_key = esc_attr($choice['value']);
                $choice_label = esc_html($choice['label']);
            } else {
                $choice_key = is_array($choice) ? array_key_first($choice) : $choice;
                $choice_label = is_array($choice) ? array_values($choice)[0] : $choice;
                $choice_key = esc_attr($choice_key);
                $choice_label = esc_html($choice_label);
            }
            $checked = in_array($choice_key, $value) ? 'checked' : '';

            echo "<label style='display:block;margin-bottom:4px;'>";
            echo "<input 
                      type='checkbox' 
                      name='{$key}[]' 
                      value='{$choice_key}' 
                      {$checked}
                  /> {$choice_label}";
            echo "</label>";
        }
    }

    /**
     * Save the field value as a comma-separated string.
     */
    public function save($value) {
        $cleaned = is_array($value) ? array_map('sanitize_text_field', $value) : [];
        update_post_meta($this->post_id, $this->key, implode(',', $cleaned));
    }

}
