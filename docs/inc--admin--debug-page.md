# DebugPage Class

**Namespace:** `F4\Admin`

## Description

The `DebugPage` class renders the "F4 Debug Tools" admin page. It provides a simple interface to run debug tests for the plugin via POST requests.

The page includes buttons to run specific tests, and displays success or error messages based on test results.

## Methods

### `render()`

- Outputs the HTML for the debug tools page.
- Displays a heading "F4 Debug Tools".
- Checks if a POST request with a `run_test` parameter is made.
- Runs the specified test using the `TestRunner` class.
- Shows a success or error notice based on the test outcome.
- Provides buttons to trigger predefined tests:
  - "Clone Table"
  - "Add Column"

## Usage Example

```php
use F4\Admin\DebugPage;

$page = new DebugPage();
$page->render();
