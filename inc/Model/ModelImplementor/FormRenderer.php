<?php 

namespace F4\Model\ModelImplementor;

class FormRenderer {

    public function renderField(string $key, $value): void {
        echo '<label>' . esc_html($key) . '</label>';
        echo '<input type="text" name="' . esc_attr($key) . '" value="' . esc_attr($value) . '" />';
    }

}
