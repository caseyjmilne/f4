<?php

namespace F4\Field;

class FieldSettings
{
    // Define available setting types globally
    protected static $settingDefinitions = [
        'placeholder' => [
            'type' => 'string',
            'label' => 'Placeholder',
            'default' => '',
            'description' => 'Text to display when field is empty.'
        ],
        'prepend' => [
            'type' => 'string',
            'label' => 'Prepend',
            'default' => '',
            'description' => 'Content before the field (e.g., $ or @).'
        ],
        'append' => [
            'type' => 'string',
            'label' => 'Append',
            'default' => '',
            'description' => 'Content after the field.'
        ],
        'rows' => [
            'type' => 'integer',
            'label' => 'Rows',
            'default' => 3,
            'description' => 'Number of rows for textarea.'
        ],
        'maxLength' => [
            'type' => 'integer',
            'label' => 'Max Length',
            'default' => '',
            'description' => 'Maximum number of characters.'
        ]
        // Add more here
    ];

    // Return supported settings for a field
    public static function getSupportedForField(string $fieldClass): array
    {
        if (!class_exists($fieldClass) || !is_subclass_of($fieldClass, BaseField::class)) {
            return [];
        }

        $supportedKeys = $fieldClass::getSupportedSettings();
        $filtered = [];

        foreach ($supportedKeys as $key) {
            if (isset(self::$settingDefinitions[$key])) {
                $filtered[$key] = self::$settingDefinitions[$key];
            }
        }

        return $filtered;
    }

    // Sanitize field settings input (e.g., from admin UI)
    public static function sanitize(array $input, string $fieldClass): array
    {
        $supported = self::getSupportedForField($fieldClass);
        $clean = [];

        foreach ($supported as $key => $meta) {
            $value = $input[$key] ?? $meta['default'];

            switch ($meta['type']) {
                case 'integer':
                    $clean[$key] = intval($value);
                    break;
                case 'string':
                    $clean[$key] = sanitize_text_field($value);
                    break;
                case 'boolean':
                    $clean[$key] = (bool) $value;
                    break;
                default:
                    $clean[$key] = $value;
            }
        }

        return $clean;
    }

    // Optional: for REST API – expose setting structure
    public static function toJsonSchema(): array
    {
        return self::$settingDefinitions;
    }
}
