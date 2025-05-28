<?php

namespace F4\Tests;

class TestRunner {

    protected $tests = [
        'clone_table' => CloneTableTest::class,
        'add_column'  => AddColumnTest::class,
    ];

    public function run($key) {
        if (!isset($this->tests[$key])) {
            return ['success' => false, 'message' => "Unknown test key: $key"];
        }

        $testClass = $this->tests[$key];
        $test = new $testClass();
        return $test->run();
    }
}
