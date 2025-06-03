
# Adding a New Test to the F4 Test Runner

This guide outlines the steps to register and run a new test using the built-in F4 test runner system. Tests are exposed via the admin **Debug Tools** page and are intended for internal development/debugging only.

---

## 📁 File Structure

```
inc/
├── Admin/
│   └── DebugPage.php           ← Renders the test runner UI in WP admin
├── Tests/
│   ├── TestCaseInterface.php   ← Interface all tests must implement
│   ├── TestRunner.php          ← Central runner that registers and executes tests
│   └── <YourTest>.php          ← Your new test class goes here
```

---

## ✅ Step-by-Step Instructions

### 1. Create the Test Class

Create a new file in `inc/Tests/`, e.g. `ExampleTest.php`.

```php
<?php

namespace F4\Tests;

class ExampleTest implements TestCaseInterface {
    public function run(): array {
        // Your test logic here
        return [
            'success' => true,
            'message' => 'Example test passed!',
            'data'    => ['some' => 'debug info'], // Optional
        ];
    }
}
```

> The test class **must** implement `F4\Tests\TestCaseInterface`, which requires a `run(): array` method.

---

### 2. Register the Test in `TestRunner.php`

Edit `inc/Tests/TestRunner.php` and register your new test under a unique key.

```php
protected $tests = [
    'clone_table'      => CloneTableTest::class,
    'add_column'       => AddColumnTest::class,
    'list_field_types' => ListFieldTypesTest::class,
    'example'          => ExampleTest::class, // 👈 Add this line
];
```

---

### 3. Add a Button in `DebugPage.php`

Edit `inc/Admin/DebugPage.php` and add a new button in the `<form>`:

```php
echo '<button class="button" name="run_test" value="example">Test: Example</button>';
```

The `value` should match the key from `TestRunner`.

---

### 4. Use Test Output (Optional)

If your test includes a `data` array in its result, `DebugPage.php` will print it as a `<pre>` block:

```php
if (!empty($result['data'])) {
    echo '<pre>' . esc_html(print_r($result['data'], true)) . '</pre>';
}
```

---

## 🧪 Test Output Format

Each test should return an array like:

```php
[
    'success' => true | false,
    'message' => 'Short description of result',
    'data'    => [...] // Optional, for additional context or output
]
```

---

## ✅ Example

Here’s a minimal test that checks if a table exists in the DB:

```php
<?php

namespace F4\Tests;

global $wpdb;

class TableExistsTest implements TestCaseInterface {
    public function run(): array {
        $table = $wpdb->prefix . 'my_custom_table';

        if ($wpdb->get_var("SHOW TABLES LIKE '$table'") === $table) {
            return ['success' => true, 'message' => "Table $table exists"];
        }

        return ['success' => false, 'message' => "Table $table not found"];
    }
}
```

---

## 🔐 Security Reminder

These tools are intended for internal development and **should not** be available to regular users or exposed in production environments without proper permissions and validation.
