<?php

namespace F4\Tests;

use F4\Field\FieldRegistry;

class ListFieldTypesTest implements TestCaseInterface {
    public function run(): array {
        $types = FieldRegistry::all();

        if (empty($types)) {
            return [
                'success' => false,
                'message' => 'No field types registered.',
            ];
        }

        $list = array_map(
            fn($class, $key) => ['key' => $key, 'class' => $class],
            $types,
            array_keys($types)
        );

        return [
            'success' => true,
            'message' => 'Field types retrieved successfully.',
            'data'    => $list,
        ];
    }
}
