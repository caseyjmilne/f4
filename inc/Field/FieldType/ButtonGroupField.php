<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class ButtonGroupField extends BaseField
{
    public static function getType(): string
    {
        return 'button_group';
    }

    public static function getLabel(): string
    {
        return 'Button Group';
    }

    /**
     * This field expects a 'choices' key in $args as an associative array (key => label).
     */
    public function render()
    {
        $value = $this->getValue();
        $choices = $this->args['choices'] ?? [];

        echo '<div class="f4-button-group-field" data-key="' . esc_attr($this->key) . '">';

        foreach ($choices as $choiceKey => $choiceLabel) {
            $selectedClass = ($value === $choiceKey) ? 'f4-button-group-field__button--selected' : '';
            echo '<button type="button" class="f4-button-group-field__button ' . esc_attr($selectedClass) . '" data-value="' . esc_attr($choiceKey) . '">';
            echo esc_html($choiceLabel);
            echo '</button>';
        }

        // Hidden input to store the selected value for form submission
        echo '<input type="hidden" name="' . esc_attr($this->key) . '" value="' . esc_attr($value) . '" />';

        echo '</div>';
    }

    /**
     * Save the selected value (sanitize as string).
     */
    public function save($value)
    {
        // Only save if the value exists in the choices
        $choices = $this->args['choices'] ?? [];
        if (array_key_exists($value, $choices)) {
            update_post_meta($this->post_id, $this->key, sanitize_text_field($value));
        } else {
            // Save empty if invalid choice
            update_post_meta($this->post_id, $this->key, '');
        }
    }

    /**
     * This field supports appending text (optional).
     */
    public static function supportsSettingAppend(): bool
    {
        return true;
    }
}
