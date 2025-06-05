<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class TrueFalseField extends BaseField {

    /**
     * Render the true/false field.
     * This is typically a checkbox input saved as 1 (true) or 0 (false).
     */
    public function render() {
        $key   = esc_attr($this->key);
        $name  = esc_html($this->name);
        $value = $this->getValue();
        $checked = $value ? 'checked' : '';

        echo "<p>";
        echo "<label><strong>{$name}</strong></label><br/>";
        echo "<label style='display: flex; align-items: center; gap: 6px;'>";
        echo "<input 
                  type='checkbox' 
                  name='{$key}' 
                  value='1' 
                  {$checked}
              />";
        echo "<span>Yes</span>";
        echo "</label>";
        echo "</p>";
    }

    /**
     * Ensure boolean values are properly saved.
     */
    public function sanitize($input) {
        return $input === '1' ? 1 : 0;
    }

    /**
     * Default value support.
     */
    public static function supportsSettingDefault(): bool {
        return true;
    }
}
