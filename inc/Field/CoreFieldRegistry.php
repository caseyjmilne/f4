<?php

namespace F4\Field;

class CoreFieldRegistry {

    public static function register() {
        FieldRegistry::register('text', \F4\Field\FieldType\TextField::class);
        FieldRegistry::register('number', \F4\Field\FieldType\NumberField::class);
        FieldRegistry::register('hidden', \F4\Field\FieldType\HiddenField::class);
        FieldRegistry::register('select', \F4\Field\FieldType\SelectField::class);
    }
}
