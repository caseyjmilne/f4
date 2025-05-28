<?php

namespace F4\Tests;

use F4\Database\TableCloner;

class CloneTableTest implements TestCaseInterface {
    public function run(): array {
        $cloner = new TableCloner();
        $original = $cloner->prefixTableName('test2');
        $clone = $cloner->cloneTable($original);

        if ($clone) {
            return ['success' => true, 'message' => "Successfully cloned table to: $clone"];
        }

        return ['success' => false, 'message' => "Clone failed for $original"];
    }
}
