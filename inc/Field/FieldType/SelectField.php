<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class SelectField extends BaseField {

    public function render() {
        $key = esc_attr($this->key);
        $name = esc_html($this->name);
        $value = esc_attr($this->getValue());
        $choices = isset($this->args['choices']) && is_array($this->args['choices']) ? $this->args['choices'] : [];
        $append = isset($this->args['append']) ? esc_html($this->args['append']) : '';

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<select name='{$key}' id='{$key}' class='widefat'>";
        foreach ($choices as $choice_value => $label) {
            $selected = selected($value, $choice_value, false);
            echo "<option value='" . esc_attr($choice_value) . "' {$selected}>" . esc_html($label) . "</option>";
        }
        echo "</select>";
        if ($append !== '') {
            echo " <span class='f4-append'>{$append}</span>";
        }
        echo "</p>";
    }

    public static function supportsSettingAppend(): bool {
        return true;
    }
}
