<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class TextareaField extends BaseField {

    public function render() {
        $value = esc_textarea($this->getValue());
        $key = esc_attr($this->key);
        $name = esc_html($this->name);
        $rows = isset($this->args['rows']) ? intval($this->args['rows']) : 4;

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<textarea name='{$key}' id='{$key}' class='widefat' rows='{$rows}'>{$value}</textarea>";
        echo "</p>";
    }

    public static function supportsSettingRows(): bool {
        return true;
    }

}
