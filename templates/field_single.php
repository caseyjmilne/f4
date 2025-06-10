<?php

use F4\Field\FieldController;

// Example field definition array
$fieldDef = [
    'key' => 'property_price',
    'name' => 'price',
    'label' => 'Price',
    'type' => 'number', // maps to FieldTypeNumber::class
    'default' => 0,
    'required' => true,
    'min' => 0,
    'max' => 1000000,
    'step' => 1,
];

// Import the field instance from array
$fieldInstance = FieldController::importArray($fieldDef);

// Get the type instance (e.g., FieldTypeNumber)
$typeInstance = $fieldInstance->getFieldTypeInstance();

// Optionally set a value for demonstration
if (method_exists($typeInstance, 'setValue')) {
    $typeInstance->setValue(12345);
}

// Pass settings from FieldInstance to the type instance, if needed
if (method_exists($typeInstance, 'setSettings')) {
    $typeInstance->setSettings($fieldInstance->getSettings());
}

// Render the field (outputs HTML)
if (method_exists($typeInstance, 'render')) {
    $typeInstance->render();
} else {
    echo "No render method found for this field type.";
}

