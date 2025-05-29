<?php

namespace F4\Field;

class TextField extends BaseField {

    public function render() {
        $value = esc_attr($this->getValue());
        $key = esc_attr($this->key);
        $name = esc_html($this->name);

        echo "<p><label for='{$key}'><strong>{$name}</strong></label><br/>";
        echo "<input type='text' name='{$key}' id='{$key}' value='{$value}' class='widefat' /></p>";
    }
}
