<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class TextField extends BaseField {

    public static function getSupportedSettings(): array {
        return ['default', 'required', 'instructions', 'append', 'placeholder', 'prepend', 'maxLength'];
    }

    public function render() {
        $value = esc_attr($this->getValue());
        $key = esc_attr($this->key);
        $name = esc_html($this->name);
        $append = esc_html($this->getSetting('append'));
        $prepend = esc_html($this->getSetting('prepend'));
        $placeholder = esc_attr($this->getSetting('placeholder'));
        $maxLength = $this->getSetting('maxLength');

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        if ($prepend !== null && $prepend !== '') {
            echo "<span class='f4-prepend'>{$prepend}</span> ";
        }
        echo "<input type='text' name='{$key}' id='{$key}' value='{$value}'"
            . ($placeholder ? " placeholder='{$placeholder}'" : "")
            . ($maxLength ? " maxlength='{$maxLength}'" : "")
            . " />";
        if ($append !== null && $append !== '') {
            echo " <span class='f4-append'>{$append}</span>";
        }
        echo "</p>";
    }

}
