<?php 

namespace F4\Field;

class TextField extends BaseField {
    public function render() {
        $value = esc_attr($this->getValue());
        echo "<label for='{$this->key}'>{$this->name}</label>";
        echo "<input type='text' name='{$this->key}' id='{$this->key}' value='{$value}' />";
    }
}
