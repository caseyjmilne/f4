<?php

namespace F4\Field;

class FieldSettings
{
    // Define available setting types globally
    protected static $settingDefinitions = [
        'placeholder' => [
            'storage_type' => 'string',
            'field_type' => 'text',
            'label' => 'Placeholder',
            'default' => '',
            'description' => 'Text to display when field is empty.'
        ],
        'prepend' => [
            'storage_type' => 'string',
            'field_type' => 'text',
            'label' => 'Prepend',
            'default' => '',
            'description' => 'Content before the field (e.g., $ or @).'
        ],
        'append' => [
            'storage_type' => 'string',
            'field_type' => 'text',
            'label' => 'Append',
            'default' => '',
            'description' => 'Content after the field.'
        ],
        'rows' => [
            'storage_type' => 'integer',
            'field_type' => 'text',
            'label' => 'Rows',
            'default' => 3,
            'description' => 'Number of rows for textarea.'
        ],
        'maxLength' => [
            'storage_type' => 'integer',
            'field_type' => 'text',
            'label' => 'Max Length',
            'default' => '',
            'description' => 'Maximum number of characters.'
        ],
        'required' => [
            'storage_type' => 'integer',
            'field_type' => 'true_false',
            'label' => 'Required',
            'default' => false,
            'description' => 'Whether this field is required.'
        ],
        'default' => [
            'storage_type' => 'string',
            'field_type' => 'text',
            'label' => 'Default Value',
            'default' => '',
            'description' => 'Default value for the field.'
        ],
        'instructions' => [
            'storage_type' => 'string',
            'field_type' => 'textarea',
            'label' => 'Instructions',
            'default' => '',
            'description' => 'Instructions for users on how to fill out this field.'
        ],
        'editor_access' => [
            'storage_type' => 'integer',
            'field_type' => 'true_false',
            'label' => 'Editor Access',
            'default' => false,
            'description' => 'Whether editors can access this field.'
        ],
        'conditions' => [
            'storage_type' => 'true_false',
            'field_type' => 'true_false',
            'label' => 'Conditions',
            'default' => false,
            'description' => 'Enable conditional logic for this field.'
        ]
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

            switch ($meta['storage_type']) {
                case 'integer':
                    $clean[$key] = intval($value);
                    break;
                case 'string':
                    $clean[$key] = sanitize_text_field($value);
                    break;
                case 'true_false':
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
