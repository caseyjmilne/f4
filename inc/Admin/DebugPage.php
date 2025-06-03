<?php

namespace F4\Admin;

use F4\Tests\TestRunner;

class DebugPage {

    public function render() {
        echo '<div class="wrap"><h1>F4 Debug Tools</h1>';

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['run_test'])) {
            $testKey = sanitize_text_field($_POST['run_test']);
            $runner = new TestRunner();
            $result = $runner->run($testKey);

            echo '<div class="notice ' . ($result['success'] ? 'notice-success' : 'notice-error') . '"><p>' . esc_html($result['message']) . '</p>';

            if (!empty($result['data'])) {
                echo '<pre>' . esc_html(print_r($result['data'], true)) . '</pre>';
            }

            echo '</div>';
        }

        echo '<form method="post">';
        echo '<button class="button button-primary" name="run_test" value="clone_table">Test: Clone Table</button> ';
        echo '<button class="button" name="run_test" value="add_column">Test: Add Column</button> ';
        echo '<button class="button" name="run_test" value="list_field_types">Test: List Field Types</button>';
        echo '</form></div>';
    }
}
