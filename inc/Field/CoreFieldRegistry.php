<?php

namespace F4\Field;

class CoreFieldRegistry {

    public static function register() {
        FieldRegistry::register('text', \F4\Field\TextField::class);
    }
}
