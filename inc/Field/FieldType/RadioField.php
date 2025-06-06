<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class RadioField extends BaseField {

    /**
     * Render the radio field.
     * Displays one selectable option from the provided 'choices'.
     */
    public function render() {
        $key   = esc_attr($this->key);
        $name  = esc_html($this->name);
        $value = $this->getValue();
        $choices = $this->args['choices'] ?? [];

        echo "<p><strong>{$name}</strong></p>";

        foreach ($choices as $choice_key => $choice_label) {
            $choice_key = esc_attr($choice_key);
            $choice_label = esc_html($choice_label);
            $checked = ($value === $choice_key) ? 'checked' : '';

            echo "<label style='display:block;margin-bottom:4px;'>";
            echo "<input 
                      type='radio' 
                      name='{$key}' 
                      value='{$choice_key}' 
                      {$checked}
                  /> {$choice_label}";
            echo "</label>";
        }
    }

    /**
     * Save the selected radio value.
     */
    public function save($value) {
        update_post_meta($this->post_id, $this->key, sanitize_text_field($value));
    }

    /**
     * Default value support.
     */
    public static function supportsSettingDefault(): bool {
        return true;
    }

    /**
     * This field supports a list of choices.
     */
    public static function supportsSettingChoices(): bool {
        return true;
    }
}
