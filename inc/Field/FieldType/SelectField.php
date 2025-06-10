<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class SelectField extends BaseField {

    public static function getSupportedSettings(): array {
        return ['choices'];
    }

    public function render() {
        $key = esc_attr($this->key);
        $name = esc_html($this->name);
        $value = esc_attr($this->getValue());
        $choices = $this->getSetting('choices');
        if (!is_array($choices)) {
            $choices = [];
        }

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<select name='{$key}' id='{$key}' class='widefat'>";
        foreach ($choices as $choice) {
            // Support both ['value'=>'','label'=>''] and ['value'=>'label'] formats
            if (is_array($choice) && isset($choice['value'], $choice['label'])) {
                $choice_value = $choice['value'];
                $label = $choice['label'];
            } else {
                $choice_value = is_array($choice) ? array_key_first($choice) : $choice;
                $label = is_array($choice) ? array_values($choice)[0] : $choice;
            }
            $selected = selected($value, $choice_value, false);
            echo "<option value='" . esc_attr($choice_value) . "' {$selected}>" . esc_html($label) . "</option>";
        }
        echo "</select>";
        echo "</p>";
    }

}
