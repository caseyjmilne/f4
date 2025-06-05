<?php

namespace F4\Field\FieldType;

use F4\Field\BaseField;

class RepeaterField extends BaseField {

    public static function supportsNestedFields(): bool {
        return true;
    }

    public static function getDefaultSettings() {
        return [
            'min' => 0,
            'max' => 0, // 0 means unlimited
            'layout' => 'vertical', // or 'table', 'grid', etc.
        ];
    }

    public static function supportsSettingMin() {
        return true;
    }

    public static function supportsSettingMax() {
        return true;
    }

    public static function supportsSettingLayout() {
        return true;
    }

    public static function renderSettings($settings = []) {
        // Optional: if you're rendering field settings in PHP, not JS
    }

    public function render() {
        echo 'Repeater Field Render.';
    }

}
