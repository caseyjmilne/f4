<?php

namespace F4\Field;

class CoreFieldRegistry {

    public static function register() {
        FieldRegistry::register('text', \F4\Field\TextField::class);
        FieldRegistry::register('number', \F4\Field\NumberField::class);
        FieldRegistry::register('hidden', \F4\Field\HiddenField::class);
    }
}
