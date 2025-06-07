<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class TextField extends BaseField {

    public function render() {
        $value = esc_attr($this->getValue());
        $key = esc_attr($this->key);
        $name = esc_html($this->name);
        $append = isset($this->args['append']) ? esc_html($this->args['append']) : '';

        echo '<pre>';
        var_dump($this);
        echo '</pre>';

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<input type='text' name='{$key}' id='{$key}' value='{$value}' class='widefat' />";
        if ($append !== '') {
            echo " <span class='f4-append'>{$append}</span>";
        }
        echo "</p>";
    }

    public static function supportsSettingAppend(): bool {
        return true;
    }
}
