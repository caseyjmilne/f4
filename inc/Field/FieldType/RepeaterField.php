<?php

namespace F4\Field;

class RepeaterField {

    public static function getType() {
        return 'repeater';
    }

    public static function getLabel() {
        return 'Repeater';
    }

    public static function supportsNestedFields() {
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

    public static function sanitizeSettings($settings) {
        return [
            'min' => isset($settings['min']) ? (int) $settings['min'] : 0,
            'max' => isset($settings['max']) ? (int) $settings['max'] : 0,
            'layout' => sanitize_text_field($settings['layout'] ?? 'vertical'),
        ];
    }

    public static function validate($value, $settings = []) {
        if (!is_array($value)) return false;

        $min = $settings['min'] ?? 0;
        $max = $settings['max'] ?? 0;
        $count = count($value);

        if ($min > 0 && $count < $min) return false;
        if ($max > 0 && $count > $max) return false;

        // Optionally: validate each subfield instance here

        return true;
    }
}
